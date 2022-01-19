const Joi = require("joi");
const nodemailer = require("nodemailer");

exports.userRegVadilation = function userVadilation(user) {
  const Schema = Joi.object().keys({
    email: Joi.string(),
    password: Joi.string(),
    confirmationCode: Joi.string(),
    name: Joi.string(),
  });

  return Schema.validate(user);
};
