const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');


// get random collection of recipes
router.get('/randomRecipes', async (req, res) => {
    try {
        const randomRecipes = await Recipe.aggregate([{ $sample: {size: 10 }}])
        return res.json(randomRecipes)
    } catch (err) {
        return res.json([]);
    }
})

// get recipe based on recipe id
router.get('/:id', async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        return res.json(recipe);
    } catch (err) {
        const error = new Error('recipe not found');
        error.statusCode = 404;
        error.errors = { message: "No recipe was found by that id"};
        return next(error);
    };
});


// get all recipes depending on filters
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find(req.query);
        return res.json(recipes);
    } catch (err) {
        return res.json([]);
    };
});
module.exports = router;