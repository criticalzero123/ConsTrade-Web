const express = require("express");

const router = express.Router();

const Product = require("../models/ProductModel");

router.get("/getallproducts", (req, res) => {
  Product.find({}, (err, docs) => {
    if (!err) {
      return res.send(docs);
    } else {
      return res
        .status(400)
        .json({ message: "Something went wrong fetching all products." });
    }
  });
});

router.post("/getProductByUserId", (req, res) => {
  Product.find({ uid: req.body.id }, (err, docs) => {
    if (!err) {
      return res.send(docs);
    } else {
      return res.status(400).json({
        message: "Something went wrong fetching all products by user id.",
      });
    }
  });
});

router.post("/getproductbyid", (req, res) => {
  Product.find({ _id: req.body.id }, (err, docs) => {
    if (!err) {
      res.send(docs[0]);
    } else {
      return res
        .status(400)
        .json({ message: "Something Went wrong fetching item details" });
    }
  });
});

router.post("/addProduct", (req, res) => {
  const { data } = req.body;

  const newProduct = new Product({
    userId: data.userId,
    title: data.title,
    description: data.description,
    location: data.location,
    gameGenre: data.category,
    platform: data.platform,
    condition: data.condition,
    imageURL: data.imageURL,
    preferTrade: data.preferTrade,
    cash: data.cash,
    item: data.item,
    deliveryType: data.deliveryType,
    dateCreated: new Date().getTime(),
  });
  newProduct.save((err) => {
    if (!err) {
      res.send(`Product add Successful`);
    } else {
      res.send(`Product add went wrong`);
    }
  });
});

module.exports = router;
