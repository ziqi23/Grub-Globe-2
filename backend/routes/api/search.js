const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');

router.get('/', async (req, res) => {
    
  const query = req.query.q;
  const queryArray = query.split(" , ");

  if (queryArray.length === 1) {
      try {
        const recipes = await Recipe.find({
          $or: [
            { recipeName: { $regex: query, $options: "i" } },
            { country: { $regex: query, $options: "i" } },
            { tags: { $elemMatch: { $regex: query.replace(/[-\s]/g, ""), $options: "i" } } },
            { ingredients: { $elemMatch: { name: { $regex: query, $options: "i" } } } }
            
          ]
    
        }).sort({ createdAt: -1 });
        console.log(recipes.length);
        return res.json(recipes);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
  } else if (queryArray.length > 1 && queryArray.every(term => ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'sustainable'].includes(term))) {
    try {
        console.log('in tag search');
        const recipes = await Recipe.find({
          tags: {
            $all: queryArray.map(tag => new RegExp(tag.replace(/[-\s]/g, ""), "i"))
          }
        }).sort({ createdAt: -1 });
        
        console.log(recipes);
        return res.json(recipes);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
  } else if (queryArray.length > 1) {
    try {
        const recipes = await Recipe.find({
          $or: queryArray.map(term => ({
            $or: [
              { recipeName: { $regex: term, $options: "i" } },
              { country: { $regex: term, $options: "i" } },
              { tags: { $elemMatch: { $regex: term.replace(/[-\s]/g, ""), $options: "i" } } },
              { ingredients: { $elemMatch: { name: { $regex: query, $options: "i" } } } }
            ]
          }))
        }).sort({ createdAt: -1 });
        console.log(recipes.length)
        return res.json(recipes);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
  }
});

module.exports = router;
