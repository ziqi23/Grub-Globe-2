const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateFavoriteInput = [
  check('recipeId')
    .exists({ checkFalsy: true })
    .withMessage('Recipe ID is required'),
  check('userId')
    .exists({ checkFalsy: true })
    .withMessage('User ID is required'),
  handleValidationErrors
];

module.exports = validateFavoriteInput;
