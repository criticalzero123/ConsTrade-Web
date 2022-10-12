const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      require,
    },
    buyerId: {
      type: String,
      require,
    },
    inAppTransac: {
      type: Boolean,
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
