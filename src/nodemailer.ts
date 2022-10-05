require("dotenv").config();
const {API_MAIL, MAIL} = process.env;
import nodemailer from 'nodemailer';


export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: MAIL, // generated ethereal user
      pass: API_MAIL, // generated ethereal password
    },
  });

  transporter.verify().then(()=>{
    console.log('Ready for send emails');
  })