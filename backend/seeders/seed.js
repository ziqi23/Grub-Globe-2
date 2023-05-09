const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const Recipe = require('../models/Recipe');

// const apiKey = '602ba7298ff846909d817cce1b2d2b63';
// const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
// const NUM_SEED_RECIPES = 150;

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

const searchTerms = ['hamburger', 'fried chicken', 'apple pie', 'clam chowder', 'caesar salad', 'tacos', 'gaucamole', 'tamales', 'enchiladas', 'margarita', 'osso buco', 'lasagna', 'tiramisu', 'caprese salad', 'risotto', 'paella','gazpacho', 'churros', 'croquetas', 'sangria', 'baguette', 'beef bourguignon', 'coq a vin', 'creme brulee', 'french onion soup', 'shepherd pie','full english breakfast','trifle','yorkshire pudding','bangers and mash', 'bratwurst','sauerkraut','black forest cake','pretzel','beer','sushi','ramen','tempura','miso soup','matcha','fried rice','hot and sour soup','dim sum','kung pao chicken','chow mein', 'butter chicken','biryani','samosas','tandoori chicken','rogan josh','papaya salad','green curry','mango sticky rice','pad see ew','massaman curry','pho','banh mi','spring rolls','com tam', 'ca kho to','Feijoada','Brigadeiro','pastel','tapioca'];

const country = ['United States', 'Mexico', 'Italy', 'Spain', 'France', 'United Kingdom', 'Germany', 'Japan', 'China', 'India', 'Thailand', 'Vietnam', 'Brazil'];

// async function fetchRecipes(searchTerm, country) {
//   const response = await fetch(`${apiUrl}?apiKey=${apiKey}&query={searchTerms}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true`);
//   const data = await response.json();

//   if (data.results.length > 0) {
//     const recipeData = data.results[0];
//     const recipeId = recipeData.id;

//     const ingredientsResponse = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=${apiKey}`);
//     const ingredientsData = await ingredientsResponse.json();

//     // servings change -> data local or not

//     const ingredients = ingredientsData.ingredients.map((ingredient => {
//       const amount = ingredient.amount.metric;
//       return `${ingredient.name}: ${amount.value} ${amount.unit}`;
//     }));

//     const recipe = new Recipe({
//       country: recipeData.country,
//       recipeName: recipeData.title,
//       recipeImage: recipeData.image,
//       recipeAuthor: recipeData.sourceName,
//       ingredients: ingredients,
//       nutrition: {
//         nutrients: nutrients,
//       },
//       recipeDescription: recipeData.summary,
//       cookTime: recipeData.readyInMinutes,
//       country: country,
//       cuisineDescription:{},
//       servings: recipeData.servings,
//       recipeInstructions: {
//         steps: recipeInstructions,
//       },
//       tags:[],
//       youtubeLinks: []
//     })

//     await recipe.save();
//   }
// }

