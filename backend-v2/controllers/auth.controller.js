import { Account, Member } from "../models/index.js";
import { validateAccount, response, validateMember, generateToken, verifyToken } from "../utils/index.js";
import bcrypt from 'bcryptjs';

const AuthController = () => {


  const register = async (req, res) => {
    const logPrefix = "[AuthController][register]";
    console.log(`${logPrefix} Start with data:`, req.body);

   try {
        const input = req.body;
        const file = req.file;
  
        if (
          !input.email ||
          !input.phone ||
          !input.fullname ||
          !input.birthday ||
          !input.gender ||
          !input.role ||
          !input.password
        ) {
          return response(res, 400, "MISSING_ACCOUNT_DATA");
        }
  
        // Kiểm tra email đã tồn tại chưa
        const existingAccount = await Account.findOne({ email: input.email });
        if (existingAccount) {
          console.warn(`${logPrefix} Validation failed: Email has registered`);
          return response(res, 400, "INVALID_ACCOUNT_DATA");
        }
  
        // Tạo đối tượng tài khoản mới
        const account = new Account({
          email: input.email,
          phone: input.phone,
          avatar: file.path, // đường dẫn file ảnh đại diện
          fullname: input.fullname,
          birthday: new Date(input.birthday),
          gender: input.gender,
          role: input.role,
          password: await bcrypt.hash(input.password, 10), // mã hóa mật khẩu
        });
  
        // Nếu là vai trò 'member', kiểm tra các thông tin bắt buộc
        if (
          input.role === "member" &&
          (!input.chapterId ||
            !input.cardId ||
            !input.position ||
            !input.joinedAt ||
            !input.address ||
            !input.hometown ||
            !input.ethnicity ||
            !input.religion ||
            !input.eduLevel)
        ) {
          return response(res, 400, "MISSING_MEMBER_DATA");
        }
  
        // Nếu là 'member', kiểm tra cardId có trùng không
        if (input.role === "member" && input.cardId) {
          const existingMember = await Member.findOne({ cardId: input.cardId });
          if (existingMember) {
            console.warn(`${logPrefix} Validation failed: cardId has duplicated`);
            return response(res, 400, "INVALID_MEMBER_DATA");
          } else {
            // Tạo mới member và gán vào tài khoản
            const member = new Member({
              chapterId: input.chapterId,
              cardId: input.cardId,
              position: input.position,
              joinedAt: input.joinedAt,
              address: input.address,
              hometown: input.hometown,
              ethnicity: input.ethnicity,
              religion: input.religion,
              eduLevel: input.eduLevel,
            });
            await member.save();
            account.infoMember = member._id;
            console.log(`${logPrefix} Member created and linked`, member._id);
          }
        }
  
        // Nếu là vai trò 'manager', cần có chapterId
        if (input.role === "manager" && !input.chapterId) {
          return response(res, 400, "MISSING_MANAGER_DATA");
        }
  
        // Gán chapterId nếu là manager
        if (input.role === "manager") {
          account.managerOf = input.chapterId;
          console.log(`${logPrefix} Manager assigned`, input.manager);
        }
  
        // Cập nhật trạng thái và lưu tài khoản
        account.status = "waiting";
        await account.save();
  
        // Lấy lại tài khoản đã lưu và populate infoMember
        const savedAccount = await Account.findById(account._id).populate(
          "infoMember"
        );
        console.log(`${logPrefix} Account saved successfully`, savedAccount._id);
        return response(res, 201, "ACCOUNT_CREATED", savedAccount);
      } catch (error) {
        console.error(`${logPrefix} Error:`, error);
        return response(res, 500, "SERVER_ERROR");
      }
  };

  const login = async (req, res) => {
    const logPrefix = "[AuthController][login]";
    console.log(`${logPrefix} Start with data:`, req.body);

    try {
      const input = req.body;

      // Build query
      const query = {};
      if (input.credentials.email) {
        query.email = input.credentials.email;
      } else if (input.credentials.phone) {
        query.phone = input.credentials.phone;
      }

      // Find account
      const account = await Account.findOne(query);
      
      if (!account) {
        console.warn(`${logPrefix} Account not found`);
        return response(res, 401, "INVALID_CREDENTIALS");
      }

      // Compare password
      const isMatch = await bcrypt.compare(input.credentials.password, account.password);
      if (!isMatch) {
        console.warn(`${logPrefix} Password not match`);
        return response(res, 401, "INVALID_CREDENTIALS");
      }

      if(account.status == "waiting" || account.status == 'banned' ){
        console.warn(`${logPrefix} Account has status`);
        return response(res, 401, "INVALID_ACCOUNT");
      }

      // Generate token
      const token = generateToken(account);
      res.cookie('token', token, {
        httpOnly: false
      });
      console.log(verifyToken(token))
      console.log(`${logPrefix} Login successful`, account._id);
      return response(res, 200, "LOGIN_SUCCESS", { token });

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  const logout = async (req, res) => {
    const logPrefix = "[AuthController][logout]";
    console.log(`${logPrefix} Start for account:`, req.accountId);

    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      });

      console.log(`${logPrefix} Logout successful`);
      return response(res, 200, "LOGOUT_SUCCESS");

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  const getProfile = async (req, res) => {
    const logPrefix = "[AuthController][getProfile]";
    const decode = verifyToken(req.cookies.token);
    const accountId = decode.id;
    console.log(decode);
    console.log(`${logPrefix} Start for account:`, accountId);

    try {
      const account = await Account.findById(accountId)
        .populate('infoMember').populate('managerOf')
        .lean();

      if (!account) {
        console.warn(`${logPrefix} Account not found`);
        return response(res, 404, "ACCOUNT_NOT_FOUND");
      }

      // Remove sensitive data
      delete account.password;
      delete account.__v;

      console.log(`${logPrefix} Profile retrieved successfully`);
      return response(res, 200, "PROFILE_FETCHED", account);
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

const updateProfile = async (req, res) => {
  const logPrefix = "[AuthController][updateProfile]";
   const decode = verifyToken(req.cookies.token);
    const accountId = decode.id;
    console.log(decode);
    console.log(`${logPrefix} Start for account:`, accountId, req.file);
  try {
       const input = req.body;
       const file = req.file;
       const currentAccount = await Account.findById(accountId);
  if (
          !input.email ||
          !input.phone ||
          !input.fullname ||
          !input.birthday ||
          !input.gender ||
          !input.role ||
          !input.password
        ) {
          return response(res, 400, "MISSING_ACCOUNT_DATA");
        }
       // Kiểm tra email đã tồn tại chưa
       const existingAccount = await Account.findOne({ email: input.email });
       if (
         existingAccount &&
         existingAccount._id.toString() != currentAccount._id.toString()
       ) {
         console.warn(`${logPrefix} Validation failed: Email has registered`);
         return response(res, 400, "INVALID_ACCOUNT_DATA");
       }
 
       // Tạo đối tượng tài khoản mới
       const updatingAccount = new Account({
         email: input.email,
         phone: input.phone,
         avatar: file?.path, // đường dẫn file ảnh đại diện
         fullname: input.fullname,
         birthday: new Date(input.birthday),
         gender: input.gender,
         password: await bcrypt.hash(input.password, 10), // mã hóa mật khẩu
       });
 
       if(input.avatar){
        currentAccount.avatar == updatingAccount.avatar
       }
       const allowedFields = [
         "email",
         "phone",
         "fullname",
         "birthday",
         "gender",
       ];
       for (const field of allowedFields) {
         console.log(field);
         currentAccount[field] = updatingAccount[field]; // gán giá trị từng key
       }
 
       const currentMember = await Member.findById(currentAccount.infoMember);
       const existingMember = await Member.findOne({ cardId: input.cardId });
       // Nếu là vai trò 'member', kiểm tra các thông tin bắt buộc
       if (
         input.role === "member" &&
         (!input.chapterId ||
           !input.cardId ||
           !input.position ||
           !input.joinedAt ||
           !input.address ||
           !input.hometown ||
           !input.ethnicity ||
           !input.religion ||
           !input.eduLevel)
       ) {
         return response(res, 400, "MISSING_MEMBER_DATA");
       }
 
       // Nếu là 'member', kiểm tra cardId có trùng không
       if (
         input.role === "member" &&
         input.cardId &&
         existingMember &&
         existingMember._id.toString() != currentMember._id.toString()
       ) {
         const existingMember = await Member.findOne({ cardId: input.cardId });
         if (existingMember) {
           console.warn(`${logPrefix} Validation failed: cardId has duplicated`);
           return response(res, 400, "INVALID_MEMBER_DATA");
         } else {
           // Tạo mới member và gán vào tài khoản
           const updatingMember = new Member({
             chapterId: input.chapterId,
             cardId: input.cardId,
             position: input.position,
             joinedAt: input.joinedAt,
             address: input.address,
             hometown: input.hometown,
             ethnicity: input.ethnicity,
             religion: input.religion,
             eduLevel: input.eduLevel,
           });
 
           for (const field in currentMember) {
             currentMember[field] = updatingMember[field]; // gán giá trị từng key
             await currentMember.save();
           }
           console.log(
             `${logPrefix} Member created and linked`,
             currentMember._id
           );
         }
       }
 
       // Nếu là vai trò 'manager', cần có chapterId
       if (input.role === "manager" && !input.chapterId) {
         return response(res, 400, "MISSING_MANAGER_DATA");
       }
 
       // Gán chapterId nếu là manager
       if (input.role === "manager") {
         currentAccount.managerOf = input.chapterId;
         console.log(`${logPrefix} Manager assigned`, input.manager);
       }
 
       // Cập nhật trạng thái và lưu tài khoản
       currentAccount.status = "active";
       await currentAccount.save();
 
       // Lấy lại tài khoản đã lưu và populate infoMember
       const savedAccount = await Account.findById(currentAccount._id)
         .populate("infoMember")
         .populate("managerOf");
       console.log(`${logPrefix} Account saved successfully`, savedAccount._id);
       return response(res, 201, "ACCOUNT_UPDATED", savedAccount);
     } catch (error) {
       console.error(`${logPrefix} Error:`, error);
       return response(res, 500, "SERVER_ERROR");
     }
};
  return {
    register,
    login,
    logout,
    getProfile,
    updateProfile
  };
};

export default AuthController();