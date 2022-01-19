/*
in this code used to handel Reset password 
*/


const express = require("express");
const router = express.Router();
const { UserSchem } = require("../moduls/SignUpModuls");
const { sendConfirmationEmail } = require("../emailConfrmation");
const bcrypt = require("bcrypt");
const saltRounds = 10;
let tokenGlobel;
router.post("/resetPassword", async (request, response) => {
  try {
    const userIsRegistered = await UserSchem.findOne({
      email: request.body.email,
    });
    if (userIsRegistered) {
      const token = userIsRegistered.confirmationCode;

      tokenGlobel = token;
      const api = `http://localhost:3000/RestPasswordForm/${token}`;
      sendConfirmationEmail(userIsRegistered.name, userIsRegistered.email, api);

      response.json({ seccess: true, data: data });
    } else {
      response.json({
        seccess: false,
        messeg: "This user is not registered , please try another user",
      });
    }
  } catch (error) {
    response.json({ seccess: false, messeg: error });
  }
});

router.post("/sendResetpassword", async (request, response, next) => {
  const salt = await bcrypt.genSalt(saltRounds);
  let encryptedPassword = await bcrypt.hash(request.body.password, salt);

  const user = await UserSchem.findOne({ confirmationCode: tokenGlobel });
  if (user) {
    user.password = encryptedPassword;
    try {
      await user.save().then((data) => {
        response.json({ seccess: true, data: data });
      });
    } catch (error) {
      {
        response.json({ seccess: false, messeg: error });
      }
    }
  } else {
    response.json({
      seccess: false,
      messeg: "This is not , please try another user",
    });
  }

  tokenGlobel = "";
});
module.exports = router;
