const express = require("express");

const router = express.Router();

const Product = require("../models/ProductModel");
const User = require("../models/UserModel");

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

  try {
    let products;

    switch (category) {
      case "hotitems":
        // getting hot items by favorite counts by 2
        products = await Product.find({ favoritesCount: { $gte: 2 } });
        break;
      case "all":
        // Limit the all by 10
        products = await Product.find({}).limit(10);
        break;

      default:
        products = [];
        break;
    }

    res.send(products);
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong in getting by category",
    });
  }
});

router.post("/getProductByPlatform", async (req, res) => {
  const platform = req.body.platform;

  try {
    const productAllPlatform = await Product.find({
      platform: { $regex: platform, $options: "-i" },
    });

    return res.send(productAllPlatform);
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong fetching platform",
      errorMessage: error,
    });
  }
});

router.post("/getProductByGenre", async (req, res) => {
  const genre = req.body.genre;

  try {
    const productAllGenre = await Product.find({
      gameGenre: { $regex: genre, $options: "-i" },
    });

    return res.send(productAllGenre);
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong fetching genre",
      errorMessage: error,
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

router.post("/getproductbyid", async (req, res) => {
  const { id, currentUserId } = req.body;

  try {
    const product = await Product.findById({ _id: id });

    const exist = product.views.some(
      (userView) => userView?.toString() === currentUserId
    );

    if (!exist) {
      product.views.push(currentUserId);
      product.save();
    }

    return res.send(product);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something Went wrong fetching item details" });
  }
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
    imageListURL: data.imageListURL,
    modelNumber: data.modelNumber,
    serialNumber: data.serialNumber,
    preferTrade: data.preferTrade,
    cash: data.cash,
    item: data.item,
    views: [],
    deliveryType: data.deliveryType,
    dateCreated: new Date().getTime(),
    favoritesCount: 0,
    status: "unsold",
  });
  newProduct.save(async (err) => {
    if (!err) {
      const userInfo = await User.findById({ _id: data.userId });

      userInfo.countPost = userInfo.countPost + 1;
      userInfo.save((err) => {
        if (!err) {
          res.send(`Product add Successful`);
        } else {
          res.status(400).json({ message: `Adding Count Post went wrong` });
        }
      });
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

router.post("/editProduct", async (req, res) => {
  const { product, productId } = req.body;

  const productData = await Product.findById({ _id: productId });

  productData.title = product.title;
  productData.location = product.location;
  productData.description = product.description;
  productData.gameGenre = product.category;
  productData.platform = product.platform;
  productData.modelNumber = product.modelNumber;
  productData.serialNumber = product.serialNumber;
  productData.condition = product.condition;
  productData.imageURL = product.imageURL;
  productData.imageListURL = product.imageListURL;
  productData.preferTrade = product.preferTrade;
  productData.cash = product.cash;
  productData.item = product.item;
  productData.deliveryType = product.deliveryType;

  productData.save((err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Somethibng went wrong in updating a product" });
    } else {
      res.send(productId);
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