const recipe1 = new Recipe({
  country: 'United States',
  recipeName: 'Tex-Mex Burger',
  recipeImage: 'https://spoonacular.com/recipeImages/663050-312x231.jpg',
  recipeAuthor: 'Meagan Meyer',
  ingredients: {
    type: [
      {
        id: 1,
        name: 'ground beef',
        amount: 2.0,
        unit: 'lb'
      },
      {
        id: 2,
        name: 'chili powder',
        amount: 1.0,
        unit: 'tsp'
      },
      {
        id: 3,
        name: 'avocado',
        amount: 1.0,
        unit: ''
      },
      {
        id: 4,
        name: 'cilantro',
        amount: 0.75,
        unit: 'cup'
      },
      {
        id: 5,
        name: 'cumin',
        amount: 2.0,
        unit: 'tsps',
      },
      {
        id: 6,
        name: 'hamburger buns',
        amount: 4.0,
        unit: ''
      },
      {
        id: 7,
        name: 'paprika',
        amount: 1.0,
        unit: 'tsp'
      },
      {
        id: 8,
        name: 'pepper',
        amount: 1.0,
        unit: 'tsp'
      },
      {
        id: 9,
        name: 'pepper jack cheese',
        amount: 4.0,
        unit: 'slice'
      },
      {
        id: 10,
        name: 'red onion',
        amount: 8.0,
        unit: 'slice'
      },
      {
        id: 11,
        name: 'salsa',
        amount: 8.0,
        unit: 'tsps'
      },
      {
        id: 12, 
        name: 'salt',
        amount: 1.0,
        unit: 'tsp'
      }
    ]
  },
  nutrition: {
    nutrients: [
      {
        name: 'Calories',
        amount: 884.46,
        unit: 'kcal',
        percentOfDailyNeeds: 44.22
      },
      {
        name: "Fat",
        amount: 61.3,
        unit: "g",
        percentOfDailyNeeds: 94.31
      },
      {
        name: "Saturated Fat",
        amount: 22.92,
        unit: "g",
        percentOfDailyNeeds: 143.22
      },
      {
        name: "Carbohydrates",
        amount: 32.26,
        unit: "g",
        percentOfDailyNeeds: 10.75
      },
      {
        name: "Net Carbohydrates",
        amount: 26.32,
        unit: "g",
        percentOfDailyNeeds: 9.57
      },
      {
        name: "Sugar",
        amount: 6.13,
        unit: "g",
        percentOfDailyNeeds: 6.81
      },
      {
        name: "Cholesterol",
        amount: 179.72,
        unit: "mg",
        percentOfDailyNeeds: 59.91
      },
      {
        name: "Sodium",
        amount: 1300.92,
        unit: "mg",
        percentOfDailyNeeds: 56.56
      },
      {
        name: "Protein",
        amount: 50.53,
        unit: "g",
        percentOfDailyNeeds: 101.05
      },
      {
        name: "Vitamin B12",
        amount: 5.11,
        unit: "µg",
        percentOfDailyNeeds: 85.23
      },
      {
        name: "Zinc",
        amount: 10.98,
        unit: "mg",
        percentOfDailyNeeds: 73.21
      },
      {
        name: "Selenium",
        amount: 49.67,
        unit: "µg",
        percentOfDailyNeeds: 70.95
      },
      {
        name: "Vitamin B3",
        amount: 12.89,
        unit: "mg",
        percentOfDailyNeeds: 64.45
      },
      {
        name: "Phosphorus",
        amount: 550.55,
        unit: "mg",
        percentOfDailyNeeds: 55.05
      },
      {
        name: "Vitamin B6",
        amount: 1.03,
        unit: "mg",
        percentOfDailyNeeds: 51.6
      },
      {
        name: "Iron",
        amount: 7.5,
        unit: "mg",
        percentOfDailyNeeds: 41.69
      },
      {
        name: "Vitamin B2",
        amount: 0.65,
        unit: "mg",
        percentOfDailyNeeds: 38.28
      },
      {
        name: "Potassium",
        amount: 1115.52,
        unit: "mg",
        percentOfDailyNeeds: 31.87
      },
      {
        name: "Calcium",
        amount: 298.27,
        unit: "mg",
        percentOfDailyNeeds: 29.83
      },
      {
        name: "Vitamin K",
        amount: 30.03,
        unit: "µg",
        percentOfDailyNeeds: 28.6
      },
      {
        name: "Folate",
        amount: 109.89,
        unit: "µg",
        percentOfDailyNeeds: 27.47
      },
      {
        name: "Vitamin B1",
        amount: 0.4,
        unit: "mg",
        percentOfDailyNeeds: 26.95
      },
      {
        name: "Manganese",
        amount: 0.54,
        unit: "mg",
        percentOfDailyNeeds: 26.92
      },
      {
        name: "Fiber",
        amount: 5.94,
        unit: "g",
        percentOfDailyNeeds: 23.78
      },
      {
        name: "Vitamin A",
        amount: 1090.67,
        unit: "IU",
        percentOfDailyNeeds: 21.81
      },
      {
        name: "Magnesium",
        amount: 83.63,
        unit: "mg",
        percentOfDailyNeeds: 20.91
      },
      {
        name: "Vitamin E",
        amount: 3.08,
        unit: "mg",
        percentOfDailyNeeds: 20.5
      },
      {
        name: "Vitamin B5",
        amount: 2.02,
        unit: "mg",
        percentOfDailyNeeds: 20.24
      },
      {
        name: "Copper",
        amount: 0.35,
        unit: "mg",
        percentOfDailyNeeds: 17.63
      },
      {
        name: "Vitamin C",
        amount: 9.16,
        unit: "mg",
        percentOfDailyNeeds: 11.1
      },
      {
        name: "Vitamin D",
        amount: 0.35,
        unit: "µg",
        percentOfDailyNeeds: 2.35
      }
  ]
  },
  recipeDescription: '"Tex-Mex Burger is an American recipe that serves 4. For $3.4 per serving, this recipe covers 36% of your daily requirements of vitamins and minerals. This main course has <b>884 calories, 51g of protein, and 61g of fat per serving. 2 people were glad they tried this recipe. From preparation to the plate, this recipe takes roughly 15 minutes. It is brought to you by Foodista. A mixture of pepper, chili powder, pepper jack cheese, and a handful of other ingredients are all it takes to make this recipe so delicious. Overall, this recipe earns a solid spoonacular score of 73%. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/tex-mex-burger-1402235\">Tex-Mex Burger</a>, <a href=\"https://spoonacular.com/recipes/tex-mex-burger-220709\">Tex-Mex burger</a>, and <a href=\"https://spoonacular.com/recipes/tex-mex-turkey-burger-1478359\">Tex-Mex Turkey Burger</a>."',
  prepTime: 15,
  cuisineDescription: 'American',
  servings: 4,
  recipeInstructions: [
    {
      name: "",
      steps: [
        {
          number: 1,
          step: 'Preheat broiler.'
        },
        {
          number: 2,
          step: 'Heat large frying pan to medium high heat. Make patties: Take the ground beef, add salsa and spices.',
        },
        {
          number: 3,
          step: 'Mix together till evenly distributed.',
        },
      ]
    },
    {
      name: "Place patties on frying pan and cook for 3 minutes and 30 seconds.Flip over and place 1 slice of cheese on each patty. Cook for another 3 minutes and 30 seconds. Meanwhile, get out all toppings and toast buns. Once done, let burger rest for 5 minutes on a plate.Assemble burger",
      steps: [
        {
          number: 1,
          step: 'Place patty on bun. Top with 1 TBSP Salsa, then 2 slices of red onion.'
        },
        {
          number: 2,
          step: 'Place  of the cilantro on red onion and then place avocado on top bun.'
        },
        {
          number: 3,
          step: 'Add bun to burger and serve.'
        }
      ]
    },
  ],
  tags: {
    type: [
      {
        name: 'vegetarian',
        value: false
      },
      {
        name: 'vegan',
        value: false
      },
      {
        name: 'glutenFree',
        value: false
      },
      {
        name: 'dairyFree',
        value: false
      },
      {
        name: 'sustainable',
        value: false
      }

  ]
  },
  reviewDocument: {
    type: []
  },
  youtubeLinks: [
    ['https://www.youtube.com/watch?v=foD42-73wdI', 'https://www.youtube.com/watch?v=IJou15msogM', 'https://www.youtube.com/watch?v=aGj_EhmfAHM']
  ]
})

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

recipe2 = new Recipe({
  country: '',
  recipeName: '',
  recipeImage: '',
  recipeAuthor: '',
  ingredients: {

  },
  nutrition: {
    nutrients: [{

    }]
  },
  recipeDescription: '',
  prepTime: ,
  cuisineDescription: '',
  servings: ,
  recipeInstructions: {
    steps: [{
      number: ,
      step: '',
      ingredients: [{
        id: ,
        name: ''
      }],
      equipment: [{
        id: ,
        name: ''
      }]
    }]
  },
  tags: {
    type: [{
      name: '',
      value: true
    }]
  }
  reviewDocument: {
    type: [{
      user: ,
      content: ,
    }],
  },
  youtubeLinks: {
    ['']
  }
});

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
