// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const User = mongoose.model('User');
// // const Achievement = mongoose.model('Achievement');

// // complete recipe based on recipeId and userId and update user's completedRecipe array (add the completedRecipe object)
// const completeRecipe = async (req, res) => {
//   try {
//     const { userId, recipeId, date } = req.body;

//     // push the completed recipe object into completedRecipe array
//     await User.findByIdAndUpdate(userId, {
//       $push: { completedRecipe: { recipeId: recipeId, dateCompleted: date }}
//     });

//     // get user's completed recipes count
//     const user = await User.findById(userId);
//     const completedRecipeCount = user.completedRecipe.length;

//     // find achieved achievements based on count
//     const newAchievements = await Achievement.find({
//       $gte: { criteria: completedRecipeCount }
//     })

//     // update achievement array based with new achievements



//   } catch (err) {

//   }
// }
