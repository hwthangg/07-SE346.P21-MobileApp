const express = require('express')
const router = express.Router()
const UserRepository = require('../repositories/userRepository')
const UserService = require('../services/userService')
const UserController = require('../controllers/userController')

// Dependency Injection
const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

router.get('/users', userController.getAllUsers.bind(userController))
router.get('/users/:id', userController.getUserById.bind(userController))
router.post('/users', userController.createUser.bind(userController))
router.put('/users/:id', userController.updateUser.bind(userController))
router.delete('/users/:id', userController.deleteUser.bind(userController))

module.exports = router
