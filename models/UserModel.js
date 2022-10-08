const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      require,
    },
    productImage: {
      type: String,
      require,
    },
    productTitle: {
      type: String,
      require,
    },
    ownerName: {
      type: String,
      require,
    },
    dateAdded: {
      type: Date,
      require,
    },
  },
  { timeStamps: true }
);

const reviewSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      require,
    },
    name: {
      type: String,
      require,
    },
    comment: {
      type: String,
    },
    rating: {
      type: Number,
      require,
    },
  },
  {
    timeStamps: true,
  }
);

const userSchema = mongoose.Schema(
  {
    uid: {
      type: String,
      require,
    },
    name: {
      type: String,
      require,
    },
    email: {
      type: String,
      require,
    },
    imagePhotoURL: {
      type: String,
      require,
    },
    lastActiveAt: {
      type: Date,
      require,
    },
    emailVerified: {
      type: Boolean,
      require,
    },
    reviews: [reviewSchema],
    favorites: [favoriteSchema],
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
