const express = require("express");

const Report = require("../models/ReportModel");
const router = express.Router();

router.post("/submitBugReport", async (req, res) => {
  const { title, description } = req.body.bug;
  try {
    const bugReport = new Report({
      reportType: "Bug",
      title: title,
      description: description,
      dateCreated: new Date().getTime(),
      status: "undone",
    });

    bugReport.save();

    res.send(true);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Something went wrong submitting bug report.` });
  }
});

router.post("/submitSuggestion", async (req, res) => {
  const { title, description } = req.body.suggestion;
  try {
    const suggestion = new Report({
      reportType: "Suggestion",
      title: title,
      description: description,
      dateCreated: new Date().getTime(),
      status: "undone",
    });

    suggestion.save();

    res.send(true);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Something went wrong submitting bug report.` });
  }
});

module.exports = router;
