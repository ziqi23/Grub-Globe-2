const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const Recipe = require('../models/Recipe');
const recipeData = require('./recipeData/recipeData.json');

const NUM_SEED_USERS = 10;

const users = [];

users.push(
  new User ({
    username: 'demo-user',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('starwars', 10)
  })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User ({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
    })
  )
}

const insertSeeds = async () => {
  try {
    console.log("Resetting db and seeding users...");

    await User.collection.drop();
    await Recipe.collection.drop();
    await User.insertMany(users);

    await Recipe.insertMany(allRecipes);

    console.log("Done!");
    mongoose.disconnect();
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }
};


const allRecipes = recipeData.map((recipe, idx) => {
  const tagWords = ["vegetarian", "vegan", "glutenFree", "dairyFree", "sustainable"]

  const createTags = idx => {
    const tagArray = [];
    tagWords.forEach((tag) => {
      if (recipe[tag] === true) {
        tagArray.push(tag);
      }
    })
    // console.log(tagArray);
    return tagArray;
  }

  const newRecipe = new Recipe({
    country: recipe.country,
    recipeName: recipe.title,
    recipeAuthor: recipe.sourceName,
    ingredients: recipe.extendedIngredients.map((ingredient) => ({
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit
    })),
    nutrition: {
      nutrients: recipe.nutrition.nutrients.map((nutrient) => ({
        name: nutrient.name,
        amount: nutrient.amount,
        unit: nutrient.unit,
        percentOfDailyNeeds: nutrient.percentOfDailyNeeds
      }))
    },
    prepTime: recipe.readyInMinutes,
    servings: recipe.servings,
    recipeInstructions: recipe.analyzedInstructions[0].steps.map((step) => ({
      number: step.number,
      step: step.step
    })),
    tags: createTags(),
    youtubeLinks: recipe.youtubeLinks,
    photoUrl: recipe.photoUrl
  })

  return newRecipe;
})

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
