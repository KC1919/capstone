import express from 'express'
const authRouter = express.Router();
import { register, login } from '../controllers/authController.js'

authRouter
    .post('/register', register)
    .post('/login', login)

export default authRouter;