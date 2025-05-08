import UserController from "../controllers/user.controller.js";
import express from "express";

const UserRoutes = express.Router();

// Tạo người dùng
UserRoutes.post("/", UserController.createUser);

UserRoutes.post("/login", UserController.login);
UserRoutes.post("/logout", UserController.logout);

// Lấy danh sách người dùng (có filter)
UserRoutes.get("/", UserController.getAllUsersWithFilter);

// Lấy người dùng theo ID
UserRoutes.get("/:userId", UserController.getUserById);

// Cập nhật người dùng theo ID
UserRoutes.put("/:userId", UserController.updateUserById);

// Xoá mềm người dùng theo ID
UserRoutes.delete("/:userId", UserController.deletedUserById);

// Cấp quyền quản lý một chi đoàn
UserRoutes.patch("/:userId/lead-chapter/:chapterId", UserController.setChapterLeader)

export default UserRoutes;
