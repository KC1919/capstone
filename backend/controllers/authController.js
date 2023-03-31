import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body

        const hash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name: name,
            email: email,
            password: hash
        })

        if (newUser != undefined) {
            res.status(200).json({
                message: "User created successfully",
                success: true
            })
        } else {
            res.status(201).json({
                message: "Failed to create user",
                success: false
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Failed to create user, internal server error",
            success: false,
            error: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        const user = await User.findOne({
            "email": email
        });

        if (user != undefined) {
            const status = await bcrypt.compare(password, user.password);
            if (status == true) {

                const token = jwt.sign({
                    "user": email
                }, process.env.SECRET_KEY)

                res.cookie(
                    'secret', token, {
                        httpOnly: true,
                        maxAge: 86400
                    })

                // console.log("reacched");

                res.status(200).json({
                    message: "User logged in successfully",
                    success: true
                })
            } else {
                res.status(201).json({
                    message: "Invalid email or password",
                    success: false
                })
            }
        } else {
            res.status(201).json({
                message: "User does not exists",
                success: false
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Login failed, internal server error",
            success: false
        })
    }
}

