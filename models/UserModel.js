const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
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
    name: {
      type: String,
      require,
    },
    email: {
      type: String,
      require,
    },
    uid: {
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
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
