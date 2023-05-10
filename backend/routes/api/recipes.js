const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');


// get all recipes depending on filters
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find(req.query)
        // console.log(recipes)
        return res.json(recipes)
    } catch (err) {
        return res.json([]);
    }
});

module.exports = router;