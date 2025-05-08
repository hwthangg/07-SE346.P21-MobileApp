import express from "express";
import MemberController from "../controllers/member.controller.js";

const MemberRoutes = express.Router();

// Tạo mới một thành viên
MemberRoutes.post("/", MemberController.createMember);

// Lấy tất cả thành viên với filter (nếu có)
MemberRoutes.get("/", MemberController.getAllMembersWithFilter);

// Lấy thông tin thành viên theo ID
MemberRoutes.get("/:memberId", MemberController.getMemberById);

// Cập nhật thành viên theo ID
MemberRoutes.put("/:memberId", MemberController.updateMemberById);

// Xoá mềm thành viên theo ID
MemberRoutes.delete("/:memberId", MemberController.deleteMemberById);

// Chuyển sinh hoạt đoàn viên
MemberRoutes.post("/:memberId/transfer-logs/:chapterId", MemberController.requestTransfer)

// Tiếp nhận đoàn viên
MemberRoutes.patch("/:memberId/transfer-logs", MemberController.acceptTransfer)

export default MemberRoutes;
