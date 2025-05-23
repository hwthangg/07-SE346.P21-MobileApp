import express from 'express'
import { AuthController } from '../controllers/index.js'
import uploadSingle from "../middlewares/uploadSingle.js";

const AuthRoutes = express.Router()

AuthRoutes.post('/login', AuthController.login)
AuthRoutes.post('/register',uploadSingle('avatar'), AuthController.register)
AuthRoutes.delete('/logout', AuthController.logout)
AuthRoutes.get('/', AuthController.getProfile)
AuthRoutes.put('/',uploadSingle('avatar'), AuthController.updateProfile)


export default AuthRoutes