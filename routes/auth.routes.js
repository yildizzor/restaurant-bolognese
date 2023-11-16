const bcryptjs = require("bcryptjs");
const router = require("express").Router();
const saltRounds = 10;
const User = require("../models/User.model");
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

        res.render("auth/profile", { currentUser: foundUser });
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
  try {
    let response = await User.findOne({ email: req.body.email });
    if (!response) {
      const salt = bcryptjs.genSaltSync(saltRounds);
      const hashedPassword = bcryptjs.hashSync(req.body.password, salt);

      let profilePhoto;
      if (req.file) {
        profilePhoto = req.file.path;
        console.log(profilePhoto);
      }
      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
        imageUrl: profilePhoto,
      });
      res.redirect("/profile");
    } else {
      res.render("auth/signup", { errorMessage: "Username already taken" });
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res
        .status(400)
        .render("auth/signup", { errorMessage: error.errors.message });
    } else if (error.code === 11000) {
      console.log(error);
      res.status(500).render("auth/signup", {
        errorMessage: "Email is already used.",
      });
    } else {
      next(error);
    }
  }
});

router.get("/logout", async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) next(error);

    res.redirect("/");
  });
});

router.get("/profile", isLoggedIn, (req, res) => {
  const currentUser = req.session.currentUser;

  res.render("auth/profile", { currentUser });
});

module.exports = router;
