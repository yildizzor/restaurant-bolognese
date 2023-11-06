const express = require("express");
const router = express.Router();

router.get("/dishes", (req, res, next) => {
  const dishes = Dish.find()

    .then((dishes) => {
      res.render("dishes", { dishes });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
