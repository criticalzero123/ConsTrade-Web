const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/UserModel");
const Product = require("../models/ProductModel");

router.post("/socialMediaAuth", (req, res) => {
  // authType = register || login
  const authType = req.body.authType;

  const message = authType === 1 ? "User Registration" : "User Login";

  User.findOne(
    { $or: [({ email: req.body.email }, { uid: req.body.uid })] },
    (err, docs) => {
      if (docs) {
        if (authType === 1)
          return res
            .status(400)
            .json({ message: "Account Already Registered" });
        else {
          // Login
          // console.log(docs);

          docs.lastActiveAt = new Date().getTime();
          docs.save().then((savedDoc) => {
            res.send(savedDoc);
          });
        }
      } else {
        if (authType === 2)
          return res.status(400).json({
            message: "You don't have any account yet, Please Register",
          });
        else {
          // Register
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            uid: req.body.uid,
            imagePhotoURL: req.body.imagePhotoURL,
            emailVerified: req.body.emailVerified,
            lastActiveAt: new Date().getTime(),
          });

          newUser.save((err) => {
            if (!err) {
              return res.status(201).json({
                message: "Account Registered!",
              });
            } else {
              return res.status(400).json({
                message: "You don't have any account yet, Please Register",
              });
            }
          });
        }
      }

      if (err) {
        return res
          .status(400)
          .json({ message: "Something went Wrong in social media auth" });
      }
    }
  );
});

router.post("/emailPasswordRegister", (req, res) => {
  User.findOne(
    { $or: [{ email: req.body.email }, { uid: req.body.uid }] },
    (err, docs) => {
      // no need to check if there are user
      // firebase will do this for us
      // TODO: usahay ang uid way i hatag i check ni
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        uid: req.body.uid,
        imagePhotoURL:
          "https://lh3.googleusercontent.com/u47bMeQILiIr-MZSU3O6DqlwKyje0DXNvnSTxwlK2BwrUi5IfVjefPF9oCq98qDMVyHspIoPJWY248iVJ4dHk57AJxio_bb0-6e0Gjmq_w_iRqDNmVpk7oNCmFvwP1JH-HDhj_lZKQ=w2400",
        emailVerified: req.body.emailVerified,
        lastActiveAt: new Date().getTime(),
      });

      newUser.save((err) => {
        if (!err) {
          res.send(`User Registration Successful`);
        } else {
          res.send(`User Registration went wrong`);
        }
      });

      if (err) {
        return res.status(400).json({
          message: "Something went Wrong in email and password register",
        });
      }
    }
  );
});

router.post("/emailPasswordLogin", (req, res) => {
  User.findOneAndUpdate(
    { $or: [{ email: req.body.email }, { uid: req.body.uid }] },
    { $set: { lastActiveAt: new Date().getTime() } },
    { new: true },
    (err, docs) => {
      if (docs) {
        // console.log(docs);
        res.send(docs);
      } else {
        return res.status(400).json({
          message: "User Not Found",
        });
      }
      if (err)
        return res.status(400).json({
          message: "Something went wrong in email and password login",
        });
    }
  );
});

router.post("/getUserById", (req, res) => {
  const { id } = req.body;
  console.log(id);
  User.findOne({ $or: [{ _id: id }, { uid: id }] }, (err, docs) => {
    if (docs) {
      res.send(docs);
    } else {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    if (err)
      return res.status(400).json({
        message: "Something went wrong in email and password login",
      });
  });
});

router.post("/addFavorite", async (req, res) => {
  const { userInfo, productId } = req.body;

  const user = await User.findById({ _id: userInfo._id });
  const product = await Product.findOne({ _id: productId });

  const exist = await user.favorites.some(
    (favorite) => favorite.productId == productId
  );

  if (!exist) {
    const favoriteModel = {
      productId: productId,
      productImage: product.imageURL,
      productTitle: product.title,
      ownerName: product.userName,
      dateAdded: new Date().getTime(),
    };

    user.favorites.push(favoriteModel);

    user.save(async (err) => {
      if (!err) {
        product.favoritesCount = product.favoritesCount + 1;

        product.save(async (err) => {
          if (!err) {
            // const user = await User.findById({ _id: userInfo._id });
            res.send(user);
          } else {
            return res
              .status(400)
              .json({ message: "Something went wrong in adding favorite" });
          }
        });
      } else {
        return res
          .status(400)
          .json({ message: "Something went wrong in adding favorite " });
      }
    });
  } else {
    const newFavorite = user.favorites.filter(
      (favorite) => favorite.productId != productId
    );

    user.favorites = newFavorite;

    user.save(async (err) => {
      if (err) {
        return res.status(400).json({
          message: "Something went wrong in removing favorite in users",
        });
      } else {
        product.favoritesCount = product.favoritesCount - 1;

        product.save((err) => {
          if (!err) {
            res.send(user);
          } else {
            return res.status(400).json({
              message:
                "Something went wrong in updating favorite count in product",
            });
          }
        });
      }
    });
    // user.updateOne(
    //   { $pull: { favorites: { productId: productId } } },
    //   async (err) => {
    //     if (err) {
    //       return res.status(400).json({
    //         message: "Something went wrong in removing favorite in users",
    //       });
    //     } else {
    //       product.favoritesCount = product.favoritesCount - 1;

    //       product.save((err) => {
    //         if (!err) {
    //           res.send(user);
    //         } else {
    //           return res.status(400).json({
    //             message:
    //               "Something went wrong in updating favorite count in product",
    //           });
    //         }
    //       });
    //     }
    //   }
    // );
  }
});

module.exports = router;
