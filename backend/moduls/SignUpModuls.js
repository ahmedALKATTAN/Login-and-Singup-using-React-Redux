/*
the data structure is analyized here

*/
const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  id: String,
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
  passwordReset: {
    type: String,
    enum: ["Allow", "Deny"],
    default: "Deny",
  },
  // roles: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Role",
  //   },
  // ],
});
const UserSchem = mongoose.model("userTable", User);

module.exports = { UserSchem: UserSchem };
