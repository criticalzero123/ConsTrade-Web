const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      require,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
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
