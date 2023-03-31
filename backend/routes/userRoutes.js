import express from 'express'
const userRouter = express.Router();
import {
    getOTP,
    secret,
    uploadOTP
} from '../controllers/userController.js';
import verifyUser from '../middlewares/verify.js';

userRouter
    .get('/getotp', verifyUser, getOTP)
    .get('/secret', verifyUser, secret)
    .get('/upload', (req, res) => {
        res.render("upload.ejs")
    })
    .post('/upload', verifyUser, uploadOTP)

export default userRouter;