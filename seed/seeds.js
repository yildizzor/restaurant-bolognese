const Dish = require("../models/Dish.model");

require("../db/index");
const mongoose = require("mongoose");

const dishes = require("./data");

console.log(dishes);
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/restaurant-bolognese";

const saveDishes = async () => {
  try {
    const dish = await Dish.create(dishes);
  } catch (error) {
    console.error(error);
  } finally {
    //MONGO_URI.disconnect;
    mongoose.connection.close(); //This is other way to close connection.
    console.log("Connection is closed.");
  }
};

saveDishes();
