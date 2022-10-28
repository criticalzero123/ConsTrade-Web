const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      require,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      require,
    },
    inAppTransac: {
      type: Boolean,
      require,
    },
    getWant: {
      type: String,
      require,
    },
    dateTransac: {
      type: Date,
      require,
    },
  },
  {
    timeStamps: true,
  }
);

const Transaction = mongoose.model("transactions", transactionSchema);

module.exports = Transaction;
