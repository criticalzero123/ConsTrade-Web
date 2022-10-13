const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Transaction = require("../models/TransactionModel");
const Product = require("../models/ProductModel");

router.post("/soldProduct", async (req, res) => {
  const { productId, userId } = req.body;

  const getProduct = await Product.findById({ _id: productId });

  if (getProduct.status === "unsold") {
    const newTransaction = new Transaction({
      productId: productId,
      buyerId: userId,
      inAppTransac: true,
      dateTransac: new Date().getTime(),
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

  // Product.findById({ _id: productId }, (err, docs) => {
  //   if (!err && docs.status === "unsold") {
  //     const newTransaction = new Transaction({
  //       productId: productId,
  //       buyerId: userId,
  //       inAppTransac: true,
  //       dateTransac: new Date().getTime(),
  //     });

  //     newTransaction.save(async (err) => {
  //       if (!err) {
  //         docs.status === "sold";
  //         docs.save((err) => {
  //           if (!err) {
  //             res.send(docs);
  //           } else {
  //             return res.status(400).json({
  //               message:
  //                 "Unavailable to process at this moment. Please Try again.",
  //             });
  //           }
  //         });
  //       } else {
  //         res.status(400).json({ message: err });
  //       }
  //     });
  //   } else {
  //     return res.status(400).json({
  //       message: "Product already sold",
  //     });
  //   }
  // });

  // const newTransaction = new Transaction({
  //   productId: productId,
  //   buyerId: userId,
  //   inAppTransac: true,
  //   dateTransac: new Date().getTime(),
  // });

  // newTransaction.save(async (err) => {
  //   if (!err) {
  //     Product.findByIdAndUpdate(
  //       { _id: productId },
  //       { $set: { status: "sold" } },
  //       (err, docs) => {
  //         if (docs) {
  //           // console.log(docs);
  //           res.send(docs);
  //         } else {
  //           return res.status(400).json({
  //             message: "Product sold not updated. Error occured",
  //           });
  //         }
  //       }
  //     );
  //   } else {
  //     res.status(400).json({ message: err });
  //   }
  // });
});

module.exports = router;
