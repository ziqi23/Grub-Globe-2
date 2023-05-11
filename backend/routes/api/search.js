const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');

router.get('/', async (req, res) => {
  const query = req.query.q;
    console.log(query, "query")
  try {
    const recipes = await Recipe.find({
      $or: [
        { recipeName: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
        { tags: { $elemMatch: { $regex: query, $options: "i" } } },
        
      ]
    }).sort({ createdAt: -1 });
    console.log(recipes);
    return res.json(recipes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
