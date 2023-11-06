const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema(
  {
    // TODO: write the schema
    title: { type: String, required: true, unique: true },

    ingredients: { type: [String] },
    cuisine: { type: String, required: true },
    dishType: {
      type: String,
      enum: [
        "main_course",
        "pasta",
        "pizza",
        "soup",
        "snack",
        "drink",
        "dessert",
        "other",
      ],
    },
    image: {
      type: String,
    },
    price: { type: number },
  },

  {
    timestamps: true,
  }
);

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Recipe;
