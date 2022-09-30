const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var dbconnection = require("./db");

var productsRoute = require("./routes/ProductRoute");
var userRoute = require("./routes/UserRoute");

app.use(bodyParser.json());
app.use("/api/products/", productsRoute);
app.use("/api/users/", userRoute);

app.get("/", (req, res) => {
  res.send("Initial");
});

const port = 8000;

app.listen(port, () => console.log("Server is running!"));
