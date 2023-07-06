const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  productid: {
    type: String,
    required: true,
  },
  productname: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  experience: {
    // rating from 1 to 5
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  durability: {
    // rating from 1 to 5
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  value_for_money: {
    // rating from 1 to 5
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  efficiency: {
    // rating from 1 to 5
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  ease_of_use: {
    // rating from 1 to 5
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  overall_rating: {
    // rating from 1 to 5
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  suggestions_or_compaints: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = { Feedback };