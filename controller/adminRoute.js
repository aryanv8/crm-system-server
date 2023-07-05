const express = require("express");
const router = express.Router();
const { updateInsights } = require("../insights.js");
const Insights = require("../model/insightSchema");

router.patch("/update-insights", (req, res) => {
  updateInsights();
  res.send("Insights update triggered.");
});

router.get("/insights", async (req, res) => {
  try {
    // Get insights from database
    const insights = await Insights.find({});
    res.status(200).json({ insights });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting insights" });
  }
});

module.exports = router;
