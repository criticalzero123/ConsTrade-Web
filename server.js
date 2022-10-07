const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var dbconnection = require("./db");
const path = require("path");

var productsRoute = require("./routes/ProductRoute");
var userRoute = require("./routes/UserRoute");

app.use(bodyParser.json());
app.use("/api/products/", productsRoute);
app.use("/api/users/", userRoute);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}
const port = process.env.PORT || 8000;

app.listen(port, () => console.log("Server is running!"));
