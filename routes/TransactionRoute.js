const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Transaction = require("../models/TransactionModel");
const Product = require("../models/ProductModel");
const User = require("../models/UserModel");

router.post("/soldProduct", async (req, res) => {
  const { productId, userId, sellerId, getWant, inAppTransac } = req.body;

  const getProduct = await Product.findById({ _id: productId });

  if (getProduct.status === "unsold") {
    const newTransaction = new Transaction({
      productId: productId,
      buyerId: userId,
      sellerId: sellerId,
      inAppTransac: inAppTransac,
      dateTransac: new Date().getTime(),
      getWanted: getWant,
    });

    newTransaction.save(async (err) => {
      if (!err) {
        getProduct.status = "sold";
        getProduct.save((err) => {
          if (!err) {
            res.send(getProduct);
          } else {
            return res.status(400).json({
              message:
                "Unavailable to process at this moment. Please Try again.",
            });
          }
        });
      } else {
        res.status(400).json({ message: err });
      }
    });
  } else {
    return res.status(400).json({
      message: "Product already sold",
    });
  }
});

router.post("/getTransactionById", async (req, res) => {
  const { userId } = req.body;

  try {
    const UserInfoList = new Array();

    const transactions = await Transaction.find({ sellerId: userId });
    for (let i = 0; i < transactions.length; i++) {
      const { buyerId } = transactions[i];

      // if there is no buyer
      if (buyerId === "none") continue;

      const user = await User.findById({ _id: buyerId });

      const UserInfo = {
        name: user.name,
        email: user.email,
        imagePhotoURL: user.imagePhotoURL,
      };

      UserInfoList.push(UserInfo);
    }

    res.send(UserInfoList);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.get("/getAllTransactions", async (req, res) => {
  try {
    const transactionList = new Array();

    const transactions = await Transaction.find({});

    for (let i = 0; i < transactions.length; i++) {
      const element = transactions[i];

      // if there is no buyer
      if (element.buyerId === "none") continue;

      const seller = await User.findById({ _id: element.sellerId });
      const buyer = await User.findById({ _id: element.buyerId });

      const product = await Product.findById({ _id: element.productId });

      const _info = {
        buyerName: buyer.name,
        sellerName: seller.name,
        product: product,
        getWanted: element.getWanted,
      };

      transactionList.push(_info);
    }

    res.send(transactionList);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
