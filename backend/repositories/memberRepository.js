const Member = require("../models/memberModel");
const MemberRepositoryInterface = require("./interfaces/memberRepositoryInterface");

class MemberRepository extends MemberRepositoryInterface {
  async getAll() {
    return await Member.find();
  }

  async getById(id) {
    return await Member.findById(id);
  }

  async create(data) {
    const member = new Member(data);
    return await member.save();
  }

  async update(id, data) {
    return await Member.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await Member.findByIdAndDelete(id);
  }
}

module.exports = MemberRepository;
