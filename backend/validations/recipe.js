const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateRecipeInput = [
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('recipeName')
    .exists({ checkFalsy: true })
    .withMessage('Recipe name is required'),
  check('recipeAuthor')
    .exists({ checkFalsy: true })
    .withMessage('Recipe author is required'),
  check('ingredients')
    .exists({ checkFalsy: true })
    .withMessage('Ingredients are required'),
  check('nutrition')
    .exists({ checkFalsy: true })
    .withMessage('Nutrition information is required'),
  check('recipeInstructions')
        .exists({ checkFalsy: true })
        .withMessage('Recipe instructions are required'),
  handleValidationErrors
];

module.exports = validateRecipeInput;
