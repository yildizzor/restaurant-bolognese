const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  name: {
    type: String,

    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    maxLength: 300,
    required: true,
  },

  likes: {
    type: Number,
    default: 0,
  },

  dislikes: {
    type: Number,
    default: 0,
  },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
