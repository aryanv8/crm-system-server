const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema({
  maleCount: {
    type: Number,
    required: true,
    default: 0,
  },
  femaleCount: {
    type: Number,
    required: true,
    default: 0,
  },
  otherCount: {
    type: Number,
    required: true,
    default: 0,
  },
  countryCounts: [
    {
      _id: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
    },
  ],
  companyCounts: [
    {
      _id: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Insight = mongoose.model("Insight", insightSchema);

module.exports = Insight;
