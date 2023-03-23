import express from 'express'
const userRouter = express.Router();
import {getOTP,secret} from '../controllers/userController.js';
import verifyUser from '../middlewares/verify.js';

userRouter
    .get('/getotp', getOTP)
    .get('/secret', verifyUser, secret);


export default userRouter;