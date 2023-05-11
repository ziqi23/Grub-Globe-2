const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');

router.get('/', async (req, res) => {
  const query = req.query.q;
  const queryArray = query.split(" , ");
  console.log(queryArray, 'queryArray');
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
        
        console.log(recipes);
        return res.json(recipes);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
  }
});

module.exports = router;
