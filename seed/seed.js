const Dish = require("../models/Dish.model");

require("../db/index");

const dishes =[ {

    title: "Bean",//example

    ingredients: ["Bean", "tomatoes", "salt"], //example

    cuisine: "Turkish",
    dishType: "main_course",


    { enum: [   // You should one of this dish type. 
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
    image:"/images/dishes/bean.jpg" // This is valid for dishes
    image:"/images/drinks/rode-wine.jpg" // This is valid for drinks

    
}]

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/restaurant-bolognese";


const saveDishes= async () => {
  try {
    const Dish = await Dish.create(dishes);
  } catch (error) {
    console.error(error);
  } finally {
    MONGO_URI.disconnect;
    // mongoose.connection.close(); //This is other way to close connection.
    console.log("Connection is closed.");
  }
};

saveDishes();
