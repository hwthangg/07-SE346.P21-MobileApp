const MemberServiceInterface = require("./interfaces/memberInterfaceService");

class MemberService extends MemberServiceInterface {
  constructor(memberRepository) {
    super();
    this.memberRepository = memberRepository;
  }

  async getAllMembers() {
    return await this.memberRepository.getAll();
  }

  async getMemberById(id) {
    const member = await this.memberRepository.getById(id);
    if (!member) throw new Error("Member not found");
    return member;
  }

  async createMember(data) {
    return await this.memberRepository.create(data);
  }

  async updateMember(id, data) {
    const member = await this.memberRepository.update(id, data);
    if (!member) throw new Error("Member not found");
    return member;
  }

  async deleteMember(id) {
    const member = await this.memberRepository.delete(id);
    if (!member) throw new Error("Member not found");
    return member;
  }
}

module.exports = MemberService;
