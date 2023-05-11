const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");
// const { Favorite } = require("../models/Favorite");

const validateFavoriteInput = [
  check("recipe")
    .exists({ checkFalsy: true })
    .withMessage("Recipe is required"),
  // console.log("recipe", recipe, "user", user)
  check("user").exists({ checkFalsy: true }).withMessage("User is required"),

  // check("recipe").custom(async (recipe, { req }) => {
  //   const user = req.body.user;
  // console.log("recipe", recipe, "user", user)
  //   const favorite = await Favorite.findOne({
  //     recipe: recipe._id,
  //     user: user._id,
  //   });
  //   if (favorite) {
  //     throw new Error("You have already favorited this recipe.");
  //   }
  // }),
  // // add a custom validator to check for duplicates
  // check("userId")
  //   .custom(async (value, { req }) => {
  //     // get the recipeId from the request body
  //     const recipeId = req.body.recipeId;
  //     // find a favorite with the same userId and recipeId
  //     const favorite = await Favorite.findOne({ userId: value, recipeId });
  //     // if a favorite exists, return false to indicate invalid value
  //     if (favorite) {
  //       return false;
  //     }
  //     // otherwise, return true to indicate valid value
  //     return true;
  //   })
  //   .withMessage("You have already favorited this recipe"), // add a custom error message

  handleValidationErrors,
];

module.exports = validateFavoriteInput;
