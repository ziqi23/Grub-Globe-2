const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Recipe = mongoose.model("Recipe");
const Review = mongoose.model("Review");
const { requireUser } = require("../../config/passport");
const validateReviewInput = require("../../validations/review");

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "_id firstName lastName username profilePhoto ")
      .sort({ createdAt: -1 });
    return res.json(reviews);
  } catch (err) {
    return res.json([]);
  }
});

router.get("/user/:userId", async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch (err) {
    const error = new Error("User not found");
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    const reviews = await Review.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate("user", "_id firstName lastName username profilePhoto")
      .populate({
        path: 'recipe',
        select: 'recipeName country photoUrl'
      });
    return res.json(reviews);
  } catch (err) {
    return res.json([]);
  }
});

router.get("/recipe/:recipeId", async (req, res, next) => {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.recipeId);
  } catch (err) {
    const error = new Error("Recipe not found");
    error.statusCode = 404;
    error.errors = { message: "No recipe found with that id" };
    return next(error);
  }
  try {
    const reviews = await Review.find({ recipe: recipe._id })
      .sort({ createdAt: -1 })
      .populate("user", "_id firstName lastName username profilePhoto");
    return res.json(reviews);
  } catch (err) {
    return res.json([]);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).populate(
      "user",
      "_id firstName lastName username profilePhoto"
    );
    return res.json(review);
  } catch (err) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    error.errors = { message: "No review found with that id" };
    return next(error);
  }
});

router.post("/", requireUser, validateReviewInput, async (req, res, next) => {
  try {
    const newReview = new Review({
      user: req.user._id,
      recipe: req.body.recipe,
      title: req.body.title,
      text: req.body.text,
      wouldMakeAgain: req.body.wouldMakeAgain,
      wouldRecommend: req.body.wouldRecommend,
      starRating: req.body.starRating,
    });

    let review = await newReview.save();
    review = await review.populate(
      "user",
      "_id firstName lastName username profilePhoto"
    );
    return res.json(review);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:reviewId",
  requireUser,
  validateReviewInput,
  async (req, res, next) => {
    try {
      const updatedReview = {
        title: req.body.title,
        text: req.body.text,
        wouldMakeAgain: req.body.wouldMakeAgain,
        wouldRecommend: req.body.wouldRecommend,
        starRating: req.body.starRating,
      };

      let review = await Review.findOneAndUpdate(
        { _id: req.params.reviewId, user: req.user._id },
        updatedReview,
        { new: true }
      );

      if (!review) {
        const error = new Error("Review not found or not owned by user");
        error.statusCode = 404;
        throw error;
      }

      review = await review.populate(
        "user",
        "_id firstName lastName username profilePhoto"
      );

      return res.json(review);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:reviewId", async (req, res, next) => {
  try {
    await Review.deleteOne({ _id: req.params.reviewId });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    const error = new Error("delete error");
    error.statusCode = 404;
    error.errors = { message: "delete error" };
    return next(error);
  }
});

module.exports = router;
