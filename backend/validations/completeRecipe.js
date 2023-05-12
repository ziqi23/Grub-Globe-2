const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateCompleteRecipeInput = [
  check('userId')
    .exists({ checkFalsy: true }),
  check('recipeId')
    .exists({ checkFalsy: true }),
  handleValidationErrors
];

module.exports = validateCompleteRecipeInput;
