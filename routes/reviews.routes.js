const express = require("express");
const router = express.Router();
const Review = require("../models/Review.model");

router.get("/reviews", async (req, res, next) => {
  try {
    const reviews = await Review.find();
    const dateFormat = { day: "numeric", month: "long", year: "numeric" };

    reviews.forEach((review) => {
      review.formattedDate = new Intl.DateTimeFormat(
        "en-US",
        dateFormat
      ).format(review.date);
    });

    res.render("reviews", { reviews });
  } catch (error) {
    next(error);
  }
});

router.get("/review/add", (req, res, next) => {
  res.render("addReview");
});

router.post("/review/add", async (req, res, next) => {
  try {
    const data = req.body;

    await Review.create(data);
    res.redirect("/reviews");
  } catch (error) {
    next(error);
  }
});

router.get("/reviews/like/:id", async (req, res, next) => {
  try {
    const reviewId = req.params.id;

    const review = await Review.findById(reviewId);
    review.likes += 1;
    await review.save();
    res.redirect("/reviews");
  } catch (error) {
    next(error);
  }
});

router.get("/reviews/dislike/:id", async (req, res, next) => {
  try {
    const reviewId = req.params.id;

    const review = await Review.findById(reviewId);
    review.dislikes += 1;
    await review.save();
    res.redirect("/reviews");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
