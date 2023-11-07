const express = require("express");
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

router.get("/order", (req, res, next) => {
  res.render("order");
});

router.get("/reservation", (req, res, next) => {
  res.render("reservation");
});
module.exports = router;
