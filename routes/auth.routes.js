const bcryptjs = require("bcryptjs");
const router = require("express").Router();
const saltRounds = 10;
const User = require("../models/User.model");
const Reservation = require("../models/Reservation.model");
const ReservationController = require("../controller/reservation.controller");
const Order = require("../models/Order.model");
const OrderController = require("../controller/order.controller");
const mongoose = require("mongoose");

const uploader = require("../middelwares/cloudinary.config");

const { isLoggedIn, isLoggedOut } = require("../middelwares/route-guard");

router.get("/login", isLoggedOut, (req, res) => res.render("auth/login"));

router.post("/login", async (req, res, next) => {
  try {
    console.log(req.body);
    if (req.body.email && req.body.password) {
      const foundUser = await User.findOne({ email: req.body.email });

      if (!foundUser) {
        res.render("auth/signup", { errorMessage: "User not found" });
      } else if (bcryptjs.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;

        res.locals.isLoggedIn = foundUser !== undefined;
        res.locals.isLoggedOut = foundUser === undefined;

        res.redirect("/profile");
      } else {
        res.render("auth/login", { errorMessage: "Incorrect password." });
      }
    } else {
      res.render("auth/login", {
        errorMessage: "Incorrect email or password.",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/signup", isLoggedOut, (req, res) => res.render("auth/signup"));

router.post("/signup", uploader.single("imageUrl"), async (req, res, next) => {
  const errors = {};
  const data = req.body;

  try {
    let response = await User.findOne({ email: req.body.email });
    if (!response) {
      const salt = bcryptjs.genSaltSync(saltRounds);
      const hashedPassword = bcryptjs.hashSync(req.body.password, salt);

      let profilePhoto;
      if (req.file) {
        profilePhoto = req.file.path;
      }
      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
        imageUrl: profilePhoto,
      });
      res.redirect("/login");
    } else {
      errors.email = "Email is already taken";
      res.render("auth/signup", { errors, data });
    }
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      res.status(400).render("auth/signup", { data, errors });
    } else if (err.code === 11000) {
      errors.email = "Email is already used. ";
      res.status(500).render("auth/signup", { data, errors });
    } else {
      next(err);
    }
  }
});

router.get("/logout", async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) next(error);

    res.redirect("/");
  });
});

router.get("/profile", isLoggedIn, async (req, res, next) => {
  try {
    const currentUser = req.session.currentUser;
    const reservationController = new ReservationController(currentUser._id);
    const reservations = await reservationController.getAllReservations();
    const orderController = new OrderController(currentUser._id);
    const orders = await orderController.getAllOrders();

    console.log(reservations);
    res.render("auth/profile", {
      currentUser: currentUser,
      reservations: reservations,
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
