const express = require("express");
const router = express.Router();

router.get("/drinks", (req, res, next) => {
  const drinks = Dish.find()

    .then((dishes) => {
      res.render("drinks", { drinks });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
