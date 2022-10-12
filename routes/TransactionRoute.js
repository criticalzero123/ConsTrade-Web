const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Transaction = require("../models/TransactionModel");
const Product = require("../models/ProductModel");

router.post("/soldProduct", (req, res) => {
  const { productId, userId } = req.body;

  const newTransaction = new Transaction({
    productId: productId,
    buyerId: userId,
    inAppTransac: true,
    dateTransac: new Date().getTime(),
  });

  newTransaction.save(async (err) => {
    if (!err) {
      Product.findByIdAndUpdate(
        { _id: productId },
        { $set: { status: "sold" } },
        (err, docs) => {
          if (docs) {
            // console.log(docs);
            res.send(docs);
          } else {
            return res.status(400).json({
              message: "Product sold not updated. Error occured",
            });
          }
        }
      );
    } else {
      res.status(400).json({ message: err });
    }
  });
});

module.exports = router;
