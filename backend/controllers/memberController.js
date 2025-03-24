class MemberController {
  constructor(memberService) {
    this.memberService = memberService;
  }

  async getAllMembers(req, res) {
    try {
      const members = await this.memberService.getAllMembers();
      res.status(200).json(members);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

    async getMemberById(req, res) {
    try {
      const member = await this.memberService.getMemberById(req.params.id);
      res.status(200).json(member);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async createMember(req, res) {
    try {
      const member = await this.memberService.createMember(req.body);
      res.status(201).json(member);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateMember(req, res) {
    try {
      const member = await this.memberService.updateMember(
        req.params.id,
        req.body
      );
      res.status(200).json(document);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteMember(req, res) {
    try {
      await this.memberService.deleteMember(req.params.id);
      res.status(200).json({ message: "Member deleted" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = MemberController;
