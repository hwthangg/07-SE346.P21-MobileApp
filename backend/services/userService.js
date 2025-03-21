const UserServiceInterface = require('./interfaces/userServiceInterface')

class UserService extends UserServiceInterface {
  constructor (userRepository) {
    super()
    this.userRepository = userRepository
  }

  async getAllUsers () {
    return await this.userRepository.getAll()
  }

  async getUserById (id) {
    const user = await this.userRepository.getById(id)
    if (!user) throw new Error('User not found')
    return user
  }

  async createUser (data) {
    // Có thể thêm logic nghiệp vụ, ví dụ: mã hóa password
    return await this.userRepository.create(data)
  }

  async updateUser (id, data) {
    const user = await this.userRepository.update(id, data)
    if (!user) throw new Error('User not found')
    return user
  }

  async deleteUser (id) {
    const user = await this.userRepository.delete(id)
    if (!user) throw new Error('User not found')
    return user
  }
}

module.exports = UserService
