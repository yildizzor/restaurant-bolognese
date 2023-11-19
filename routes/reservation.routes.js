const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middelwares/route-guard");
const Reservation = require("../models/Reservation.model");
const ReservationController = require("../controller/reservation.controller");

router.get(
  "/reservation",
  isLoggedIn, async (req, res, next) => {
    let currentUser = req.session.currentUser;
    res.render("dishes/reservation", { currentUser });
  }
);

router.post(
  "/reservation",
  isLoggedIn, async (req, res, next) => {
    try {
      const currentUser = req.session.currentUser;

      if (!currentUser) {
        throw new CustomError("You need to login to make an reservation");
      }
      const reservationController = new ReservationController(currentUser._id);
      const reservation = await reservationController.create(req.body);

      let message = reservation
        ? "Your reservation is confirmed. Thank You!"
        : "Your reservation isn't succesfull. please contact the restaurant!";
      res.render("dishes/reservation", { currentUser, message });
    } catch (error) {
      next(error);
    }
  }
);
router.post("/reservation/delete/:id", async (req, res, next) => {
  try {
    const { id: reservationId } = req.params;
    const currentUser = req.session.currentUser;
    const reservationController = new ReservationController(currentUser._id);
    await reservationController.delete(reservationId);
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
