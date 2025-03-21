const User = require('../models/userModel')
const UserRepositoryInterface = require('./interfaces/userRepositoryInterface')

class UserRepository extends UserRepositoryInterface {
  async getAll () {
    return await User.find().populate('chapter_id')
  }

  async getById (id) {
    return await User.findById(id).populate('chapter_id')
  }

  async create (data) {
    const user = new User(data)
    return await user.save()
  }

  async update (id, data) {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    })
  }

  async delete (id) {
    return await User.findByIdAndDelete(id)
  }
}

module.exports = UserRepository
