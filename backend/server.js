/*
in this code used to handel mange the routes and mongoDB connections 
*/
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routerUrls = require("./routes/route");
const signup = require("./routes/routeSignUp");
const login = require("./routes/routeLogin");
const restEmail = require("./routes/routeResetPassword");
const cors = require("cors");
const https = require("https");
const bodyParser = require("body-parser");

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);

/// connect to the data base mongodb
mongoose
  .connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
  })
  .then(console.log("data base is connected "))
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use(cors());
app.use("/app", routerUrls);
app.use("/app", signup);
app.use("/app", login);
app.use("/app", restEmail);

app.listen(4000, () => console.log("Server Is running on port}"));
