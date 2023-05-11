const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Recipe = mongoose.model("Recipe");
const Favorite = mongoose.model("Favorite");
const { requireUser } = require("../../config/passport");
const validateFavoriteInput = require("../../validations/favorite");

// router.get("/", async (req, res) => {
//   try {
//     const favorites = await Favorite.find()
//       .populate("author", "_id username")
//       .sort({ createdAt: -1 });
//     return res.json(favorites);
//   } catch (err) {
//     return res.json([]);
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const favorites = await Favorite.find({ userId: req.user._id })
//       .populate("author", "_id username")
//       .sort({ createdAt: -1 });
//     return res.json(favorites);
//   } catch (err) {
//     return res.json([]);
//   }
// });

// router.get("/", requireUser, async (req, res) => {
//   try {
//     const favorites = await Favorite.find({ user: req.user})
//     // const favorites = await Favorite.find()

//       .populate("recipe", "_id")
//       .sort({ createdAt: -1 });
//     // console.log(favorites, "favorites");
//     return res.json(favorites);
//   } catch (err) {
//     // console.error(err);
//     // return res.status(500).json({ error: "Server error" });
//     return res.json([]);
//   }
// });

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
    const favorites = await Favorite.find({ user: user._id }).sort({
      createdAt: -1,
    });
    //   .populate("author", "_id username");
    return res.json(favorites);
  } catch (err) {
    return res.json([]);
  }
});

// router.get("/user/:userId", async (req, res, next) => {
//   let user;
//   try {
//     user = await User.findById(req.params.userId);
//   } catch (err) {
//     const error = new Error("User not found");
//     error.statusCode = 404;
//     error.errors = { message: "No user found with that id" };
//     return next(error);
//   }
//   try {
//     const tweets = await Tweet.find({ author: user._id })
//       .sort({ createdAt: -1 })
//       .populate("author", "_id username");
//     return res.json(tweets);
//   } catch (err) {
//     return res.json([]);
//   }
// });

// router.get("/:id", async (req, res, next) => {
//   try {
//     const favorite = await Favorite.findById(req.params.id).populate(
//       "recipeId"
//     );
//     return res.json(favorite);
//   } catch (err) {
//     const error = new Error("Favorite not found");
//     error.statusCode = 404;
//     error.errors = { message: "No favorite found with that id" };
//     return next(error);
//   }
// });

router.post("/", requireUser, validateFavoriteInput, async (req, res, next) => {
  try {
    const newFavorite = new Favorite({
      recipe: req.body.recipe,
      user: req.user._id,
    });

    let favorite = await newFavorite.save();
    favorite = await favorite.populate("user", "recipe");
    return res.json(favorite);
  } catch (err) {
    next(err);
  }
});

router.delete("/:favoriteId", async (req, res, next) => {
  try {
    favorite = await Favorite.findById(req.body._id);
  } catch (err) {
    const error = new Error("User not found");
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
});

module.exports = router;
