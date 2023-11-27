const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema(
  {
    // TODO: write the schema
    title: { type: String, required: true, unique: true },

    ingredients: { type: [String], default: ["Not Available"], required: true },
    cuisine: { type: String, required: true },
    dishType: {
      type: String,
      enum: [
        "main_course",
        "pasta",
        "pizza",
        "soup",
        "snack",
        "salad",
        "drink",
        "dessert",
        "other",
      ],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },
  },

  {
    timestamps: true,
  }
);

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
