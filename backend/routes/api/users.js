const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const {
  loginUser,
  restoreUser,
  requireUser,
} = require("../../config/passport");
const { isProduction } = require("../../config/keys");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const validateCompleteRecipeInput = require("../../validations/completeRecipe");
const { singleFileUpload } = require('../../awsS3')
const multer = require("multer");
const upload = multer();
const Recipe = mongoose.model("Recipe");

// Upload profile picture route
router.post(
  "/upload",
  restoreUser,
  upload.single("image"),
  async (req, res) => {
    if (req.file === undefined) {
      return res.send("you must select a file.");
    }
    const profileImageUrl = await singleFileUpload({ file: req.file, public: true });
    await User.findOneAndUpdate(
      { username: req.user.username },
      { profileImageUrl }
    );
    const updatedUser = await User.findOne({ username: req.user.username });
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      photo: updatedUser.profileImageUrl,
      completedRecipe: updatedUser.completedRecipe,
    });
  }
);

router.get("/current", restoreUser, function (req, res, next) {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    photo: req.user.profileImageUrl,
    completedRecipe: req.user.completedRecipe,
  });
});

router.post("/login", validateLoginInput, async function (req, res, next) {
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

router.post(
  "/register",
  validateRegisterInput,
  async function (req, res, next) {
    const email = req.body.email.toLowerCase();
    const username = req.body.username.toLowerCase();
    const user = await User.findOne({
      $or: [
        { email: { $regex: new RegExp(`^${email}$`, "i") } },
        { username: { $regex: new RegExp(`^${username}$`, "i") } },
      ],
    });

    if (user) {
      const err = new Error("Validation Error");
      err.statusCode = 400;
      const errors = {};
      if (user.email.toLowerCase() === email) {
        errors.email = "A user has already registered with this email";
      }
      if (user.username.toLowerCase() === username) {
        errors.username = "A user has already registered with this username";
      }
      err.errors = errors;
      return next(err);
    }

    const newUser = new User({
      username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email,
      completedRecipe: [],
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
        if (err) throw err;
        try {
          newUser.hashedPassword = hashedPassword;
          const user = await newUser.save();
          return res.json(await loginUser(user));
        } catch (err) {
          next(err);
        }
      });
    });
  }
);

router.patch(
  "/complete-recipe",
  validateCompleteRecipeInput,
  async function (req, res, next) {
    try {
      const { userId, recipeId } = req.body;

      let user = await User.findById(userId);
      const completedRecipeIds = user.completedRecipe.map((recipe) =>
        recipe.recipeId.toString()
      );

      if (!completedRecipeIds.includes(recipeId)) {
        user = await User.findByIdAndUpdate(
          userId,
          { $push: { completedRecipe: { recipeId: recipeId } } },
          { new: true }
        );
      }
    } catch (err) {
      const error = new Error(`Completion unsuccessful: ${err.message}`);
      error.statusCode = 500;
      error.errors = { message: "recipe completion unsuccessful" };
      return next(error);
    }
  }
);

module.exports = router;
