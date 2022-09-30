const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var dbconnection = require("./db");

var productsRoute = require("./routes/ProductRoute");
app.use(bodyParser.json());
app.use("/api/products/", productsRoute);

app.get("/", (req, res) => {
  res.send("Initial");
});

const port = 8000;

app.listen(port, () => console.log("Server is running!"));
