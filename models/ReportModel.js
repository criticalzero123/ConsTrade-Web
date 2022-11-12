const mongoose = require("mongoose");

const ReportSchema = mongoose.Schema(
  {
    reportType: {
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
    status: {
      type: String,
      require,
    },
    dateCreated: {
      type: Date,
      require,
    },
  },
  { timeStamps: true }
);

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
