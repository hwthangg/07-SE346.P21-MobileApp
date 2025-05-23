import { Account, Member } from "../models/index.js";
import { response, validateAccount } from "../utils/index.js";
import bcrypt from "bcryptjs";

const AccountController = () => {
  const createAccount = async (req, res) => {
    const logPrefix = "[AccountController][createAccount]";
    console.log(`${logPrefix} Start with data:`, req.body, req.file);

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
      account.status = "active";
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

  const getAccountsInPage = async (req, res) => {
    const logPrefix = "[AccountController][getAccountsInPage]";
    console.log(`${logPrefix} Start with query:`, req.query);

    try {
      // Lấy các tham số từ query, gán giá trị mặc định nếu không có
      const {
        page = 1,
        limit = 10,
        search,
        status = "active",
        role,
        sortBy = "createdAt",
        sortOrder = "asc",
      } = req.query;

      // Tạo bộ lọc tìm kiếm
      const filter = {};
      if (search) {
        filter.$or = [
          { email: { $regex: search, $options: "i" } }, // tìm gần đúng theo email
          { phone: { $regex: search, $options: "i" } }, // tìm gần đúng theo số điện thoại
          { fullname: { $regex: search, $options: "i" } }, // tìm gần đúng theo họ tên
        ];
        console.log(`${logPrefix} Search filter applied:`, filter.$or);
      }

      // Lọc theo trạng thái và vai trò nếu có
      if (status) filter.status = status;
      if (role && role != 'all') filter.role = role;

      // Tùy chọn phân trang và sắp xếp
      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 }, // sắp xếp tăng/giảm
        select: "avatar fullname email phone role status", // chỉ lấy một số trường cần thiết
      };
      console.log(`${logPrefix} Pagination options:`, options);

      // Thực hiện truy vấn phân trang
      const result = await Account.paginate(filter, options);
      console.log(`${logPrefix} Found ${result.docs.length} accounts`);

      // Trả về kết quả
      return response(res, 200, "ACCOUNTS_FETCHED", {
        accounts: result.docs,
        pagination: {
          currentPage: result.page,
          totalPages: result.totalPages,
          totalItems: result.totalDocs,
          itemsPerPage: result.limit,
        },
      });
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  const getAccountById = async (req, res) => {
    const logPrefix = "[AccountController][getAccountById]";
    console.log(`${logPrefix} Request for account:`, req.params.accountId);

    try {
      // Tìm tài khoản theo ID và lấy thêm thông tin liên kết (populate)
      const account = await Account.findById(req.params.accountId)
        .populate("infoMember") // Lấy thông tin đoàn viên nếu có
        .populate("managerOf"); // Lấy thông tin chi đoàn quản lý nếu có

      // Nếu không tìm thấy tài khoản
      if (!account) {
        console.warn(`${logPrefix} Account not found`);
        return response(res, 404, "ACCOUNT_NOT_FOUND");
      }

      // Nếu tìm thấy, trả về kết quả
      console.log(`${logPrefix} Account found`);
      return response(res, 200, "ACCOUNT_FETCHED", account);
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  const updateAccountById = async (req, res) => {
    const logPrefix = "[AccountController][updateAccount]";
    console.log(
      `${logPrefix} Start update for:`,
      req.params.accountId,
      req.body
    );

    try {
      const input = req.body;
      const file = req.file;

      const currentAccount = await Account.findById(req.params.accountId);

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
      });
      if (req.file) {
        currentAccount.avatar =req.file.path;
      }
        if (input.password) {
        currentAccount.password = await bcrypt.hash(input.password, 10)
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

      const currentMember = await Member.findById(currentAccount.infoMember);
      const existingMember = await Member.findOne({ cardId: input.cardId });

      // Nếu là 'member', kiểm tra cardId có trùng không

      if (
        existingMember &&
        existingMember._id.toString() != currentMember._id.toString()
      ) {
        console.warn(`${logPrefix} Validation failed: cardId has duplicated`);
        return response(res, 400, "INVALID_MEMBER_DATA");
      }
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
      const allowedMemberFields = [
        "cardId",
        "position",
        "joinedAt",
        "address",
        "hometown",
        "ethnicity",
        "religion",
         "eduLevel"
      ];
      for (const field of allowedMemberFields) {
        currentMember[field] = updatingMember[field]; // gán giá trị từng key
        
      }
      await currentMember.save();
      console.log(`${logPrefix} Member created and linked`, currentMember._id);

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

  /**
   * Thay đổi trạng thái tài khoản
   * Endpoint: PATCH /accounts/:accountId/status
   */
  const changeAccountStatus = async (req, res) => {
    const logPrefix = "[AccountController][changeStatus]";
    console.log(`${logPrefix} Request:`, req.params, req.body);

    try {
      const { accountId } = req.params;
      const { status } = req.body;

      // Validate status
      const validStatuses = ["active", "banned", "waiting"];
      if (!validStatuses.includes(status)) {
        console.warn(`${logPrefix} Invalid status: ${status}`);
        return response(res, 400, "INVALID_STATUS", { validStatuses });
      }

      // Find account
      const account = await Account.findById(accountId);
      if (!account) {
        console.warn(`${logPrefix} Account not found`);
        return response(res, 404, "ACCOUNT_NOT_FOUND");
      }

      // Check if status changed
      if (account.status === status) {
        console.log(`${logPrefix} Status not changed`);
        return response(res, 200, "STATUS_UNCHANGED");
      }

      // Update status
      const previousStatus = account.status;
      account.status = status;
      account.updatedAt = new Date();

      await account.save();
      console.log(
        `${logPrefix} Status changed from ${previousStatus} to ${status}`
      );

      return response(res, 200, "STATUS_UPDATED", {
        previousStatus,
        newStatus: status,
        updatedAt: account.updatedAt,
      });
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);

      if (error.name === "CastError") {
        return response(res, 400, "INVALID_ID");
      }

      return response(res, 500, "SERVER_ERROR");
    }
  };

  return {
    createAccount,
    getAccountsInPage,
    getAccountById,
    updateAccountById,
    changeAccountStatus,
  };
};

export default AccountController();
