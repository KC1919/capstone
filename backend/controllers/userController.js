
// const CryptoJS = require("crypto-js");
import nodemailer from 'nodemailer';
import crypto from 'crypto';

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

        const otp = crypto.randomInt(0, 1000000).toString().padStart(6, "0");

        console.log(otp);

        let data = fs.readFileSync('public/img/sample2.png', 'base64');

        let newData = data.split("");
        let otpData = otp.split("");

        // console.log(newData);

        for (let i = 0; i < otpData.length; i++) {
            newData[otpData[i]] >> 1;
        }

        const cipher = newData.join("");

        // const buffer = Buffer.from(cipher, "base64");
        // console.log(buffer);

        // fs.writeFileSync("public/img/otp.png", buffer);

        // setup email data with unicode symbols
        let mailOptions = {
            from: `${process.env.EMAIL}`, // sender address 
            to: 'kunal.chandra1900@gmail.com', // members of the meeting
            subject: 'OTP', // Subject line
            text: "You've got an OTP",
            attachments: [{
                filename: 'otp.png',
                content: new Buffer(cipher, "base64")
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