// insights.js

const mongoose = require("mongoose");
const {User} = require("./model/userSchema");
const Insight = require("./model/insightSchema");
const moment = require("moment");

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
    
    const jobCounts = await User.collection
      .aggregate([
        {
          $group: {
            _id: "$jobTitle",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();
    
    const ageCounts = await User.collection
      .aggregate([
        {
          $group: {
            _id: {
              $switch: {
                branches: [
                  {
                    case: {
                      $lt: ["$dob", moment().subtract(20, "years").toDate()],
                    },
                    then: "<20",
                  },
                  {
                    case: {
                      $and: [
                        {
                          $gte: [
                            "$dob",
                            moment().subtract(30, "years").toDate(),
                          ],
                        },
                        {
                          $lt: [
                            "$dob",
                            moment().subtract(20, "years").toDate(),
                          ],
                        },
                      ],
                    },
                    then: "20-30",
                  },
                  {
                    case: {
                      $and: [
                        {
                          $gte: [
                            "$dob",
                            moment().subtract(40, "years").toDate(),
                          ],
                        },
                        {
                          $lt: [
                            "$dob",
                            moment().subtract(30, "years").toDate(),
                          ],
                        },
                      ],
                    },
                    then: "30-40",
                  },
                  {
                    case: {
                      $and: [
                        {
                          $gte: [
                            "$dob",
                            moment().subtract(50, "years").toDate(),
                          ],
                        },
                        {
                          $lt: [
                            "$dob",
                            moment().subtract(40, "years").toDate(),
                          ],
                        },
                      ],
                    },
                    then: "40-50",
                  },
                  {
                    case: {
                      $and: [
                        {
                          $gte: [
                            "$dob",
                            moment().subtract(60, "years").toDate(),
                          ],
                        },
                        {
                          $lt: [
                            "$dob",
                            moment().subtract(50, "years").toDate(),
                          ],
                        },
                      ],
                    },
                    then: "50-60",
                  },
                  {
                    case: {
                      $gte: ["$dob", moment().subtract(60, "years").toDate()],
                    },
                    then: ">60",
                  },
                ],
                default: null,
              },
            },
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
      ageCounts,
      jobCounts
    };

    // Update the existing Insight object or create a new one
    await Insight.findOneAndUpdate({}, updatedInsights, { upsert: true });

    console.log("Insights updated successfully.");
  } catch (error) {
    console.error("Error updating insights:", error);
  }
}

module.exports = { updateInsights };
