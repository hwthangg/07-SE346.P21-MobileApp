
import express from "express";
import { MemberController } from "../controllers/index.js";

const MemberRoutes = express.Router();

MemberRoutes.get("/", MemberController.getMembersInPage);
MemberRoutes.get("/:memberId", MemberController.getMemberById);
MemberRoutes.put("/:memberId", MemberController.updateMemberById);
MemberRoutes.patch("/:memberId", MemberController.changeMemberStatus);

export default MemberRoutes;
