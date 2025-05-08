import Chapter from "../models/chapter.model.js";
import User from "../models/user.model.js";

const UserController = () => {
  const createUser = async (req, res) => {
    try {
      const userData = req.body;
      const existingUser = await User.findOne({
        $or: [{ email: userData.email }, { phone: userData.phone }],
      });
      if (existingUser) {
        return res.status(409).send("Email or phone is already in use");
      }
      const newUser = await new User(userData).save();
      return res.status(201).send(newUser);
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  const retrieveOneUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (user) {
        return res.status(200).send(user);
      } else {
        return res.status(404).send("User not found");
      }
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  const retrieveManyUsers = async (req, res) => {
    try {
      const filter = req.query;
      const users = await User.find(filter);
      if (users.length > 0) {
        return res.status(200).send(users);
      } else {
        return res.status(404).send({ message: "No users found" });
      }
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  const updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const userData = req.body;
      const existingUser = await User.findOne({
        $or: [{ email: userData.email }, { phone: userData.phone }]
      });
      if (existingUser) {
        return res.status(409).send("Email or phone is already in use");
      }
      const updatedUser = await User.findByIdAndUpdate(userId, userData, {
        new: true,
      });
      if (updatedUser) {
        return res.send(updatedUser);
      } else {
        return res.status(404).send("User not found");
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const deletedUser = await User.findByIdAndDelete(userId);
      if (deletedUser) {
        return res.send(deletedUser);
      } else {
        return res.status(404).send("User not found");
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  const setUserChapterId = async (req, res) => {
    try {
      const { userId, chapterId } = req.params; // Lấy userId và chapterId từ URL params

      // Kiểm tra xem chapter có tồn tại hay không
      const existingChapter = await Chapter.findById(chapterId);
      if (!existingChapter) {
        return res.status(404).send("Chapter not found"); // Nếu không có chapter thì trả về lỗi
      }

      // Cập nhật chapterId cho người dùng
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { chapterId },
        { new: true } // Trả về bản ghi sau khi đã cập nhật
      );

      if (updatedUser) {
        return res.send(updatedUser); // Trả về người dùng sau khi cập nhật thành công
      } else {
        return res.status(404).send("User not found"); // Không tìm thấy người dùng để cập nhật
      }
    } catch (error) {
      // Nếu có lỗi xảy ra trong quá trình xử lý
      res.status(500).send({
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  return {
    createUser,
    retrieveOneUser,
    retrieveManyUsers,
    updateUser,
    deleteUser,
    setUserChapterId,
  };
};

export default UserController();
