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

router.post("/getProductByPlatform", async (req, res) => {
  const platformCategory = req.body.platform;
  const productAllPlatform = await Product.find({
    $text: { $search: platformCategory, $caseSensitive: false },
  });

  if (productAllPlatform.length > 0) {
    return res.send(productAllPlatform);
  } else {
    return res.status(400).json({
      message: "No platform found",
    });
  }
});

router.post("/getProductByCategory", async (req, res) => {
  const category = req.body.category;

  const productAllCategory = await Product.find({
    $text: { $search: category, $caseSensitive: false },
  });

  if (productAllCategory.length > 0) {
    return res.send(productAllCategory);
  } else {
    return res.status(400).json({
      message: "No category found",
    });
  }
});

router.post("/getProductByUserId", (req, res) => {
  Product.find({ userId: req.body.id }, (err, docs) => {
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
    userName: data.name,
    title: data.title,
    description: data.description,
    location: data.location,
    gameGenre: data.category,
    platform: data.platform,
    condition: data.condition,
    imageURL: data.imageURL,
    modelNumber: data.modelNumber,
    serialNumber: data.serialNumber,
    preferTrade: data.preferTrade,
    cash: data.cash,
    item: data.item,
    deliveryType: data.deliveryType,
    dateCreated: new Date().getTime(),
    favoritesCount: 0,
  });
  newProduct.save((err) => {
    if (!err) {
      res.send(`Product add Successful`);
    } else {
      res.status(400).json({ message: `Product add went wrong` });
    }
  });
});

router.post("/deleteProduct", (req, res) => {
  Product.findByIdAndDelete(req.body.productid, (err) => {
    if (err) {
      return res.status(400).json({ message: "Something went wrong" + err });
    } else {
      res.send("Product deleted successfully");
    }
  });
});

router.post("/addCommentProduct", async (req, res) => {
  const { comment, productId, currentUser } = req.body;

  const product = await Product.findById({ _id: productId });

  const commentModel = {
    userId: currentUser._id,
    name: currentUser.name,
    imagePhoto: currentUser.imagePhotoURL,
    comment: comment,
    edited: false,
    timePosted: new Date().getTime(),
  };

  product.comments.push(commentModel);

  product.save(async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Something went wrong in adding comment" });
    } else {
      const product = await Product.findById({ _id: productId });

      res.send(product.comments);
    }
  });
});

router.post("/deleteCommentProduct", (req, res) => {
  Product.updateOne(
    { _id: req.body.productId },
    {
      $pull: { comments: { userId: req.body.userId, _id: req.body.commentId } },
    },
    async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Something went wrong in deleting comment" });
      } else {
        const product = await Product.findById({ _id: req.body.productId });

        res.send(product.comments);
      }
    }
  );
});

module.exports = router;
