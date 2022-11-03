const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var dbconnection = require("./db");
const path = require("path");

var productsRoute = require("./routes/ProductRoute");
var userRoute = require("./routes/UserRoute");
var transactionRoute = require("./routes/TransactionRoute");
var followRoute = require("./routes/FollowRoute");
var reportRoute = require("./routes/ReportRoute");

app.use(bodyParser.json());
app.use("/api/products/", productsRoute);
app.use("/api/users/", userRoute);
app.use("/api/transactions/", transactionRoute);
app.use("/api/follows/", followRoute);
app.use("/api/reports/", reportRoute);

if (process.env.NODE_ENV === "production") {
  // For http redirect to https
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });

  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}
const port = process.env.PORT || 8000;

app.listen(port, () => console.log("Server is running!"));
