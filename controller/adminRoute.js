const express = require("express");
const router = express.Router();
const { updateInsights } = require("../insights.js");
const Insights = require("../model/insightSchema");
//const async = require("hbs/lib/async.js");
const { Feedback } = require("../model/feedbackSchema.js");

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

router.get("/feedback/all", async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
    console.log(feedbacks)
    res.status(200).json({feedbacks})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error getting feedbacks" })
  }
})

router.get("/feedback/", async (req, res) => {
  try {
    const productid = req.query.productid
    const productname = req.query.productname
    if (productid) {
      const feedbacks = await Feedback.find({ productid })
      res.status(200).json(feedbacks)
    } else if (productname) {
      const feedbacks = await Feedback.find({ productname })
      res.status(200).json(feedbacks)
    } else {
      res.status(400).json({ error: "Invalid query" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error getting feedbacks" })
  }
})


module.exports = router;
