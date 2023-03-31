// const CryptoJS = require("crypto-js");
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import User from '../models/userModel.js'
import {
    conceal,
    reveal
} from 'steganojs';

import fs from 'fs';

export const getOTP = async (req, res) => {
    try {

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.EMAIL}`, //sender process.env.EMAIL
                pass: `${process.env.PASS}` //process.env.PASS
            }
        });

        const otp = crypto.randomInt(0, 1000000).toString();

        // console.log(otp);

        let data = fs.readFileSync('public/img/sample2.png');

        // console.log(data);

        const encodedFile = conceal(
            data,
            otp,
        );

        let encodedString = encodedFile.toString('base64');

        await User.updateOne({
            "email": req.user
        }, {
            "otp": otp,
            "encoded": encodedString
        })

        // fs.writeFileSync("public/img/otp.png", encodedFile);

        // console.log(req.user);
        // setup email data with unicode symbols
        let mailOptions = {
            from: `${process.env.EMAIL}`, // sender address 
            to: `${req.user}`, // receiver email address
            subject: 'OTP', // Subject line
            text: "You've got an OTP",
            attachments: [{
                filename: 'otp.png',
                content: Buffer.from(encodedFile, "base64")
            }],
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            console.log('Message sent');
            transporter.close();
            res.status(200).json({
                message: "OTP sent successfully",
                // messageId: info.messageId
            })
        });

    } catch (error) {
        console.log(error);
    }
}

export const uploadOTP = async (req, res) => {
    try {

        const buffer = req.files.image.data;

        const data = buffer.toString("base64");

        const otp = reveal(
            buffer
            /*, optional Buffer Encoding
            , optional AES256 encryption password */
        ).toString();

        console.log(otp);


        const user = await User.findOne({
            "email": req.user
        }, {
            "_id": 0,
            "otp": 1,
            "encoded": 1
        })

        if (user.otp === otp && data === user.encoded) {

            await User.findOneAndUpdate({
                "email": req.user
            }, {
                $set: {
                    "otp": "",
                    "encoded": ""
                }
            }, {
                new: true
            });
            
            res.status(200).json({
                "message": "OTP Verified Successfully",
                "success": true
            })
        } else {
            res.status(200).json({
                "message": "OTP Verification Failed",
                "success": true
            })
        }
    } catch (error) {
        res.status(500).json({
            "message": "OTP Verification Failed, server error",
            "success": false,
            "error":error.message
        })
    }
}

export const secret = async (req, res) => {
    try {
        res.status(200).json({
            message: "reached secret route",
            success: true
        });

        // console.log(req.user);

    } catch (error) {
        res.status(500).json({
            message: "Cannot reach secret route, server error",
            error: error.message
        })
    }
}