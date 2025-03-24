const express = require("express");
const router = express.Router();
const MemberRepository = require("../repositories/memberRepository");
const MemberService = require("../services/memberService");
const MemberController = require("../controllers/memberController");

// Dependency Injection
const memberRepository = new MemberRepository();
const memberService = new MemberService(memberRepository);
const memberController = new MemberController(memberService);

router.get("/members", memberController.getAllMembers.bind(memberController));
router.get("/members/:id", memberController.getMemberById.bind(memberController));
router.post("/members", memberController.createMember.bind(memberController));
router.put("/members/:id", memberController.updateMember.bind(memberController));
router.delete("/members/:id", memberController.deleteMember.bind(memberController));

module.exports = router;
