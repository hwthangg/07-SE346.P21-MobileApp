class UserServiceInterface {
  async getAllUsers () {
    throw new Error('Method getAllUsers() must be implemented')
  }
  async getUserById (id) {
    throw new Error('Method getUserById() must be implemented')
  }
  async createUser (data) {
    throw new Error('Method createUser() must be implemented')
  }
  async updateUser (id, data) {
    throw new Error('Method updateUser() must be implemented')
  }
  async deleteUser (id) {
    throw new Error('Method deleteUser() must be implemented')
  }
}

module.exports = UserServiceInterface
