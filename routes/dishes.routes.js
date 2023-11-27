const express = require("express");
const Dish = require("../models/Dish.model");
const { isAdminLoggedIn } = require("../middelwares/route-guard");
const uploader = require("../middelwares/cloudinary.config");
const { default: mongoose } = require("mongoose");
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

router.get("/menu/product", isAdminLoggedIn, (req, res, next) => {
  res.render("dishes/addProduct");
});

router.post(
  "/menu/product",
  isAdminLoggedIn,
  uploader.single("imageUrl"),
  async (req, res, next) => {
    const errors = {};
    const data = req.body;

    try {
      let response = await Dish.findOne({ title: req.body.title });
      if (!response) {
        let productPhoto;
        if (req.file) {
          productPhoto = req.file.path;
        }
        const newDish = await Dish.create({
          ...req.body,
          ingredients: req.body.ingredients
            .split(",")
            .map((item) => item.trim()),
          image: productPhoto,
        });

        res.redirect("/menu");
      } else {
        errors.title = "Product already exists in database";
        res.render("dishes/addProduct", { errors, data });
      }
    } catch (err) {
      console.log(err);
      if (err instanceof mongoose.Error.ValidationError) {
        Object.keys(err.errors).forEach((key) => {
          errors[key] = err.errors[key].message;
        });
        res.status(400).render("dishes/addProduct", { errors, data });
      } else if (err.code === 11000) {
        errors.title = "Product with the same title already exits in database.";
        res.status(500).render("dishes/addProduct", { errors, data });
      } else {
        next(err);
      }
    }
  }
);

module.exports = router;
