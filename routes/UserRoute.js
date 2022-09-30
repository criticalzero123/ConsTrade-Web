const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/UserModel");

router.post("/googleauth", async (req, res) => {
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
          // TODO: update the lastActive in a use when login
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
            lastActiveAt: new Date().getTime(),
          });

          newUser.save((err) => {
            if (!err) {
              res.send(`${message} Successful`);
            } else {
              res.send(`${message} went wrong`);
            }
          });
        }
      }

      if (err) {
        return res.status(400).json({ message: "Something went Wrong" });
      }
    }
  );
});

module.exports = router;
