import express from 'express'
const authRouter = express.Router();
import {
    register,
    login
} from '../controllers/authController.js'

authRouter
    .get('/register', (req, res) => {
        res.render("register.ejs")
    })
    .get('/login',(req,res)=>{
        res.render('login.ejs')
    })
    .post('/register', register)
    .post('/login', login)

export default authRouter;