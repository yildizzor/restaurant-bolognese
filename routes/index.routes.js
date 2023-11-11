const express = require("express");
const { isLoggedIn } = require("../middelwares/route-guard");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/about", (req, res, next) => {
  res.render("about");
});
router.get("/contact", (req, res, next) => {
  res.render("contact");
});

router.get("/order", isLoggedIn, (req, res, next) => {
  res.render("order");
});

router.get("/reservation", isLoggedIn, (req, res, next) => {
  res.render("reservation");
});

// router.get("/menu", (req, res, next) => {
//   res.render("menu", { dishes});
// });
module.exports = router;
