/*
in this code used to handel login authintication
*/

const express = require("express");
const router = express.Router();
const { UserSchem } = require("../moduls/SignUpModuls");
const bcrypt = require("bcrypt");

router.post("/login", async (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  const user = await UserSchem.findOne({ email: email });
  if (user) {
    if (user.status === "Active") {
      const checkPassword = await bcrypt.compare(password, user.password);

      ////
      if (checkPassword) {
        response.json({
          auth: true,
          messeg: "done",
        });
      } else {
        response.json({
          messeg: "InValid user name Or passwored ! pleas try again",
          auth: false,
        });
      }
      /////
    } else {
      response.json({
        auth: false,

        messeg: "Email is Not Activated!! Pleas Activate ypur mail",
      });
    }
  } else {
    response.json({
      messeg: "user is not registered",
      auth: false,
    });
  }
});
module.exports = router;
