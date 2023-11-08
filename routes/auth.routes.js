const bcryptjs = require("bcryptjs");
const router = require("express").Router();
const saltRounds = 10;
const User = require("../models/User.model");
const mongoose = require("mongoose");

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
        res.render("auth/profile", { name: foundUser.name });
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

router.get("/signup", (req, res) => res.render("auth/signup"));

router.post("/signup", async (req, res, next) => {

  
  try {
    let response = await User.findOne({ username: req.body.username });
    if (!response) {
      const salt = bcryptjs.genSaltSync(saltRounds);
      const hashedPassword = bcryptjs.hashSync(req.body.password, salt);
      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
      });
      res.redirect("/profile");
    } else {
      res.render("auth/signup", { errorMessage: "Username already taken" });
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res
        .status(400)
        .render("auth/signup", { errorMessage: error.errors.password.message });
    } else if (error.code === 11000) {
      res.status(500).render("auth/signup", {
        errorMessage: "Username or email is already used.",
      });
    } else {
      next(error);
    }
  }
});

router.post("/logout", async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) next(error);

    res.redirect("/");
  });
});

router.get("/profile", isLoggedIn, (req, res) => {
  const user = req.session.currentUser;
  res.render("auth/profile", { name: user.name });
});

module.exports = router;
