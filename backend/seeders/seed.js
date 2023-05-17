const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const Recipe = require('../models/Recipe');
const recipeData = require('./recipeData/recipeData.json');
const { ObjectId } = require('mongoose').Types;

const users = [];

users.push(
  new User ({
    _id: "164000000000000000000000",
    username: 'demo-user',
    firstName: 'Iam',
    lastName: 'Demo',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('starwars', 10)
  }),

  new User({
    _id: "010000000000000000000000",
    username: 'julia-child',
    firstName: 'Julia',
    lastName: 'Child',
    email: 'julia.child@gmail.com',
    hashedPassword: bcrypt.hashSync('masteringtheartoffrenchcooking', 10)
  }),

  new User({
    _id: "020000000000000000000000",
    username: 'anthony-bourdain',
    firstName: 'Anthony',
    lastName: 'Bourdain',
    email: 'anthony.bourdain@yahoo.com',
    hashedPassword: bcrypt.hashSync('kitchenconfidential', 10)
    }),

    new User({
    _id: "030000000000000000000000",
    username: 'guy-fieri',
    firstName: 'Guy',
    lastName: 'Fieri',
    email: 'guy.fieri@hotmail.com',
    hashedPassword: bcrypt.hashSync('flavortown', 10)
    }),

    new User({
    _id: "040000000000000000000000",
    username: 'bear-grylls',
    firstName: 'Bear',
    lastName: 'Grylls',
    email: 'bear.grylls@outlook.com',
    hashedPassword: bcrypt.hashSync('manvswild', 10)
    }),

    new User({
    _id: "050000000000000000000000",
    username: 'ina-garten',
    firstName: 'Ina',
    lastName: 'Garten',
    email: 'ina.garten@aol.com',
    hashedPassword: bcrypt.hashSync('barefootcontessa', 10)
    }),

    new User ({
    _id: "060000000000000000000000",
    username: 'gourmetguru',
    firstName: 'Gordon',
    lastName: 'Ramsay',
    email: 'gordon@hellskitchen.com',
    hashedPassword: bcrypt.hashSync('beefwellington', 10)
    }),

    new User ({
    _id: "070000000000000000000000",
    username: 'asianwokstar',
    firstName: 'Ming',
    lastName: 'Tsai',
    email: 'ming@ming.com',
    hashedPassword: bcrypt.hashSync('blueginger', 10)
    }),

    new User ({
    _id: "080000000000000000000000",
    username: 'theglobetrotter',
    firstName: 'Andrew',
    lastName: 'Zimmern',
    email: 'azimmern@travelchannel.com',
    hashedPassword: bcrypt.hashSync('bizarrefoods', 10)
    }),

    new User({
    _id: "090000000000000000000000",
    username: 'masterbaker',
    firstName: 'Mary',
    lastName: 'Berry',
    email: 'mary.berry@gmail.com',
    hashedPassword: bcrypt.hashSync('greatbritishbakeoff', 10)
    }),

    new User({
    _id: "100000000000000000000000",
    username: 'kitchengoddess',
    firstName: 'Nigella',
    lastName: 'Lawson',
    email: 'nigella.lawson@gmail.com',
    hashedPassword: bcrypt.hashSync('simplynigella', 10)
    }),

    new User ({
    _id: "110000000000000000000000",
    username: 'danielhumm',
    firstName: 'Daniel',
    lastName: 'Humm',
    email: 'daniel.humm@elevenmadisonpark.com',
    hashedPassword: bcrypt.hashSync('worldsbestrestaurant', 10)
    }),

    new User ({
    _id: "120000000000000000000000",
    username: 'alainducasse',
    firstName: 'Alain',
    lastName: 'Ducasse',
    email: 'alain.ducasse@frenchcuisine.com',
    hashedPassword: bcrypt.hashSync('cordonbleu', 10)
    }),

    new User ({
    _id: "130000000000000000000000",
    username: 'indianajones',
    firstName: 'Indiana',
    lastName: 'Jones',
    email: 'indy@gmail.com',
    hashedPassword: bcrypt.hashSync('adventure', 10)
    }),

    new User ({
    _id: "140000000000000000000000",
    username: 'laracroft',
    firstName: 'Lara',
    lastName: 'Croft',
    email: 'lara@gmail.com',
    hashedPassword: bcrypt.hashSync('tombraider', 10)
    }),

    new User ({
    _id: "150000000000000000000000",
    username: 'jacksparrow',
    firstName: 'Jack',
    lastName: 'Sparrow',
    email: 'jack@gmail.com',
    hashedPassword: bcrypt.hashSync('pirates', 10)
    }),

    new User ({
    _id: "160000000000000000000000",
    username: 'rambo',
    firstName: 'John',
    lastName: 'Rambo',
    email: 'rambo@gmail.com',
    hashedPassword: bcrypt.hashSync('survival', 10)
    }),

    new User ({
    _id: "170000000000000000000000",
    username: 'odysseus',
    firstName: 'Odysseus',
    lastName: 'The Great',
    email: 'odysseus@gmail.com',
    hashedPassword: bcrypt.hashSync('troy', 10)
    }),

    new User({
    _id: "180000000000000000000000",
    username: 'amundsen',
    firstName: 'Roald',
    lastName: 'Amundsen',
    email: 'roald.amundsen@gmail.com',
    hashedPassword: bcrypt.hashSync('southpole', 10)
    }),

    new User({
    _id: "190000000000000000000000",
    username: 'edmundhillary',
    firstName: 'Edmund',
    lastName: 'Hillary',
    email: 'edmund.hillary@gmail.com',
    hashedPassword: bcrypt.hashSync('everest', 10)
    }),

    new User({
    _id: "200000000000000000000000",
    username: 'ernestshackleton',
    firstName: 'Ernest',
    lastName: 'Shackleton',
    email: 'ernest.shackleton@gmail.com',
    hashedPassword: bcrypt.hashSync('endurance', 10)
    }),

    new User ({
    _id: "210000000000000000000000",
    username: 'captainnemo',
    firstName: 'Captain',
    lastName: 'Nemo',
    email: 'nemo@nautilus.com',
    hashedPassword: bcrypt.hashSync('underwater', 10)
    }),

    new User ({
    _id: "220000000000000000000000",
    username: 'cooper',
    firstName: 'Joseph',
    lastName: 'Cooper',
    email: 'joe.cooper@nasa.gov',
    hashedPassword: bcrypt.hashSync('interstellar', 10)
    }),

    new User({
    _id: "230000000000000000000000",
    username: 'jamieoliver',
    firstName: 'Jamie',
    lastName: 'Oliver',
    completedRecipe: [{
      recipeId: "260000000000000000000000"
    }, {
      recipeId: "163000000000000000000000"
    }],
    email: 'jamieoliver@gmail.com',
    hashedPassword: bcrypt.hashSync('foodlover', 10)
    }),

    new User({
      _id: "240000000000000000000000",
      username: 'wolfgangpuck',
      firstName: 'Wolfgang',
      lastName: 'Puck',
      email: 'wolfgangpuck@gmail.com',
      hashedPassword: bcrypt.hashSync('spago', 10)
    }),

    new User({
      _id: "250000000000000000000000",
      username: 'alicewaters',
      firstName: 'Alice',
      lastName: 'Waters',
      email: 'alicewaters@gmail.com',
      hashedPassword: bcrypt.hashSync('slowfood', 10)
    })
)

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
    return tagArray;
  }

  const newRecipe = new Recipe({
    _id: recipe._id,
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
