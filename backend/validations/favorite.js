const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateFavoriteInput = [
  check("recipe")
    .exists({ checkFalsy: true })
    .withMessage("Recipe is required"),
  handleValidationErrors,
];

module.exports = validateFavoriteInput;
