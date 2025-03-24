class MemberServiceInterface {
  async getAllMembers() {
    throw new Error("Method getAllMembers() must be implemented");
  }
  async getMemberById(id) {
    throw new Error("Method getMemberById() must be implemented");
  }
  async createMember(data) {
    throw new Error("Method createMember() must be implemented");
  }
  async updateMember(id, data) {
    throw new Error("Method updateMember() must be implemented");
  }
  async deleteMember(id) {
    throw new Error("Method deleteMember() must be implemented");
  }
}

module.exports = MemberServiceInterface;
