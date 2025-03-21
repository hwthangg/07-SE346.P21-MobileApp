class UserController {
  constructor (userService) {
    this.userService = userService
  }

  async getAllUsers (req, res) {
    try {
      const users = await this.userService.getAllUsers()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async getUserById (req, res) {
    try {
      const user = await this.userService.getUserById(req.params.id)
      res.status(200).json(user)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  }

  async createUser (req, res) {
    try {
      const user = await this.userService.createUser(req.body)
      res.status(201).json(user)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  async updateUser (req, res) {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body)
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  async deleteUser (req, res) {
    try {
      await this.userService.deleteUser(req.params.id)
      res.status(200).json({ message: 'User deleted' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
}

module.exports = UserController
