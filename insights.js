// insights.js

const mongoose = require("mongoose");
const {User} = require("./model/userSchema");
const Insight = require("./model/insightSchema");

async function updateInsights() {
  try {
    const maleCount = await User.countDocuments({ gender: "male" });
    const femaleCount = await User.countDocuments({ gender: "female" });
    const otherCount = await User.countDocuments({ gender: "other" });

    // Perform calculations for country and company counts
    const countryCounts = await User.collection
      .aggregate([
        {
          $group: {
            _id: "$country",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const companyCounts = await User.collection
      .aggregate([
        {
          $group: {
            _id: "$company",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    // Prepare the updated insights object
    const updatedInsights = {
      maleCount,
      femaleCount,
      otherCount,
      countryCounts,
      companyCounts,
    };

    // Update the existing Insight object or create a new one
    await Insight.findOneAndUpdate({}, updatedInsights, { upsert: true });

    console.log("Insights updated successfully.");
  } catch (error) {
    console.error("Error updating insights:", error);
  }
}

module.exports = { updateInsights };
