const express = require("express");
const Dish = require("../models/Dish.model");
const router = express.Router();

router.get("/menu", (req, res, next) => {
  const dishes = Dish.find()

    .then((allDishes) => {

      const dishes = allDishes.reduce((group, dish) => {
        group[dish.dishType] = group[dish.dishType] ?? [];
        group[dish.dishType].push(dish);
        return group;
      }, {});
      res.render("dishes/menu", { dishes });
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/dish/:id", (req, res, next) => {
  const { id } = req.params;
  const oneDish = Dish.findById(id)

    .then((oneDish) => {
      res.render("dishes/dish", { oneDish });
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/menu/drinks", (req, res, next) => {
  const dishesAndDrinks = Dish.find()
    .then((dishesAndDrinks) => {
      const drinks = dishesAndDrinks.filter((onlyDrink) => {
        return onlyDrink.dishType === "drink";
      });

      console.log(drinks);
      res.render("dishes/drinks", { drinks });
    })
    .catch((error) => {
      next(error);
    });
});
router.get("/menu/dishes", (req, res, next) => {
  const dishes = Dish.find()

    .then((dishes) => {
      const groupByDishType = dishes.reduce((group, dish) => {
        group[dish.dishType] = group[dish.dishType] ?? [];
        group[dish.dishType].push(dish);
        return group;
      }, {});

      delete groupByDishType.drink;

      console.log(groupByDishType);

      res.render("dishes/dishes", { groupByDishType });
    })
    .catch((error) => {
      next(error);
    });
});
module.exports = router;
