/*
in this code used to handel confrmation and rest password conframtion
*/

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transport = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASSWORD_USER,
  },
});

exports.sendConfirmationEmail = (name, email, api, token) => {
  transport
    .sendMail({
      from: email,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=${api}> Click here</a>
          </div>`,
    })
    .catch((err) => console.log(err));
};
