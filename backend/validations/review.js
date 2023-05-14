const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateReviewInput = [
  check("title")
    .isLength({ min: 5, max: 100 })
    .withMessage("Review title must be between 5 and 100 characters"),
  check("text")
    .isLength({ min: 10, max: 500 })
    .withMessage("Review must be between 10 and 500 characters"),
  check("wouldMakeAgain")
    .isBoolean()
    .withMessage("Review must specify if you'd make this again"),
  check("wouldRecommend")
    .isBoolean()
    .withMessage("Review must specify if you'd recommend this"),
  check("starRating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Star rating must be an integer between 1 and 5"),
  handleValidationErrors,
];

module.exports = validateReviewInput;
