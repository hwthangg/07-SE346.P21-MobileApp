import Chapter from "../models/chapter.model.js";
import User from "../models/user.model.js";

// Định nghĩa UserController
const UserController = () => {
  // Tạo người dùng mới
  const createUser = async (req, res) => {
    try {
      const inputUser = req.body; // Lấy dữ liệu người dùng từ body request

      // Kiểm tra xem email hoặc số điện thoại đã tồn tại trong DB chưa
      const isAlreadyEmailOrPhone = await User.findOne({
        $or: [{ email: inputUser.email }, { phone: inputUser.phone }],
      });

      if (isAlreadyEmailOrPhone) {
        res.status(409).send({
          status: "error",
          message: "Email or phone is already used", // Trả về lỗi nếu email/phone bị trùng
        });
        return;
      }

      // Tạo và lưu người dùng mới
      const newUser = await new User(inputUser).save();
      console.log(newUser); // In thông tin người dùng mới vào console (có thể xoá ở production)
      res.status(201).send("Creating user successfully"); // Trả về thông báo thành công
    } catch (error) {
      // Ghi log và trả về lỗi server
      console.log(`Error code: ${error.code} \nError message: ${error.message}`);
      res.status(500).send("Server Error");
    }
  };

  // Lấy tất cả người dùng có thể kèm theo bộ lọc
  const getAllUsersWithFilter = async (req, res) => {
    try {
      const inputFilter = req.query; // Lấy dữ liệu bộ lọc từ query string
      const users = await User.find(inputFilter); // Tìm người dùng theo bộ lọc

      console.log(users); // Log danh sách người dùng

      if (users.length < 1) {
        res.status(404).send({
          status: "error",
          message: "No users found", // Không tìm thấy người dùng phù hợp
        });
        return;
      }

      res.status(200).send({
        status: "success",
        message: "Retrieving users successfully",
        data: { users },
      });
    } catch (error) {
      // Trả lỗi server nếu có exception
      console.log(`Error code: ${error.code} \nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
        error,
      });
    }
  };

  // Lấy thông tin người dùng theo ID
  const getUserById = async (req, res) => {
    try {
      const inputId = req.params.userId; // Lấy ID từ route params
      const user = await User.findById(inputId); // Tìm người dùng theo ID

      if (!user) {
        res.status(404).send({
          status: "error",
          message: "User not found",
        });
        return;
      }

      res.status(200).send({
        status: "success",
        message: "Retrieving user successfully",
        data: { user },
      });
    } catch (error) {
      console.log(`Error code: ${error.code} \nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
        error,
      });
    }
  };

  // Cập nhật người dùng theo ID
  const updateUserById = async (req, res) => {
    try {
      const inputUserId = req.params.userId;
      const inputUpdatingUser = req.body;

      const currentUser = await User.findById(inputUserId); // Lấy người dùng hiện tại từ DB

      if (!currentUser) {
        res.status(404).send({
          status: "error",
          message: "User not found",
        });
        return;
      }

      // Kiểm tra xem email/phone có thay đổi không
      const isModifiedEmailOrPhone =
        currentUser.email != inputUpdatingUser.email ||
        currentUser.phone != inputUpdatingUser.phone;

      if (isModifiedEmailOrPhone) {
        // Nếu có thay đổi, kiểm tra email/phone mới đã được người khác dùng chưa
        const isAlreadyEmailOrPhone = await User.findOne({
          $or: [
            { email: inputUpdatingUser.email },
            { phone: inputUpdatingUser.phone },
          ],
        });

        if (isAlreadyEmailOrPhone) {
          res.status(409).send({
            status: "error",
            message: "Email or phone is already used",
          });
          return;
        }
      }

      // Cập nhật người dùng và trả về bản ghi mới
      const updatedUser = await User.findByIdAndUpdate(
        inputUserId,
        inputUpdatingUser,
        { new: true } // Trả về bản ghi sau khi cập nhật
      );

      res.status(200).send({
        status: "success",
        message: "Updating user successfully",
        data: { user: updatedUser },
      });
    } catch (error) {
      console.log(`Error code: ${error.code} \nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
        error,
      });
    }
  };

  // Xóa mềm người dùng theo ID (cập nhật status thành 'deleted')
  const deletedUserById = async (req, res) => {
    try {
      const inputUserId = req.params.userId;

      // Cập nhật trạng thái của người dùng thành "deleted"
      const deletedUser = await User.findByIdAndUpdate(
        inputUserId,
        { status: "deleted" },
        { new: true }
      );

      if (!deletedUser) {
        res.status(404).send({
          status: "error",
          message: "User not found",
        });
        return;
      }

      res.status(200).send({
        status: "success",
        message: "Deleting user successfully",
        data: { user: deletedUser },
      });
    } catch (error) {
      console.log(`Error code: ${error.code} \nError message: ${error.message}`);
      res.status(500).send({
        status: "error",
        message: error.message,
        error,
      });
    }
  };

  const setChapterLeader = async (req, res) => {
    try {
      const inputUserId = req.params.userId
      const inputChapterId = req.params.chapterId

      const chapter = await Chapter.findById(inputChapterId)

      if(!chapter){
        res.status(404).send({
          status: "error",
          message: "Chapter not found", 
        });
        return;
      }
      const leader = await User.findByIdAndUpdate(
        inputUserId,
        { chapterId: inputChapterId },
        { new: true }
      );

      if (!leader) {
        res.status(404).send({
          status: "error",
          message: "User not found",
        });
        return;
      }

      res.status(200).send({
        status: "success",
        message: "Setting chapter's leader successfully",
        data: { user: leader },
      });
      

    } catch (error) {
      console.log(
        `Error code: ${error.code} \nError message: ${error.message}`
      );
      res.status(500).send({
        status: "error",
        message: error.message,
        error,
      });
    }
  };

  const login = async(req, res) => {
  const resa = req.body
  console.log(resa.keyAuth)

  const user = await User.findOne({email: resa.keyAuth})

  if(!user){
    res.send({message:' no'})
    return
  }

  res.cookie('chapterId', String(user.chapterId))
  res.json(user)
  }

  const logout = async(req, res) => {

    res.clearCookie('chapterId');
    res.send('1')

  }

  // Trả về các hàm controller
  return {
    createUser,
    getAllUsersWithFilter,
    getUserById,
    updateUserById,
    deletedUserById,
    setChapterLeader,
    login,
    logout
  };
};

export default UserController();
