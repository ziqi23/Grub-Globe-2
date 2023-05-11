const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Recipe = mongoose.model("Recipe");
const Favorite = mongoose.model("Favorite");
const { requireUser } = require("../../config/passport");
const validateFavoriteInput = require("../../validations/favorite");

router.get("/", requireUser, async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.user._id);
  } catch (err) {
    const error = new Error("User not found");
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    const favorites = await Favorite.find({ user: user }).sort({
      createdAt: -1,
    });
    return res.json(favorites);
  } catch (err) {
    return res.json([]);
  }
});

router.post("/", requireUser, validateFavoriteInput, async (req, res, next) => {
  try {
    const newFav = new Favorite({
      recipe: req.body.recipe,
      user: req.body.user,
    });
    let fav = await newFav.save();
    return res.json(fav);
  } catch (err) {
    const error = new Error("fav not saved");
    error.statusCode = 404;
    error.errors = { message: "fav not saved" };
    next(err);
  }
});

router.delete("/:favoriteId", async (req, res, next) => {
  try {
    await Favorite.deleteOne({ _id: req.params.favoriteId });
  } catch (err) {
    const error = new Error("delete error");
    error.statusCode = 404;
    error.errors = { message: "delete error" };
    return next(error);
  }
});

module.exports = router;
