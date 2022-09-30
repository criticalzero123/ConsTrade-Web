const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
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
      require,
    },
    edited: {
      type: Boolean,
    },
    timeEdit: {
      type: Date,
    },
  },
  { timeStamps: true }
);

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require,
    },
    image: {
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
