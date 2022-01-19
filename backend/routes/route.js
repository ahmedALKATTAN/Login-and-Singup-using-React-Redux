/*
in this code used to handel google login 
*/

const express = require("express");
const router = express.Router();
const { UserSchem } = require("../moduls/SignUpModuls");
const Joi = require("joi");
const Jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
const testgoogleID = process.env.REACT_APP_GOOGLE_ClIENT_ID;

const kickbox = require("kickbox").client(process.env.KICKBOX).kickbox();

const client = new OAuth2Client(process.env.JWT_SIGNIN_KEY);
dotenv.config();

const { userRegVadilation } = require("../helper");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/googlelogin", async (request, res) => {
  const { tokenId } = request.body;

  kickbox.verify(process.env.EMAIL_GOOGLE, function (err, response) {});
  client
    .verifyIdToken({ idToken: tokenId, audience: testgoogleID })
    .then(async (response) => {
      const { email_verified, name, email } = await response.payload;

      if (email_verified) {
        UserSchem.findOne({ email }).exec(async (err, user) => {
          if (err) {
            return response.status(400).json({
              error: "somthing Wrong ",
            });
          } else {
            if (user) {
              const token = Jwt.sign(
                { _id: user._id },
                process.env.JWT_SIGNIN_KEY,
                {
                  expiresIn: "7d",
                }
              );
              const { _id, name, email } = user;
              res.json({
                token,
                user: { _id, name, email },
              });
            } else {
              let RealPassword = email + process.env.JWT_SIGNIN_KEY;
              const salt = await bcrypt.genSalt(saltRounds);
              let password = await bcrypt.hash(RealPassword, salt);
              let newUser = new UserSchem({ name, email, password });
              newUser.save((error, data) => {
                if (error) {
                  return res.status(400).json({
                    error: "somthing Wrong ",
                  });
                }
                const token = Jwt.sign(
                  {
                    _id: data._id,
                  },
                  process.env.JWT_SIGNIN_KEY,
                  { expiresIn: "7d" }
                );
                const { _id, name, email } = newUser;
                res.json({
                  token,
                  user: { _id, name, email },
                });
              });
            }
          }
        });
      }
    });

  ////
});

module.exports = router;
