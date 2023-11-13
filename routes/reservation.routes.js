const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middelwares/route-guard");

router.get(
  "/reservation",
  /*isLoggedIn,*/ async (req, res, next) => {
    let currentUser = req.session.currentUser;
    res.render("dishes/reservation", { currentUser });
  }
);

module.exports = router;
