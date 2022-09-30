const mongoose = require("mongoose");
require("dotenv").config();

var mongoDBURL = process.env.MONGODB_URL;

mongoose.connect(mongoDBURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

var dbconnect = mongoose.connection;

dbconnect.on("error", () => {
  console.log("Mongo DB Connection Failed");
});

dbconnect.on("connected", () => {
  console.log("Mongo DB Connected Successfully");
});

module.exports = mongoose;
