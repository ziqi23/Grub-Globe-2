const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const Recipe = require('../models/Recipe');

const apiKey = '602ba7298ff846909d817cce1b2d2b63';
const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
const NUM_SEED_RECIPES = 150;

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

const insertSeeds = () => {
  console.log("Resetting db and seeding users...");

  User.collection.drop()
                 .then(() => User.insertMany(users))
                 .then(() => {
                   console.log("Done!");
                   mongoose.disconnect();
                 })
                 .catch(err => {
                   console.error(err.stack);
                   process.exit(1);
                 });
}


const recipes = [];

const searchTerms = ['hamburger', 'fried chicken', 'apple pie', 'clam chowder', 'caesar salad', 'tacos', 'gaucamole', 'tamales', 'enchiladas', 'margarita', 'osso buco', 'lasagna', 'tiramisu', 'caprese salad', 'risotto', 'paella','gazpacho', 'churros', 'croquetas', 'sangria', 'baguette', 'beef bourguignon', 'coq a vin', 'creme brulee', 'french onion soup', 'shepherd pie','full english breakfast','trifle','yorkshire pudding','bangers and mash', 'bratwurst','sauerkraut','black forest cake','pretzel','beer','sushi','ramen','tempura','miso soup','matcha','fried rice','hot and sour soup','dim sum','kung pao chicken','chow mein', 'butter chicken','biryani','samosas','tandoori chicken','rogan josh','papaya salad','green curry','mango sticky rice','pad see ew','massaman curry','pho','banh mi','spring rolls','com tam', 'ca kho to','Feijoada','Brigadeiro','pastel','tapioca'];

const country = ['United States', 'Mexico', 'Italy', 'Spain', 'France', 'United Kingdom', 'Germany', 'Japan', 'China', 'India', 'Thailand', 'Vietnam', 'Brazil'];

let youtubeLinks = ['https://www.youtube.com/watch?v=foD42-73wdI','https://www.youtube.com/watch?v=IJou15msogM','https://www.youtube.com/watch?v=aGj_EhmfAHM','https://www.youtube.com/watch?v=3feoGIs4ULc','https://www.youtube.com/watch?v=hOTihLk4pfg'];

async function fetchRecipes(searchTerm, country) {
  const response = await fetch(`${apiUrl}?apiKey=${apiKey}&query={searchTerms}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true`);
  const data = await response.json();

  if (data.results.length > 0) {
    const recipeData = data.results[0];
    const recipeId = recipeData.id;

    const ingredientsResponse = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=${apiKey}`);
    const ingredientsData = await ingredientsResponse.json();

    const ingredients = ingredientsData.ingredients.map((ingredient => {
      const amount = ingredient.amount.metric;
      return `${ingredient.name}: ${amount.value} ${amount.unit}`;
    }));

    const recipe = new Recipe({
      country: recipeData.country,
      recipeName: recipeData.title,
      recipeImage: recipeData.image,
      recipeAuthor: recipeData.sourceName,
      ingredients: ingredients,
      nutrition: {
        nutrients: nutrients,
      },
      recipeDescription: recipeData.summary,
      cookTime: recipeData.readyInMinutes,
      country: country,
      cuisineDescription:{},
      servings: recipeData.servings,
      recipeInstructions: {
        steps: recipeInstructions,
      },
      tags:[],
      youtubeLinks: []
    })

    await recipe.save();
  }
}

// for (let i = 0; i < searchTerms.length && recipes.length < NUM_SEED_RECIPES; i ++) {

//   const searchTerm = searchTerms[i];

//   const response = await fetch(`${apiUrl}?apiKey=${apiKey}&query={searchTerms}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true`);
//   const data = await response.json();

// }

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
