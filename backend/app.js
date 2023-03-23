import express  from 'express';
const app = express();
import connectDB from './config/db.js';
import authRouter from './routes/authRoute.js';
import userRouter  from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv'

dotenv.config({path:'./config/.env'});

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.use(express.static('public'))

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.listen(3000, () => {
    console.log("Server listening on port 3000");
    connectDB();
})