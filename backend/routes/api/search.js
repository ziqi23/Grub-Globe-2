const express = require('express');
const router = express.Router();
const Recipe = require('../../models/Recipe');

router.get('/search', async (req, res) => {
  const query = req.query.q;

  try {
    const recipes = await Recipe.find({
      $or: [
        { recipeName: { $regex: query, $options: "i" } },
        { recipeCountry: { $regex: query, $options: "i" } },
        { "tags.name": { $regex: query, $options: "i" } },
      ]
    }).sort({ createdAt: -1 });

    return res.json(recipes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
