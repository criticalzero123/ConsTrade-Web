const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    name: {
      type: String,
      require,
    },
    imagePhoto: {
      type: String,
      require,
    },
    comment: {
      type: String,
      require,
    },
    edited: {
      type: Boolean,
      require,
    },
    timePosted: {
      type: Date,
      require,
    },
  },
  { timeStamps: true }
);

const productSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      require,
    },
    userName: {
      type: String,
      require,
    },
    title: {
      type: String,
      require,
    },
    description: {
      type: String,
      require,
    },
    location: {
      type: String,
      require,
    },
    modelNumber: {
      type: String,
      require,
    },
    serialNumber: {
      type: String,
      require,
    },
    gameGenre: {
      type: String,
      require,
    },
    platform: {
      type: String,
      require,
    },
    condition: {
      type: String,
      require,
    },
    imageURL: {
      type: String,
      require,
    },
    preferTrade: {
      type: String,
      require,
    },
    cash: {
      type: Number,
      require,
    },
    item: {
      type: String,
      require,
    },
    deliveryType: { type: String, require },
    dateCreated: {
      type: Date,
      require,
    },
    favoritesCount: {
      type: Number,
      require,
    },
    status: {
      type: String,
      require,
    },
    comments: [commentSchema],
  },
  {
    timeStamps: true,
  }
);

const Product = mongoose.model("products", productSchema);

module.exports = Product;
