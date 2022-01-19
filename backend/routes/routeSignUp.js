/*
in this code used to handel creation of the new user 
*/
const express = require("express");
const router = express.Router();
const { UserSchem } = require("../moduls/SignUpModuls");
const Jwt = require("jsonwebtoken");
const { sendConfirmationEmail } = require("../emailConfrmation");

const { userRegVadilation } = require("../helper");
const bcrypt = require("bcrypt");
const saltRounds = 10;
router.post("/signup", async (request, response) => {
  const { error } = userRegVadilation(request.body);

  if (error) {
    response.json({ seccess: false, messeg: error.details[0].message });
  } else {
    const userIsRegistered = await UserSchem.findOne({
      email: request.body.email,
    });
    if (!userIsRegistered) {
      const token = Jwt.sign(
        { email: request.body.email },
        process.env.JWT_SIGNIN_KEY,
        { expiresIn: "7d" }
      );
      const salt = await bcrypt.genSalt(saltRounds);
      let encryptedPassword = await bcrypt.hash(request.body.password, salt);
      const newUser = await new UserSchem({
        email: request.body.email,
        password: encryptedPassword,
        confirmationCode: token,
        name: request.body.name,
      });
      const api = `http://localhost:4000/app/confirm/${newUser.confirmationCode}`;
      sendConfirmationEmail(newUser.name, newUser.email, api, null);

      try {
        await newUser.save().then((data) => {
          response.json({
            seccess: true,
            messeg: "user is seccessfuly registered",
          });
        });
      } catch (error) {
        response.json({ seccess: false, messeg: error });
      }
    } else {
      response.json({
        seccess: false,
        messeg: "This user is registered , please try another user",
      });
    }
  }
});
router.get("/confirm/:confirmationCode", async (request, response, next) => {
  const confirmationCode = request.params.confirmationCode;

  await UserSchem.findOne({ confirmationCode: confirmationCode }).then(
    (user) => {
      user.status = "Active";
      user.save((err) => {
        if (err) {
          response.status(500).send({ message: err });
        }
      });
    }
  );
});

module.exports = router;
