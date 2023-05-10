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

                 })
                 .catch(err => {
                   console.error(err.stack);
                   process.exit(1);
                 });
}

const recipe1 = new Recipe({
  country: 'United States',
  recipeName: 'Tex-Mex Burger',
  recipeAuthor: 'Meagan Meyer',
  ingredients: [
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
  ],
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
    {
      number: 4,
      step: 'Place patties on frying pan and cook for 3 minutes and 30 seconds. Flip over and place 1 slice of cheese on each patty. Cook for another 3 minutes and 30 seconds. Meanwhile, get out all toppings and toast buns. Once done, let burger rest for 5 minutes on a plate.',
    },
    {
      number: 5,
      step: 'Assemble burger: Place patty on bun. Top with 1 TBSP Salsa, then 2 slices of red onion.',
    },
    {
      number: 6,
      step: 'Place  of the cilantro on red onion and then place avocado on top bun.',
    },
    {
      number: 7,
      step: 'Add bun to burger and serve.',
    }
  ],
  tags: [
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
  ],
  reviewDocument: {
    type: []
  },
  youtubeLinks: [
    'https://www.youtube.com/watch?v=foD42-73wdI', 'https://www.youtube.com/watch?v=IJou15msogM', 'https://www.youtube.com/watch?v=aGj_EhmfAHM'
  ]
})

const recipe2 = new Recipe({
  country: 'United States',
  recipeName: 'Spicy Fried Chicken w Sweet Chili Sauce',
  recipeAuthor: 'olivia kim',
  ingredients: [
    {
      id: 1,
      name: "cayenne pepper",
      amount: 1.0,
      unit: "tsp"
    },
    {
      id: 2,
      name: "chicken drumsticks",
      amount: 10.0,
      unit: ""
    },
    {
      id: 3,
      name: "sweet chili dipping sauce",
      amount: 0.5,
      unit: "cup"
    },
    {
      id: 4,
      name: "cornstarch",
      amount: 1.0,
      unit: 'cup'
    },
    {
      id: 5,
      name: "flour",
      amount: 1.0,
      unit: "cup",
    },
    {
      id: 6,
      name:  "red gochugaru",
      amount: 1.0,
      unit: "tsp"
    },
    {
      id: 7,
      name: "black ground pepper",
      amount: 1.0,
      unit: "tsp"
    },
    {
      id: 8,
      name: "hot sauce",
      amount: 2.0,
      unit: "tbsps"
    },
    {
      id: 9,
      name:  "sea salt",
      amount: 1.0,
      unit: "Tbsp"
    },
    {
      id: 10,
      name: "water",
      amount: 1.0,
      unit: "cup"
    }
  ],
  nutrition: {
    nutrients: [
      {
        name: "Calories",
        amount: 572.82,
        unit: "kcal",
        percentOfDailyNeeds: 28.64
      },
      {
        name: "Fat",
        amount: 18.2,
        unit: "g",
        percentOfDailyNeeds: 28.0
      },
      {
        name: "Saturated Fat",
        amount: 4.74,
        unit: "g",
        percentOfDailyNeeds: 29.63
      },
      {
        name: "Carbohydrates",
        amount: 60.96,
        unit: "g",
        percentOfDailyNeeds: 20.32
      },
      {
        name: "Net Carbohydrates",
        amount: 58.56,
        unit: "g",
        percentOfDailyNeeds: 21.3
      },
      {
        name: "Sugar",
        amount: 4.79,
        unit: "g",
        percentOfDailyNeeds: 5.32
      },
      {
        name: "Cholesterol",
        amount: 174.13,
        unit: "mg",
        percentOfDailyNeeds: 58.04
      },
      {
        name: "Sodium",
        amount: 2584.92,
        unit: "mg",
        percentOfDailyNeeds: 112.39
      },
      {
        name: "Protein",
        amount: 37.66,
        unit: "g",
        percentOfDailyNeeds: 75.33
      },
      {
        name: "Selenium",
        amount: 48.76,
        unit: "µg",
        percentOfDailyNeeds: 69.65
      },
      {
        name: "Vitamin B3",
        amount: 11.67,
        unit: "mg",
        percentOfDailyNeeds: 58.33
      },
      {
        name: "Phosphorus",
        amount: 374.18,
        unit: "mg",
        percentOfDailyNeeds: 37.42
      },
      {
        name: "Vitamin B6",
        amount: 0.73,
        unit: "mg",
        percentOfDailyNeeds: 36.49
      },
      {
        name: "Vitamin B2",
        amount: 0.51,
        unit: "mg",
        percentOfDailyNeeds: 29.97
      },
      {
        name: "Vitamin B1",
        amount: 0.43,
        unit: "mg",
        percentOfDailyNeeds: 29.0
      },
      {
        name: "Zinc",
        amount: 3.98,
        unit: "mg",
        percentOfDailyNeeds: 26.55
      },
      {
        name: "Vitamin B5",
        amount: 2.11,
        unit: "mg",
        percentOfDailyNeeds: 21.13
      },
      {
        name: "Iron",
        amount: 3.28,
        unit: "mg",
        percentOfDailyNeeds: 18.23
      },
      {
        name: "Potassium",
        amount: 617.92,
        unit: "mg",
        percentOfDailyNeeds: 17.65
      },
      {
        name: "Manganese",
        amount: 0.35,
        unit: "mg",
        percentOfDailyNeeds: 17.56
      },
      {
        name: "Vitamin B12",
        amount: 1.04,
        unit: "µg",
        percentOfDailyNeeds: 17.35
      },
      {
        name: "Folate",
        amount: 67.03,
        unit: "µg",
        percentOfDailyNeeds: 16.76
      },
      {
        name: "Vitamin A",
        amount: 667.88,
        unit: "IU",
        percentOfDailyNeeds: 13.36
      },
      {
        name: "Magnesium",
        amount: 53.03,
        unit: "mg",
        percentOfDailyNeeds: 13.26
      },
      {
        name: "Vitamin C",
        amount: 10.67,
        unit: "mg",
        percentOfDailyNeeds: 12.93
      },
      {
        name: "Copper",
        amount: 0.25,
        unit: "mg",
        percentOfDailyNeeds: 12.34
      },
      {
        name: "Fiber",
        amount: 2.39,
        unit: "g",
        percentOfDailyNeeds: 9.57
      },
      {
        name: "Vitamin E",
        amount: 1.37,
        unit: "mg",
        percentOfDailyNeeds: 9.14
      },
      {
        name: "Vitamin K",
        amount: 8.46,
        unit: "µg",
        percentOfDailyNeeds: 8.06
      },
      {
        name: "Calcium",
        amount: 38.99,
        unit: "mg",
        percentOfDailyNeeds: 3.9
      },
      {
        name: "Vitamin D",
        amount: 0.19,
        unit: "µg",
        percentOfDailyNeeds: 1.26
      }
    ]
  },
  recipeDescription: "Spicy Fried Chicken w Sweet Chili Sauce might be just the <b>Southern</b> recipe you are searching for. For <b>$1.43 per serving</b>, this recipe <b>covers 22%</b> of your daily requirements of vitamins and minerals. This recipe makes 4 servings with <b>573 calories</b>, <b>38g of protein</b>, and <b>18g of fat</b> each. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. It is a good option if you're following a <b>dairy free</b> diet. It is perfect for <b>The Super Bowl</b>. It is brought to you by Foodista. Head to the store and pick up cayenne pepper, ground pepper, chili dipping sauce, and a few other things to make it today. It works well as a rather cheap main course. 1 person has tried and liked this recipe. All things considered, we decided this recipe <b>deserves a spoonacular score of 53%</b>. This score is good. Users who liked this recipe also liked <a href=\"https://spoonacular.com/recipes/sweet-and-spicy-chili-sauce-for-korean-fried-chicken-196325\">Sweet and Spicy Chili Sauce For Korean Fried Chicken</a>, <a href=\"https://spoonacular.com/recipes/thai-chicken-skewer-appetizers-with-sweet-and-spicy-chili-sauce-621582\">Thai Chicken Skewer Appetizers with Sweet and Spicy Chili Sauce</a>, and <a href=\"https://spoonacular.com/recipes/pan-fried-chicken-dumplings-with-sweet-and-spicy-dipping-sauce-315371\">Pan-Fried Chicken Dumplings with Sweet and Spicy Dipping Sauce</a>.",
  prepTime: 45,
  cuisineDescription: 'Southern',
  servings: 4,
  recipeInstructions: [
    {
      number: 1,
      step: "For the short marinade/pre-rub: In a large bowl, mix the first 3 ingredients (salt, pepper, and hot sauce) with the chicken pieces until thoroughly coated."
    },
    {
      number: 2,
      step: "Let sit for at least 15 minutes.2.For the batter: In a large bowl, whisk together all dry ingredients. Slowly whisk in the water and whisk until smooth."
    },
    {
      number: 3,
      step: "Add more cornstarch or flour to get a thick, pancake-like consistency."
    },
    {
      number: 4,
      step: "Let the batter sit at room temperature for 15 minutes."
    },
    {
      number: 5,
      step: "Heat the oil on medium-high heat in a large Dutch oven or pot."
    },
    {
      number: 6,
      step: "Transfer half the chicken into the batter."
    },
    {
      number: 7,
      step: "Remove the chicken, 1 piece at a time, from the batter (allowing any excess to drip back into the bowl) and carefully transfer to the oil. Fry the chicken until deep golden brown and just cooked through, about 12 minutes."
    },
    {
      number: 8,
      step: "Transfer to paper towels to remove excess oil and cool."
    },
    {
      number: 9,
      step: "Serve with sweet chili sauce or sauce of preference. Enjoy."
    }
  ],
  tags: [
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
      value: true
    },
    {
      name: 'sustainable',
      value: false
    }
  ],
  reviewDocument: {
    type: []
  },
  youtubeLinks: [
    'https://www.youtube.com/watch?v=3feoGIs4ULc', 'https://www.youtube.com/watch?v=hOTihLk4pfg', 'https://www.youtube.com/watch?v=rDEBw-P9Mu4'
  ]
});

const recipe3 = new Recipe({
  country: 'United States',
  recipeName: 'Apple Pie Bars',
  recipeAuthor: 'The Runaway Spoon',
  ingredients: [
    {
      id: 1,
      name: "mcintosh apples",
      amount: 3.0,
      unit: "large"
    },
    {
      id: 2,
      name: "baking powder",
      amount: 2.0,
      unit: "tsps"
    },
    {
      id: 3,
      name: "baking soda",
      amount: 1.0,
      unit: "tsp"
    },
    {
      id: 4,
      name: "butterscotch chips",
      amount: 6.0,
      unit: "ounces"
    },
    {
      id: 5,
      name: "eggs",
      amount: 2.0,
      unit: ""
    },
    {
      id: 6,
      name: "flour",
      amount: 2.0,
      unit: "cups"
    },
    {
      id: 7,
      name: "ground cinnamon",
      amount: 1.0,
      unit: "tsp"
    },
    {
      id: 8,
      name: "ground nutmeg",
      amount: 1.0,
      unit: "tsp"
    },
    {
      id: 9,
      name: "salt",
      amount: 0.5,
      unit: "tsps"
    },
    {
      id: 10,
      name: "sugar",
      amount: 1.0,
      unit: "cup"
    },
    {
      id: 11,
      name: "vegetable oil",
      amount: 1.0,
      unit: "cup"
    }
  ],
  nutrition: {
    nutrients: [
      {
        name: "Calories",
        amount: 134.33,
        unit: "kcal",
        percentOfDailyNeeds: 6.72
      },
      {
        name: "Fat",
        amount: 2.61,
        unit: "g",
        percentOfDailyNeeds: 4.01
      },
      {
        name: "Saturated Fat",
        amount: 0.58,
        unit: "g",
        percentOfDailyNeeds: 3.65
      },
      {
        name: "Carbohydrates",
        amount: 26.73,
        unit: "g",
        percentOfDailyNeeds: 8.91
      },
      {
        name: "Net Carbohydrates",
        amount: 25.72,
        unit: "g",
        percentOfDailyNeeds: 9.35
      },
      {
        name: "Sugar",
        amount: 16.99,
        unit: "g",
        percentOfDailyNeeds: 18.88
      },
      {
        name: "Cholesterol",
        amount: 14.28,
        unit: "mg",
        percentOfDailyNeeds: 4.76
      },
      {
        name: "Sodium",
        amount: 162.89,
        unit: "mg",
        percentOfDailyNeeds: 7.08
      },
      {
        name: "Protein",
        amount: 1.62,
        unit: "g",
        percentOfDailyNeeds: 3.24
      },
      {
        name: "Selenium",
        amount: 4.75,
        unit: "µg",
        percentOfDailyNeeds: 6.79
      },
      {
        name: "Vitamin B1",
        amount: 0.09,
        unit: "mg",
        percentOfDailyNeeds: 5.94
      },
      {
        name: "Folate",
        amount: 21.69,
        unit: "µg",
        percentOfDailyNeeds: 5.42
      },
      {
        name: "Manganese",
        amount: 0.1,
        unit: "mg",
        percentOfDailyNeeds: 4.97
      },
      {
        name: "Vitamin B2",
        amount: 0.08,
        unit: "mg",
        percentOfDailyNeeds: 4.6
      },
      {
        name: "Fiber",
        amount: 1.01,
        unit: "g",
        percentOfDailyNeeds: 4.05
      },
      {
        name: "Vitamin K",
        amount: 4.04,
        unit: "µg",
        percentOfDailyNeeds: 3.85
      },
      {
        name: "Iron",
        amount: 0.63,
        unit: "mg",
        percentOfDailyNeeds: 3.52
      },
      {
        name: "Vitamin B3",
        amount: 0.65,
        unit: "mg",
        percentOfDailyNeeds: 3.23
      },
      {
        name: "Phosphorus",
        amount: 29.18,
        unit: "mg",
        percentOfDailyNeeds: 2.92
      },
      {
        name: "Calcium",
        amount: 26.26,
        unit: "mg",
        percentOfDailyNeeds: 2.63
      },
      {
        name: "Vitamin E",
        amount: 0.25,
        unit: "mg",
        percentOfDailyNeeds: 1.68
      },
      {
        name: "Vitamin C",
        amount: 1.29,
        unit: "mg",
        percentOfDailyNeeds: 1.56
      },
      {
        name: "Potassium",
        amount: 47.14,
        unit: "mg",
        percentOfDailyNeeds: 1.35
      },
      {
        name: "Copper",
        amount: 0.03,
        unit: "mg",
        percentOfDailyNeeds: 1.35
      },
      {
        name: "Vitamin B5",
        amount: 0.12,
        unit: "mg",
        percentOfDailyNeeds: 1.19
      },
      {
        name: "Vitamin B6",
        amount: 0.02,
        unit: "mg",
        percentOfDailyNeeds: 1.13
      },
      {
        name: "Magnesium",
        amount: 4.42,
        unit: "mg",
        percentOfDailyNeeds: 1.1
      }
    ]
  },
  recipeDescription: "The recipe Apple Pie Bars could satisfy your American craving in roughly <b>1 hour and 15 minutes</b>. Watching your figure? This dairy free recipe has <b>134 calories</b>, <b>2g of protein</b>, and <b>3g of fat</b> per serving. For <b>28 cents per serving</b>, you get a dessert that serves 24. 78 people have tried and liked this recipe. A mixture of mcintosh apples, flour, vegetable oil, and a handful of other ingredients are all it takes to make this recipe so flavorful. It is brought to you by Foodista. With a spoonacular <b>score of 21%</b>, this dish is not so super. If you like this recipe, you might also like recipes such as <a href=\"https://spoonacular.com/recipes/apple-pie-bars-610491\">Apple Pie Bars</a>, <a href=\"https://spoonacular.com/recipes/apple-pie-bars-543608\">Apple Pie Bars</a>, and <a href=\"https://spoonacular.com/recipes/apple-pie-bars-616727\">Apple Pie Bars</a>.",
  prepTime: 75,
  cuisineDescription: 'American',
  servings: 24,
  recipeInstructions: [
    {
      number: 1,
      step: "Preheat the oven to 350 degrees F.  Spray a 9 by 13 inch baking dish with cooking spray.In the bowl of an electric mixer, thoroughly combine the oil, eggs, and sugar.  Sift the flour, baking powder, salt, soda, and spices together in a bowl, then add to the oil mixture in the mixer, beating until thoroughly mixed.  The batter will be thick.Use a sturdy spoon to stir in the apple pieces.  Scrape the mixture into the prepared pan, spreading it out evenly."
    },
    {
      number: 2,
      step: "Sprinkle the butterscotch chips over the top, pressing them into the batter lightly.",
    },
    {
      number: 3,
      step: "Bake for 45 minutes to 1 hour, until golden and pulling away from the sides of the pan slightly.Cool thoroughly and cut into squares.",
    },
  ],
  tags: [
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
      value: true
    },
    {
      name: 'sustainable',
      value: false
    }
  ],
  reviewDocument: {
    type: []
  },
  youtubeLinks: [
    'https://www.youtube.com/watch?v=hhXNGnR3ULs', 'https://www.youtube.com/watch?v=tNkIeAk_Eg8', 'https://www.youtube.com/watch?v=UDIBg1w5MuA'
  ]
})

const recipe4 = new Recipe({
  country: 'United States',
  recipeName: 'Light Clam Chowder',
  recipeAuthor: 'Jessica Glick',
  ingredients: [
    {
      id: 1,
      name: "black pepper",
      amount: 2.0,
      unit: "tsps"
    },
    {
      id: 2,
      name: "carrots",
      amount: 4.0,
      unit: "cups"
    },
    {
      id: 3,
      name: "celery",
      amount: 1.0,
      unit: "stalk"
    },
    {
      id: 4,
      name: "chili paste",
      amount: 1.5,
      unit: "Tbsps"
    },
    {
      id: 5,
      name: "clams",
      amount: 2.0,
      unit: "pounds"
    },
    {
      id: 6,
      name: "coconut milk",
      amount: 1.5,
      unit: "cups"
    },
    {
      id: 7,
      name: "coconut oil",
      amount: 2.0,
      unit: "Tbsps"
    },
    {
      id: 8,
      name: "dried thyme",
      amount: 1.0,
      unit: "Tbsp"
    },
    {
      id: 9,
      name: "frozen corn",
      amount: 2.0,
      unit: "cups"
    },
    {
      id: 10,
      name: "garlic",
      amount: 5.0,
      unit: "cloves"
    },
    {
      id: 11,
      name: "kosher salt",
      amount: 1.0,
      unit: "tsp"
    },
    {
      id: 12,
      name: "pancetta",
      amount: 0.5,
      unit: "pound"
    },
    {
      id: 13,
      name: "parsnips",
      amount: 1.0,
      unit: "pound"
    },
    {
      id: 14,
      name: "red onion",
      amount: 1.0,
      unit: "large"
    },
    {
      id: 15,
      name: "vegan buttery spread",
      amount: 1.0,
      unit: "tsp"
    }
  ],
  nutrition: {
    nutrients: [
      {
        name: "Calories",
        amount: 497.35,
        unit: "kcal",
        percentOfDailyNeeds: 24.87
      },
      {
        name: "Fat",
        amount: 33.41,
        unit: "g",
        percentOfDailyNeeds: 51.41
      },
      {
        name: "Saturated Fat",
        amount: 19.92,
        unit: "g",
        percentOfDailyNeeds: 124.47
      },
      {
        name: "Carbohydrates",
        amount: 42.36,
        unit: "g",
        percentOfDailyNeeds: 14.12
      },
      {
        name: "Net Carbohydrates",
        amount: 33.82,
        unit: "g",
        percentOfDailyNeeds: 12.3
      },
      {
        name: "Sugar",
        amount: 8.94,
        unit: "g",
        percentOfDailyNeeds: 9.93
      },
      {
        name: "Cholesterol",
        amount: 31.75,
        unit: "mg",
        percentOfDailyNeeds: 10.58
      },
      {
        name: "Sodium",
        amount: 740.15,
        unit: "mg",
        percentOfDailyNeeds: 32.18
      },
      {
        name: "Protein",
        amount: 13.39,
        unit: "g",
        percentOfDailyNeeds: 26.78
      },
      {
        name: "Vitamin A",
        amount: 14438.85,
        unit: "IU",
        percentOfDailyNeeds: 288.78
      },
      {
        name: "Manganese",
        amount: 1.3,
        unit: "mg",
        percentOfDailyNeeds: 65.02
      },
      {
        name: "Vitamin B12",
        amount: 2.75,
        unit: "µg",
        percentOfDailyNeeds: 45.86
      },
      {
        name: "Vitamin K",
        amount: 43.44,
        unit: "µg",
        percentOfDailyNeeds: 41.37
      },
      {
        name: "Fiber",
        amount: 8.54,
        unit: "g",
        percentOfDailyNeeds: 34.16
      },
      {
        name: "Vitamin C",
        amount: 25.73,
        unit: "mg",
        percentOfDailyNeeds: 31.19
      },
      {
        name: "Phosphorus",
        amount: 300.22,
        unit: "mg",
        percentOfDailyNeeds: 30.02
      },
      {
        name: "Potassium",
        amount: 1011.36,
        unit: "mg",
        percentOfDailyNeeds: 28.9
      },
      {
        name: "Folate",
        amount: 106.21,
        unit: "µg",
        percentOfDailyNeeds: 26.55
      },
      {
        name: "Iron",
        amount: 4.48,
        unit: "mg",
        percentOfDailyNeeds: 24.91
      },
      {
        name: "Selenium",
        amount: 17.01,
        unit: "µg",
        percentOfDailyNeeds: 24.29
      },
      {
        name: "Vitamin B6",
        amount: 0.47,
        unit: "mg",
        percentOfDailyNeeds: 23.64
      },
      {
        name: "Magnesium",
        amount: 90.89,
        unit: "mg",
        percentOfDailyNeeds: 22.72
      },
      {
        name: "Vitamin B3",
        amount: 4.42,
        unit: "mg",
        percentOfDailyNeeds: 22.08
      },
      {
        name: "Vitamin B1",
        amount: 0.32,
        unit: "mg",
        percentOfDailyNeeds: 21.58
      },
      {
        name: "Copper",
        amount: 0.35,
        unit: "mg",
        percentOfDailyNeeds: 17.41
      },
      {
        name: "Vitamin E",
        amount: 2.26,
        unit: "mg",
        percentOfDailyNeeds: 15.07
      },
      {
        name: "Zinc",
        amount: 2.04,
        unit: "mg",
        percentOfDailyNeeds: 13.6
      },
      {
        name: "Vitamin B5",
        amount: 1.24,
        unit: "mg",
        percentOfDailyNeeds: 12.41
      },
      {
        name: "Vitamin B2",
        amount: 0.19,
        unit: "mg",
        percentOfDailyNeeds: 11.38
      },
      {
        name: "Calcium",
        amount: 106.53,
        unit: "mg",
        percentOfDailyNeeds: 10.65
      },
      {
        name: "Vitamin D",
        amount: 0.15,
        unit: "µg",
        percentOfDailyNeeds: 1.01
      }
    ]
  },
  recipeDescription: "If you want to add more <b>gluten free and dairy free</b> recipes to your repertoire, Light Clam Chowder might be a recipe you should try. This recipe serves 6. One serving contains <b>497 calories</b>, <b>13g of protein</b>, and <b>33g of fat</b>. For <b>$3.16 per serving</b>, this recipe <b>covers 26%</b> of your daily requirements of vitamins and minerals. It is a <b>pretty expensive</b> recipe for fans of American food. 1 person were glad they tried this recipe. It is brought to you by Foodista. Head to the store and pick up pancetta, corn, celery, and a few other things to make it today. It works well as a main course. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. With a spoonacular <b>score of 62%</b>, this dish is pretty good. <a href=\"https://spoonacular.com/recipes/light-new-england-clam-chowder-dairy-free-gluten-free-557546\">Light New England Clam Chowder {Dairy Free & Gluten Free}</a>, <a href=\"https://spoonacular.com/recipes/clam-chowder-583329\">Clam Chowder</a>, and <a href=\"https://spoonacular.com/recipes/clam-chowder-95535\">Clam Chowder</a> are very similar to this recipe.",
  prepTime: 45,
  cuisineDescription: 'American',
  servings: 6,
  recipeInstructions: [
    {
      number: 1,
      step: "In a large stock pot, bring about 5 cups of water to a boil and cook the parsnips until slightly softened, 5 to 7 minutes.When ready, remove the parsnips with a slotted spoon, but do not drain off the water."
    },
    {
      number: 2,
      step: "Transfer to a bowl. Set aside.Turn heat down to simmer and cover with lid.In the meantime, begin to prepare the other ingredients.While the parsnips are boiling."
    },
    {
      number: 3,
      step: "Heat a heavy-bottomed saut pan, set over over medium heat."
    },
    {
      number: 4,
      step: "Add coconut oil.When hot (throw in a piece to see if it sizzles) add the bacon to the oil and thyme and cook, stirring often, about 5 minutes, making sure not to burn the bacon."
    },
    {
      number: 5,
      step: "Add the red onion, celery and garlic, and cook, stirring often, until the vegetables are translucent, 4 to 5 minutes."
    },
    {
      number: 6,
      step: "Add the carrots and chili paste, stir often, and cook until the carrots soften slightly, 3 to 4 minutes and all the chili paste is blended.Note: This allows the flavor of the chili paste to coat all the ingredients before being diluted by the liquid."
    },
    {
      number: 7,
      step: "Add the parsnips and transfer most of the parsnip water (or all if you can fit it into your skillet, mine couldnt, I left about a cup in the pot) and stir to combine well.The liquid will turn a light red hue."
    },
    {
      number: 8,
      step: "Transfer to the simmering pot (with any remaining parsnip water, if some)."
    },
    {
      number: 9,
      step: "Add the shucked clams and its juice and raise the heat to medium."
    },
    {
      number: 10,
      step: "Add the coconut milk, non dairy butter spread, and corn to the pot.Bring chowder to a boil.When it comes to a boil, reduce heat to simmer for 5-10 minutes.Ladle individual servings into large soup bowls."
    },
    {
      number: 11,
      step: "Garnish with parsley (optional)."
    }
  ],
  tags: [
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
      value: true
    },
    {
      name: 'dairyFree',
      value: true
    },
    {
      name: 'sustainable',
      value: false
    }
  ],
  reviewDocument: {
    type: []
  },
  youtubeLinks: [
    'https://www.youtube.com/watch?v=2VynMQVtlgk&t=10s', 'https://www.youtube.com/watch?v=-tmoZeopk7c', 'https://www.youtube.com/watch?v=zvsJVBkNjYw'
  ]
})

const recipe5 = new Recipe({
  country: 'United States',
  recipeName: 'Salmon Caesar Salad',
  recipeAuthor: 'Alex Liska',
  ingredients: [
    {
      id: 1,
      name: "light caesar dressing",
      amount: 2.0,
      unit: "Tbsps"
    },
    {
      id: 2,
      name: "lemon juice",
      amount: 2.0,
      unit: "Tbsps"
    },
    {
      id: 3,
      name: "olive oil",
      amount: 1.0,
      unit: "Tbsp"
    },
    {
      id: 4,
      name: "paprika",
      amount: 0.25,
      unit: "tsps"
    },
    {
      id: 5,
      name: "shredded parmesan cheese",
      amount: 8.0,
      unit: "Tbsps"
    },
    {
      id: 6,
      name: "black add pepper",
      amount: 2.0,
      unit: "servings"
    },
    {
      id: 7,
      name: "romaine",
      amount: 8.0,
      unit: "oz"
    },
    {
      id: 8,
      name: "salmon fillet",
      amount: 6.0,
      unit: "ounces"
    },
    {
      id: 9,
      name: "salt",
      amount: 0.25,
      unit: "tsps"
    },
    {
      id: 10,
      name: "slivered almonds",
      amount: 1.0,
      unit: "Tbsp"
    }
  ],
  nutrition: {
    nutrients: [
      {
        name: "Calories",
        amount: 393.21,
        unit: "kcal",
        percentOfDailyNeeds: 19.66
      },
      {
        name: "Fat",
        amount: 28.96,
        unit: "g",
        percentOfDailyNeeds: 44.56
      },
      {
        name: "Saturated Fat",
        amount: 6.62,
        unit: "g",
        percentOfDailyNeeds: 41.38
      },
      {
        name: "Carbohydrates",
        amount: 7.17,
        unit: "g",
        percentOfDailyNeeds: 2.39
      },
      {
        name: "Net Carbohydrates",
        amount: 3.94,
        unit: "g",
        percentOfDailyNeeds: 1.43
      },
      {
        name: "Sugar",
        amount: 2.54,
        unit: "g",
        percentOfDailyNeeds: 2.83
      },
      {
        name: "Cholesterol",
        amount: 66.11,
        unit: "mg",
        percentOfDailyNeeds: 22.04
      },
      {
        name: "Sodium",
        amount: 835.98,
        unit: "mg",
        percentOfDailyNeeds: 36.35
      },
      {
        name: "Protein",
        amount: 26.9,
        unit: "g",
        percentOfDailyNeeds: 53.79
      },
      {
        name: "Vitamin A",
        amount: 10196.82,
        unit: "IU",
        percentOfDailyNeeds: 203.94
      },
      {
        name: "Vitamin K",
        amount: 136.59,
        unit: "µg",
        percentOfDailyNeeds: 130.08
      },
      {
        name: "Selenium",
        amount: 36.47,
        unit: "µg",
        percentOfDailyNeeds: 52.1
      },
      {
        name: "Vitamin B12",
        amount: 2.95,
        unit: "µg",
        percentOfDailyNeeds: 49.15
      },
      {
        name: "Folate",
        amount: 182.52,
        unit: "µg",
        percentOfDailyNeeds: 45.63
      },
      {
        name: "Vitamin B6",
        amount: 0.82,
        unit: "mg",
        percentOfDailyNeeds: 41.04
      },
      {
        name: "Phosphorus",
        amount: 371.9,
        unit: "mg",
        percentOfDailyNeeds: 37.19
      },
      {
        name: "Vitamin B3",
        amount: 7.32,
        unit: "mg",
        percentOfDailyNeeds: 36.6
      },
      {
        name: "Vitamin B2",
        amount: 0.53,
        unit: "mg",
        percentOfDailyNeeds: 31.15
      },
      {
        name: "Calcium",
        amount: 307.1,
        unit: "mg",
        percentOfDailyNeeds: 30.71
      },
      {
        name: "Potassium",
        amount: 778.75,
        unit: "mg",
        percentOfDailyNeeds: 22.25
      },
      {
        name: "Vitamin E",
        amount: 3.27,
        unit: "mg",
        percentOfDailyNeeds: 21.82
      },
      {
        name: "Vitamin B1",
        amount: 0.3,
        unit: "mg",
        percentOfDailyNeeds: 19.86
      },
      {
        name: "Vitamin B5",
        amount: 1.73,
        unit: "mg",
        percentOfDailyNeeds: 17.3
      },
      {
        name: "Manganese",
        amount: 0.33,
        unit: "mg",
        percentOfDailyNeeds: 16.62
      },
      {
        name: "Copper",
        amount: 0.33,
        unit: "mg",
        percentOfDailyNeeds: 16.61
      },
      {
        name: "Magnesium",
        amount: 64.66,
        unit: "mg",
        percentOfDailyNeeds: 16.16
      },
      {
        name: "Iron",
        amount: 2.4,
        unit: "mg",
        percentOfDailyNeeds: 13.36
      },
      {
        name: "Fiber",
        amount: 3.24,
        unit: "g",
        percentOfDailyNeeds: 12.95
      },
      {
        name: "Vitamin C",
        amount: 10.39,
        unit: "mg",
        percentOfDailyNeeds: 12.59
      },
      {
        name: "Zinc",
        amount: 1.55,
        unit: "mg",
        percentOfDailyNeeds: 10.32
      }
    ]
  },
  recipeDescription: "The recipe Salmon Caesar Salad could satisfy your American craving in roughly <b>45 minutes</b>. One portion of this dish contains around <b>27g of protein</b>, <b>29g of fat</b>, and a total of <b>393 calories</b>. For <b>$3.01 per serving</b>, you get a main course that serves 2. It is brought to you by Foodista. 12 people were glad they tried this recipe. Head to the store and pick up parmesan cheese, lemon juice, paprika, and a few other things to make it today. It is a good option if you're following a <b>gluten free, primal, pescatarian, and ketogenic</b> diet. Taking all factors into account, this recipe <b>earns a spoonacular score of 94%</b>, which is great. Users who liked this recipe also liked <a href=\"https://spoonacular.com/recipes/salmon-caesar-salad-418441\">Salmon Caesar Salad</a>, <a href=\"https://spoonacular.com/recipes/salmon-caesar-salad-521731\">Salmon Caesar Salad</a>, and <a href=\"https://spoonacular.com/recipes/salmon-caesar-salad-1189903\">Salmon Caesar Salad</a>.",
  prepTime: 45,
  cuisineDescription: 'American',
  servings: 2,
  recipeInstructions: [
    {
      number: 1,
      step: "Heat up a skillet/frying pan and sir the Salmon in the coconut oil/olive oil (don't forget to add the salt and paprika to it) until very lightly browned on each side (i like my salmon slightly undercooked-its up to you if you want it more done). Top with freshly squeezed lemon juice and let it sit in the frying pan for about 1 minute. In a Large bowl, mix the romaine lettuce with the Caesar salad dressing and dump it out into a large plate, top off with Asiago/Parmesan cheese and you can also sprinkle the toasted almonds on now."
    },
    {
      number: 2,
      step: "Place the Salmon (sliced) on top. You can sprinkle it with some more fresh lemon juice:) and black pepper!"
    }
  ],
  tags: [
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
      value: true
    },
    {
      name: 'dairyFree',
      value: false
    },
    {
      name: 'sustainable',
      value: false
    }
  ],
  reviewDocument: {
    type: []
  },
  youtubeLinks: [
    'https://www.youtube.com/watch?v=XwVkUK-CvhY','https://www.youtube.com/watch?v=P1KbdHVNUq0','https://www.youtube.com/watch?v=a4Z2x0sPq3A&t=207s'
  ]
})

const recipe6 = new Recipe({
  country: 'Mexico',
  recipeName: 'Shrimp Tacos with Avocado, Grapefruit, and Creamy Cilantro Sauce',
  recipeAuthor: 'Erich Boenzli',
  ingredients: [
    {
      id: 1,
      name: "shrimp",
      amount: 18.0,
      unit: "medium"
    },
    {
      id: 2,
      name: "splash of hot sauce",
      amount: 6.0,
      unit: "servings"
    },
    {
      id: 3,
      name: "chili powder",
      amount: 0.25,
      unit: "tsps"
    },
    {
      id: 4,
      name: "salt & pepper",
      amount: 6.0,
      unit: "servings"
    },
    {
      id: 5,
      name: "olive oil",
      amount: 1.0,
      unit: "Tbsp"
    },
    {
      id: 6,
      name: "tomato",
      amount: 1.0,
      unit: "medium"
    },
    {
      id: 7,
      name: "red whole segments from pink",
      amount: 6.0,
      unit: "servings"
    },
    {
      id: 8,
      name: "avocado",
      amount: 1.0,
      unit: ""
    },
    {
      id: 9,
      name: "fresh lime juice",
      amount: 1.0,
      unit: "Tbsp"
    },
    {
      id: 10,
      name: "fresh cilantro",
      amount: 0.25,
      unit: "c"
    },
    {
      id: 11,
      name: "salt",
      amount: 0.25,
      unit: "tsps"
    },
    {
      id: 12,
      name: "sour cream",
      amount: 0.5,
      unit: "c"
    },
    {
      id: 13,
      name: "tacos",
      amount: 1.0,
      unit: "serving"
    }
  ],
  nutrition: {
    nutrients: [
      {
        name: "Calories",
        amount: 207.15,
        unit: "kcal",
        percentOfDailyNeeds: 10.36
      },
      {
        name: "Fat",
        amount: 11.41,
        unit: "g",
        percentOfDailyNeeds: 17.55
      },
      {
        name: "Saturated Fat",
        amount: 3.04,
        unit: "g",
        percentOfDailyNeeds: 19.02
      },
      {
        name: "Carbohydrates",
        amount: 21.31,
        unit: "g",
        percentOfDailyNeeds: 7.1
      },
      {
        name: "Net Carbohydrates",
        amount: 16.29,
        unit: "g",
        percentOfDailyNeeds: 5.92
      },
      {
        name: "Sugar",
        amount: 12.08,
        unit: "g",
        percentOfDailyNeeds: 13.42
      },
      {
        name: "Cholesterol",
        amount: 59.61,
        unit: "mg",
        percentOfDailyNeeds: 19.87
      },
      {
        name: "Sodium",
        amount: 340.59,
        unit: "mg",
        percentOfDailyNeeds: 14.81
      },
      {
        name: "Protein",
        amount: 8.57,
        unit: "g",
        percentOfDailyNeeds: 17.15
      },
      {
        name: "Vitamin C",
        amount: 55.38,
        unit: "mg",
        percentOfDailyNeeds: 67.13
      },
      {
        name: "Vitamin A",
        amount: 2189.84,
        unit: "IU",
        percentOfDailyNeeds: 43.8
      },
      {
        name: "Fiber",
        amount: 5.02,
        unit: "g",
        percentOfDailyNeeds: 20.09
      },
      {
        name: "Potassium",
        amount: 530.94,
        unit: "mg",
        percentOfDailyNeeds: 15.17
      },
      {
        name: "Folate",
        amount: 52.08,
        unit: "µg",
        percentOfDailyNeeds: 13.02
      },
      {
        name: "Phosphorus",
        amount: 129.85,
        unit: "mg",
        percentOfDailyNeeds: 12.98
      },
      {
        name: "Copper",
        amount: 0.25,
        unit: "mg",
        percentOfDailyNeeds: 12.47
      },
      {
        name: "Vitamin K",
        amount: 12.55,
        unit: "µg",
        percentOfDailyNeeds: 11.95
      },
      {
        name: "Vitamin E",
        amount: 1.48,
        unit: "mg",
        percentOfDailyNeeds: 9.86
      },
      {
        name: "Vitamin B6",
        amount: 0.2,
        unit: "mg",
        percentOfDailyNeeds: 9.82
      },
      {
        name: "Magnesium",
        amount: 38.8,
        unit: "mg",
        percentOfDailyNeeds: 9.7
      },
      {
        name: "Vitamin B5",
        amount: 0.96,
        unit: "mg",
        percentOfDailyNeeds: 9.59
      },
      {
        name: "Calcium",
        amount: 79.89,
        unit: "mg",
        percentOfDailyNeeds: 7.99
      },
      {
        name: "Vitamin B2",
        amount: 0.13,
        unit: "mg",
        percentOfDailyNeeds: 7.65
      },
      {
        name: "Vitamin B1",
        amount: 0.1,
        unit: "mg",
        percentOfDailyNeeds: 6.76
      },
      {
        name: "Manganese",
        amount: 0.12,
        unit: "mg",
        percentOfDailyNeeds: 6.14
      },
      {
        name: "Zinc",
        amount: 0.83,
        unit: "mg",
        percentOfDailyNeeds: 5.56
      },
      {
        name: "Vitamin B3",
        amount: 1.06,
        unit: "mg",
        percentOfDailyNeeds: 5.3
      },
      {
        name: "Iron",
        amount: 0.58,
        unit: "mg",
        percentOfDailyNeeds: 3.23
      },
      {
        name: "Selenium",
        amount: 1.03,
        unit: "µg",
        percentOfDailyNeeds: 1.47
      }
    ]
  },
  recipeDescription: "Forget going out to eat or ordering takeout every time you crave Mexican food. Try making Shrimp Tacos with Avocado, Grapefruit, and Creamy Cilantro Sauce at home. For <b>$1.6 per serving</b>, this recipe <b>covers 12%</b> of your daily requirements of vitamins and minerals. This recipe serves 6. Watching your figure? This gluten free and pescatarian recipe has <b>207 calories</b>, <b>9g of protein</b>, and <b>11g of fat</b> per serving. If you have salt & pepper, lime juice, tomato, and a few other ingredients on hand, you can make it. From preparation to the plate, this recipe takes approximately <b>30 minutes</b>. It is brought to you by spoonacular user <a href=\"/profile/maplewoodroad\">maplewoodroad</a>. It works well as a rather inexpensive hor d'oeuvre. Similar recipes include <a href=\"https://spoonacular.com/recipes/chicken-and-avocado-tacos-with-creamy-cilantro-sauce-999823\">Chicken and Avocado Tacos with Creamy Cilantro Sauce</a>, <a href=\"https://spoonacular.com/recipes/spicy-shrimp-tacos-with-avocado-salsa-sour-cream-cilantro-sauce-1300327\">Spicy Shrimp Tacos with Avocado Salsa & Sour Cream Cilantro Sauce</a>, and <a href=\"https://spoonacular.com/recipes/spicy-shrimp-tacos-with-avocado-salsa-sour-cream-cilantro-sauce-721265\">Spicy Shrimp Tacos with Avocado Salsa & Sour Cream Cilantro Sauce</a>.",
  prepTime: 30,
  cuisineDescription: 'Mexican',
  servings: 6,
  recipeInstructions: [
    {
      number: 1,
      step: "Mix chili, hot sauce, salt, &amp; pepper together.&nbsp; Toss with shrimp and let marinate 10 minutes."
    },
    {
      number: 2,
      step: "Heat olive oil over medium-high heat in Lodge cast iron pan and cook shrimp until pink and curled, about 5 minutes.&nbsp; Set aside."
    },
    {
      number: 3,
      step: "Combine all salsa ingredients in a bowl, stir, and set aside."
    },
    {
      number: 4,
      step: "Stir together sour cream and cilantro in a bowl, and set aside."
    },
    {
      number: 5,
      step: "Assemble taco or tortilla by first putting in the salsa, add 3 shrimp to each, top with sour cream-cilantro sauce, and then add a generous squeeze of lime juice over the top."
    }
  ],
  tags: [
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
      value: true
    },
    {
      name: 'dairyFree',
      value: false
    },
    {
      name: 'sustainable',
      value: false
    }
  ],
  reviewDocument: {
    type: []
  },
  youtubeLinks: [
    'https://www.youtube.com/watch?v=qjYP5-ZutEk','https://www.youtube.com/watch?v=d-l5NB-bRXg','https://www.youtube.com/watch?v=d-l5NB-bRXg'
  ]
})

const recipe7 = new Recipe({
  country: 'Mexico',
  recipeName: 'Guacamole',
  recipeAuthor: 'Euclydes Antonio dos Santos Filho',
  ingredients: [
    {
      id: 1,
      name: "haas avocados",
      amount: 2.0,
      unit: "large"
    },
    {
      id: 2,
      name: "onion",
      amount: 2.0,
      unit: "Tbsps"
    },
    {
      id: 3,
      name: "jalapeno pepper",
      amount: 1.0,
      unit: "Tbsp"
    },
    {
      id: 4,
      name: "fresh cilantro",
      amount: 0.25,
      unit: "cup"
    },
    {
      id: 5,
      name: "salt",
      amount: 0.5,
      unit: "tsps"
    },
    {
      id: 6,
      name: "black pepper",
      amount: 0.125,
      unit: "tsps"
    },
    {
      id: 7,
      name: "fresh lime juice",
      amount: 1.0,
      unit: "Tbsp"
    },
    {
      id: 8,
      name: "fresh basil",
      amount: 1.0,
      unit: "tsp"
    },
    {
      id: 9,
      name: "fresh oregano",
      amount: 1.0,
      unit: "tsp"
    }
  ],
  nutrition: {
    nutrients: [
      {
        name: "Calories",
        amount: 166.54,
        unit: "kcal",
        percentOfDailyNeeds: 8.33
      },
      {
        name: "Fat",
        amount: 14.82,
        unit: "g",
        percentOfDailyNeeds: 22.81
      },
      {
        name: "Saturated Fat",
        amount: 2.16,
        unit: "g",
        percentOfDailyNeeds: 13.47
      },
      {
        name: "Carbohydrates",
        amount: 10.02,
        unit: "g",
        percentOfDailyNeeds: 3.34
      },
      {
        name: "Net Carbohydrates",
        amount: 2.83,
        unit: "g",
        percentOfDailyNeeds: 1.03
      },
      {
        name: "Sugar",
        amount: 1.12,
        unit: "g",
        percentOfDailyNeeds: 1.25
      },
      {
        name: "Cholesterol",
        amount: 0.0,
        unit: "mg",
        percentOfDailyNeeds: 0.0
      },
      {
        name: "Sodium",
        amount: 298.71,
        unit: "mg",
        percentOfDailyNeeds: 12.99
      },
      {
        name: "Protein",
        amount: 2.19,
        unit: "g",
        percentOfDailyNeeds: 4.38
      },
      {
        name: "Fiber",
        amount: 7.2,
        unit: "g",
        percentOfDailyNeeds: 28.78
      },
      {
        name: "Vitamin K",
        amount: 28.26,
        unit: "µg",
        percentOfDailyNeeds: 26.91
      },
      {
        name: "Folate",
        amount: 85.58,
        unit: "µg",
        percentOfDailyNeeds: 21.39
      },
      {
        name: "Vitamin C",
        amount: 16.28,
        unit: "mg",
        percentOfDailyNeeds: 19.73
      },
      {
        name: "Vitamin E",
        amount: 2.34,
        unit: "mg",
        percentOfDailyNeeds: 15.61
      },
      {
        name: "Potassium",
        amount: 520.89,
        unit: "mg",
        percentOfDailyNeeds: 14.88
      },
      {
        name: "Vitamin B6",
        amount: 0.29,
        unit: "mg",
        percentOfDailyNeeds: 14.42
      },
      {
        name: "Vitamin B5",
        amount: 1.43,
        unit: "mg",
        percentOfDailyNeeds: 14.3
      },
      {
        name: "Copper",
        amount: 0.2,
        unit: "mg",
        percentOfDailyNeeds: 10.11
      },
      {
        name: "Manganese",
        amount: 0.19,
        unit: "mg",
        percentOfDailyNeeds: 9.58
      },
      {
        name: "Vitamin B3",
        amount: 1.84,
        unit: "mg",
        percentOfDailyNeeds: 9.22
      },
      {
        name: "Vitamin B2",
        amount: 0.14,
        unit: "mg",
        percentOfDailyNeeds: 8.21
      },
      {
        name: "Magnesium",
        amount: 32.25,
        unit: "mg",
        percentOfDailyNeeds: 8.06
      },
      {
        name: "Phosphorus",
        amount: 56.54,
        unit: "mg",
        percentOfDailyNeeds: 5.65
      },
      {
        name: "Vitamin A",
        amount: 266.78,
        unit: "IU",
        percentOfDailyNeeds: 5.34
      },
      {
        name: "Vitamin B1",
        amount: 0.07,
        unit: "mg",
        percentOfDailyNeeds: 4.91
      },
      {
        name: "Zinc",
        amount: 0.68,
        unit: "mg",
        percentOfDailyNeeds: 4.53
      },
      {
        name: "Iron",
        amount: 0.79,
        unit: "mg",
        percentOfDailyNeeds: 4.37
      },
      {
        name: "Calcium",
        amount: 23.34,
        unit: "mg",
        percentOfDailyNeeds: 2.33
      }
  ]
  },
  recipeDescription: "Guacamole takes roughly <b>45 minutes</b> from beginning to end. Watching your figure? This gluten free, dairy free, paleolithic, and lacto ovo vegetarian recipe has <b>167 calories</b>, <b>2g of protein</b>, and <b>15g of fat</b> per serving. This recipe serves 4. For <b>87 cents per serving</b>, this recipe <b>covers 9%</b> of your daily requirements of vitamins and minerals. 20 people found this recipe to be flavorful and satisfying. A mixture of haas avocados, salt, cilantro, and a handful of other ingredients are all it takes to make this recipe so tasty. It works well as a very affordable hor d'oeuvre. A couple people really liked this Mexican dish. It is brought to you by Foodista. With a spoonacular <b>score of 81%</b>, this dish is amazing. If you like this recipe, you might also like recipes such as <a href=\"https://spoonacular.com/recipes/guacamole-how-to-make-guacamole-mexican-guacamole-486710\">guacamole , how to make guacamole | mexican guacamole</a>, <a href=\"https://spoonacular.com/recipes/fried-green-plantain-with-guacamole-and-shrimp-tostada-de-pltano-con-camarones-y-guacamole-1213029\">Fried Green Plantain with Guacamole and Shrimp (Tostada de Plátano con Camarones y Guacamole)</a>, and <a href=\"https://spoonacular.com/recipes/fried-green-plantain-with-guacamole-and-shrimp-tostada-de-pltano-con-camarones-y-guacamole-226105\">Fried Green Plantain with Guacamole and Shrimp (Tostada de Plátano con Camarones y Guacamole)</a>.",
  prepTime: 45,
  cuisineDescription: 'Mexican',
  servings: 4,
  recipeInstructions: [
    {
      number: 1,
      step: "Cut the avocados in half lengthwise. Drive chef's knife into large pit and twist to remove.  Scoop the avocado out from the skin into a bowl."
    },
    {
      number: 2,
      step: "Mash the avocado with a fork, add in onion and cilantro, oregano and basil.."
    },
    {
      number: 3,
      step: "Mix to incorporate."
    },
    {
      number: 4,
      step: "Season to taste with salt, pepper and lime juice."
    },
    {
      number: 5,
      step: "Serve immediately or chill.  If you are not going to eat the guacamole immediately, store in refrigerator with plastic film wrap pressed onto the guacamole."
    }
  ],
  tags: [
    {
      name: 'vegetarian',
      value: true
    },
    {
      name: 'vegan',
      value: true
    },
    {
      name: 'glutenFree',
      value: true
    },
    {
      name: 'dairyFree',
      value: true
    },
    {
      name: 'sustainable',
      value: false
    }
  ],
  reviewDocument: {
    type: []
  },
  youtubeLinks: [
    'https://www.youtube.com/watch?v=23tGra9KBa0','https://www.youtube.com/watch?v=HoToW7cYna0&t=1s','https://www.youtube.com/watch?v=tHVzFLtvbGQ'
  ]
})

const recipe8 = new Recipe({
  country: 'Mexico',
  recipeName: 'Beef, Poblano & Cheese Tamales',
  recipeAuthor: 'raichement',
  ingredients: [
    {
      id: 1,
      name: 'dried corn husks',
      amount: 20.0,
      unit: ''
    },
    {
      id: 2,
      name: 'dried california chili pods',
      amount: 6.0,
      unit: ''
    },
    {
      id: 3,
      name: 'ground beef',
      amount: 1.5,
      unit: 'cups'
    },
    {
      id: 4,
      name: 'shredded mozzarella cheese',
      amount: 1.0,
      unit: 'cup'
    },
    {
      id: 5,
      name: 'diced poblano pepper',
      amount: 0.5,
      unit: ''
    },
    {
      id: 6,
      name: 'garlic',
      amount: 4.0,
      unit: 'cloves'
    },
    {
      id: 7,
      name: 'olive oil',
      amount: 2.0,
      unit: 'Tbsps'
    },
    {
      id: 8,
      name: 'goya seasoning',
      amount: 1.5,
      unit: 'packets'
    },
    {
      id: 9,
      name: 'salt',
      amount: 2.0,
      unit: 'tsps'
    },
    {
      id: 10,
      name: 'chili powder',
      amount: 1.0,
      unit: 'tsp'
    }
  ],
  nutrition: {
    nutrients: [
      {
        name: "Calories",
        amount: 372.47,
        unit: "kcal",
        percentOfDailyNeeds: 18.62
      },
      {
        name: "Fat",
        amount: 30.3,
        unit: "g",
        percentOfDailyNeeds: 46.62
      },
      {
        name: "Saturated Fat",
        amount: 11.16,
        unit: "g",
        percentOfDailyNeeds: 69.74
      },
      {
        name: "Carbohydrates",
        amount: 3.33,
        unit: "g",
        percentOfDailyNeeds: 1.11
      },
      {
        name: "Net Carbohydrates",
        amount: 2.46,
        unit: "g",
        percentOfDailyNeeds: 0.9
      },
      {
        name: "Sugar",
        amount: 1.03,
        unit: "g",
        percentOfDailyNeeds: 1.15
      },
      {
        name: "Cholesterol",
        amount: 82.03,
        unit: "mg",
        percentOfDailyNeeds: 27.34
      },
      {
        name: "Sodium",
        amount: 1404.9,
        unit: "mg",
        percentOfDailyNeeds: 61.08
      },
      {
        name: "Protein",
        amount: 21.19,
        unit: "g",
        percentOfDailyNeeds: 42.39
      },
      {
        name: "Vitamin B12",
        amount: 2.44,
        unit: "µg",
        percentOfDailyNeeds: 40.73
      },
      {
        name: "Zinc",
        amount: 4.44,
        unit: "mg",
        percentOfDailyNeeds: 29.61
      },
      {
        name: "Selenium",
        amount: 17.99,
        unit: "µg",
        percentOfDailyNeeds: 25.7
      },
      {
        name: "Phosphorus",
        amount: 243.25,
        unit: "mg",
        percentOfDailyNeeds: 24.32
      },
      {
        name: "Vitamin B3",
        amount: 3.83,
        unit: "mg",
        percentOfDailyNeeds: 19.14
      },
      {
        name: "Vitamin B6",
        amount: 0.37,
        unit: "mg",
        percentOfDailyNeeds: 18.69
      },
      {
        name: "Calcium",
        amount: 172.27,
        unit: "mg",
        percentOfDailyNeeds: 17.23
      },
      {
        name: "Vitamin C",
        amount: 13.14,
        unit: "mg",
        percentOfDailyNeeds: 15.93
      },
      {
        name: "Vitamin B2",
        amount: 0.23,
        unit: "mg",
        percentOfDailyNeeds: 13.37
      },
      {
        name: "Iron",
        amount: 2.18,
        unit: "mg",
        percentOfDailyNeeds: 12.11
      },
      {
        name: "Vitamin A",
        amount: 597.88,
        unit: "IU",
        percentOfDailyNeeds: 11.96
      },
      {
        name: "Vitamin E",
        amount: 1.75,
        unit: "mg",
        percentOfDailyNeeds: 11.65
      },
      {
        name: 'Vitamin K',
        amount: 11.2,
        unit: 'µg',
        percentOfDailyNeeds: 10.67
      },
      {
        name: 'Potassium',
        amount: 315.96,
        unit: 'mg',
        percentOfDailyNeeds: 9.03
      },
      {
        name: 'Magnesium',
        amount: 24.63,
        unit: 'mg',
        percentOfDailyNeeds: 6.16
      },
      {
        name: 'Manganese',
        amount: 0.12,
        unit: 'mg',
        percentOfDailyNeeds: 6.08
      },
      {
        name: 'Vitamin B5',
        amount: 0.51,
        unit: 'mg',
        percentOfDailyNeeds: 5.11
      },
      {
        name: 'Copper',
        amount: 0.08,
        unit: 'mg',
        percentOfDailyNeeds: 4.17
      },
      {
        name: 'Vitamin B1',
        amount: 0.06,
        unit: 'mg',
        percentOfDailyNeeds: 4.11
      },
      {
        name: 'Fiber',
        amount: 0.86,
        unit: 'g',
        percentOfDailyNeeds: 3.46
      },
      {
        name: 'Folate',
        amount: 10.86,
        unit: 'µg',
        percentOfDailyNeeds: 2.71
      },
      {
        name: 'Vitamin D',
        amount: 0.2,
        unit: 'µg',
        percentOfDailyNeeds: 1.31
      }
    ]
  },
  recipeDescription: "You can never have too many Mexican recipes, so give Beef, Poblano & Cheese Tamales a try. This recipe serves 4 and costs $1.49 per serving. Watching your figure? This gluten free and ketogenic recipe has <b>372 calories</b>, <b>21g of protein</b>, and <b>30g of fat</b> per serving. It works well as a rather inexpensive main course. This recipe from Foodista has 5 fans. Head to the store and pick up poblano pepper, california chili pods, ground beef, and a few other things to make it today. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 53%</b>, which is good. <a href=\"https://spoonacular.com/recipes/beef-poblano-cheese-tamales-1443305\">Beef, Poblano & Cheese Tamales</a>, <a href=\"https://spoonacular.com/recipes/roasted-poblano-and-cheese-tamales-611384\">Roasted Poblano and Cheese Tamales</a>, and <a href=\"https://spoonacular.com/recipes/roasted-poblano-tamales-276566\">Roasted Poblano Tamales</a> are very similar to this recipe.",
  prepTime: 45,
  cuisineDescription: 'Mexican',
  servings: 4,
  recipeInstructions: [
    {
      number: 1,
      step: "In a large bowl, allow corn husks to soak in hot water. In a large saucepan, bring 4 cups of water to a boil."
    },
    {
      number: 2,
      step: "Remove any string-like particles from the chili pods."
    },
    {
      number: 3,
      step: "Add them to the boiling water along with half of a packet of Goya seasoning. Cover and let boil for about 20 minutes."
    },
    {
      number: 4,
      step: "Afterwards, place chili pods with 2 cups of the stock in a blender to coalesce."
    },
    {
      number: 5,
      step: "Drain the saucepan of the remaining stock and place back on the stove top. Return the heat to medium, and add olive oil once the remaining stock evaporates."
    },
    {
      number: 6,
      step: "Add onion and beef, and immediately begin to break apart the beef."
    },
    {
      number: 7,
      step: "Add 1 packet of Goya seasoning and chili powder, and allow to cook for 5 minutes."
    },
    {
      number: 8,
      step: "Add the chili sauce and cook an additional 5 minutes."
    },
    {
      number: 9,
      step: "Add garlic and 2 teaspoon salt. I added the poblano pepper at this point, but I should have added it with the beef and onion."
    },
    {
      number: 10,
      step: "Reduce heat to medium-low, and cook for one hour. For the last twenty minutes, partially cover the pan in order to slightly reduce. Most of the liquid should be reduced and thickened.",
    },
    {
      number: 11,
      step: "In a large bowl, add instant corn masa mix, water, baking powder, salt, and olive oil to create corn masa mix. The mixture should be spongy."
    },
    {
      number: 12,
      step: "Whats surprisingly tricky is assembling the tamales. The best technique Ive found is to thinly spread the tamale masa mix starting from the right-hand side of the corn husks, and leaving about 2 inches on the left-hand side of the husk. When rolling the tamale together, take the right-hand side and fold it onto the rest of the corn husk covered with tamale masa mix. The 1-2 inches left over should roll perfectly over the actual tamale. Dont overstuff the tamales! Id say 2 tablespoon of meat mixture and just a sparse amount of cheese."
    },
    {
      number: 13,
      step: "O cook, you should have a double boiler. If you dont, like me, then use a metal colander and place it in a large pot."
    },
    {
      number: 14,
      step: "Place the tamales in the colander (or double boiler) where they are not squished, nor are they loose enough to unravel themselves. While doing this, boil 2 cups of water in the pot or what equates to 1 inch in height of the water."
    },
    {
      number: 15,
      step: "Once water comes to a boil, reduce heat and add the tamales."
    },
    {
      number: 16,
      step: "Place a towel between the colander and lid, and cook for 30 minutes."
    }
  ],
  tags: [
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
      value: true
    },
    {
      name: 'dairyFree',
      value: false
    },
    {
      name: 'sustainable',
      value: false
    }
  ],
  reviewDocument: {
    type: []
  },
  youtubeLinks: [
    'https://www.youtube.com/watch?v=r5VTKIR_Tik', 'https://www.youtube.com/watch?v=54-ztsdId9g','https://www.youtube.com/watch?v=4xiwU4mNDwY&t=11s'
  ]
})

const recipe9 = new Recipe({
  country: 'Italy',
  recipeName: 'Osso Buco',
  recipeAuthor: 'Frank Fariello',
  ingredients: [
    {
      id: 1,
      name: 'veal shanks',
      amount: 6.0,
      unit: ''
    },
    {
      id: 2,
      name: 'parsley',
      amount: 4.0,
      unit: 'Tbsps'
    },
    {
      id: 3,
      name: 'rind lemon',
      amount: 1.0,
      unit: 'of'
    },
    {
      id: 4,
      name: 'flour',
      amount: 6.0,
      unit: 'servings'
    },
    {
      id: 5,
      name: 'bell pepper',
      amount: 6.0,
      unit: 'servings'
    },
    {
      id: 6,
      name: 'olive oil',
      amount: 4.0,
      unit: 'Tbsps'
    },
    {
      id: 7,
      name: 'garlic',
      amount: 3.0,
      unit: 'cloves'
    },
    {
      id: 8,
      name: 'onion',
      amount: 1.0,
      unit: ''
    },
    {
      id: 9,
      name: 'chicken stock',
      amount: 1.0,
      unit: 'cup'
    },
    {
      id: 10,
      name: 'dry white wine',
      amount: 1.0,
      unit: 'cup'
    },
    {
      id: 11,
      name: 'tomato sauce',
      amount: 4.0,
      unit: 'Tbsps'
    }
  ],
  nutrition: {
    nutrients: [
      {
        "name": "Calories",
        "amount": 444.76,
        "unit": "kcal",
        "percentOfDailyNeeds": 22.24
      },
      {
        "name": "Fat",
        "amount": 18.05,
        "unit": "g",
        "percentOfDailyNeeds": 27.77
      },
      {
        "name": "Saturated Fat",
        "amount": 3.88,
        "unit": "g",
        "percentOfDailyNeeds": 24.28
      },
      {
        "name": "Carbohydrates",
        "amount": 15.6,
        "unit": "g",
        "percentOfDailyNeeds": 5.2
      },
      {
        "name": "Net Carbohydrates",
        "amount": 13.24,
        "unit": "g",
        "percentOfDailyNeeds": 4.81
      },
      {
        "name": "Sugar",
        "amount": 5.34,
        "unit": "g",
        "percentOfDailyNeeds": 5.94
      },
      {
        "name": "Cholesterol",
        "amount": 170.7,
        "unit": "mg",
        "percentOfDailyNeeds": 56.9
      },
      {
        "name": "Sodium",
        "amount": 302.25,
        "unit": "mg",
        "percentOfDailyNeeds": 13.14
      },
      {
        "name": "Alcohol",
        "amount": 4.12,
        "unit": "g",
        "percentOfDailyNeeds": 22.89
      },
      {
        "name": "Protein",
        "amount": 46.33,
        "unit": "g",
        "percentOfDailyNeeds": 92.65
      },
      {
        "name": "Vitamin C",
        "amount": 101.73,
        "unit": "mg",
        "percentOfDailyNeeds": 123.3
      },
      {
        "name": "Vitamin B3",
        "amount": 18.87,
        "unit": "mg",
        "percentOfDailyNeeds": 94.34
      },
      {
        "name": "Vitamin B6",
        "amount": 1.31,
        "unit": "mg",
        "percentOfDailyNeeds": 65.26
      },
      {
        "name": "Zinc",
        "amount": 9.46,
        "unit": "mg",
        "percentOfDailyNeeds": 63.06
      },
      {
        "name": "Vitamin A",
        "amount": 2602.32,
        "unit": "IU",
        "percentOfDailyNeeds": 52.05
      },
      {
        "name": "Vitamin B12",
        "amount": 3.07,
        "unit": "µg",
        "percentOfDailyNeeds": 51.23
      },
      {
        "name": "Vitamin K",
        "amount": 53.64,
        "unit": "µg",
        "percentOfDailyNeeds": 51.09
      },
      {
        "name": "Phosphorus",
        "amount": 489.01,
        "unit": "mg",
        "percentOfDailyNeeds": 48.9
      },
      {
        "name": "Vitamin B2",
        "amount": 0.76,
        "unit": "mg",
        "percentOfDailyNeeds": 44.82
      },
      {
        "name": "Vitamin B5",
        "amount": 3.28,
        "unit": "mg",
        "percentOfDailyNeeds": 32.78
      },
      {
        "name": "Selenium",
        "amount": 21.76,
        "unit": "µg",
        "percentOfDailyNeeds": 31.08
      },
      {
        "name": "Potassium",
        "amount": 1022.88,
        "unit": "mg",
        "percentOfDailyNeeds": 29.23
      },
      {
        "name": "Folate",
        "amount": 92.8,
        "unit": "µg",
        "percentOfDailyNeeds": 23.2
      },
      {
        "name": "Vitamin B1",
        "amount": 0.31,
        "unit": "mg",
        "percentOfDailyNeeds": 20.66
      },
      {
        "name": "Vitamin E",
        "amount": 2.71,
        "unit": "mg",
        "percentOfDailyNeeds": 18.05
      },
      {
        "name": "Magnesium",
        "amount": 68.72,
        "unit": "mg",
        "percentOfDailyNeeds": 17.18
      },
      {
        "name": "Iron",
        "amount": 2.96,
        "unit": "mg",
        "percentOfDailyNeeds": 16.43
      },
      {
        "name": "Manganese",
        "amount": 0.27,
        "unit": "mg",
        "percentOfDailyNeeds": 13.27
      },
      {
        "name": "Copper",
        "amount": 0.24,
        "unit": "mg",
        "percentOfDailyNeeds": 12.06
      },
      {
        "name": "Fiber",
        "amount": 2.37,
        "unit": "g",
        "percentOfDailyNeeds": 9.46
      },
      {
        "name": "Calcium",
        "amount": 68.67,
        "unit": "mg",
        "percentOfDailyNeeds": 6.87
      }
    ]
  },
  recipeDescription: "Originating from Milan, Italy, osso buco is a dish of braised veal shank, often served with gremolata, a lemon-parsley garnish. In English it is most commonly spelled osso bucco in Italian ossobuco or osso buco",
  prepTime: 45,
  cuisineDescription: 'Italian',
  servings: 6,
  recipeInstructions: [
    {
      number: 1,
      step: 'Dredge veal in seasoned flour and saute in olive oil until lightly browned on all sides.'
    },
    {
      number: 2,
      step: 'Add garlic and onion.'
    },
    {
      number: 3,
      step: 'Pour boiling stock, white wine and tomato sauce over meat. Cover pan and simmer 1 1/2 hours or until meat is tender.'
    },
    {
      number: 4,
      step: 'Add parsley and grated lemon rind.'
    },
    {
      number: 5,
      step: 'Serve over saffron rice.'
    }
  ],
  tags: [
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
      value: true
    },
    {
      name: 'sustainable',
      value: false
    }
  ],
  reviewDocument: {
    type: []
  },
  youtubeLinks: [
    'https://www.youtube.com/watch?v=zmj3U1VvYdU','https://www.youtube.com/watch?v=f1ydTuESo7g','https://www.youtube.com/watch?v=Sqog5ILMAV0'
  ]
})

const recipe10 = new Recipe({
  country: 'Italy',
  recipeName: 'Lasagna Silvia',
  recipeAuthor: 'KC Quaretti-Lee',
  ingredients: [
    {
      id: 1,
      name: 'sweet onion',
      amount: 1.0,
      unit: 'medium'
    },
    {
      id: 2,
      name: 'virgin olive oil',
      amount: 4.0,
      unit: 'Tbsps'
    },
    {
      id: 3,
      name: 'portabella mushroom',
      amount: 8.0,
      unit: 'ounces'
    },
    {
      id: 4,
      name: 'butter',
      amount: 2.0,
      unit: 'Tbsps'
    },
    {
      id: 5,
      name: 'frozen spinach',
      amount: 16.0,
      unit: 'ounces'
    },
    {
      id: 6,
      name: 'zucchini',
      amount: 3.0,
      unit: ''
    },
    {
      id: 7,
      name: 'ricotta cheese',
      amount: 30.0,
      unit: 'ounces'
    },
    {
      id: 8,
      name: 'eggs',
      amount: 2.0,
      unit: ''
    },
    {
      id: 9,
      name: 'mozzarella cheese',
      amount: 2.0,
      unit: 'cups'
    },
    {
      id: 10,
      name: 'parmesan',
      amount: 0.5,
      unit: 'cup'
    },
    {
      id: 11,
      name: 'pacific natural foods creamy tomato soup',
      amount: 1.0,
      unit: 'quart'
    }
  ],
  nutrition: {
    nutrients: [
      {
        name: "Calories",
        amount: 522.67,
        unit: "kcal",
        percentOfDailyNeeds: 26.13
      },
      {
        name: "Fat",
        amount: 33.77,
        unit: "g",
        percentOfDailyNeeds: 51.95
      },
      {
        name: "Saturated Fat",
        amount: 16.87,
        unit: "g",
        percentOfDailyNeeds: 105.46
      },
      {
        name: "Carbohydrates",
        amount: 31.03,
        unit: "g",
        percentOfDailyNeeds: 10.34
      },
      {
        name: "Net Carbohydrates",
        amount: 26.6,
        unit: "g",
        percentOfDailyNeeds: 9.67
      },
      {
        name: "Sugar",
        amount: 15.4,
        unit: "g",
        percentOfDailyNeeds: 17.11
      },
      {
        name: "Cholesterol",
        amount: 129.03,
        unit: "mg",
        percentOfDailyNeeds: 43.01
      },
      {
        name: "Sodium",
        amount: 902.92,
        unit: "mg",
        percentOfDailyNeeds: 39.26
      },
      {
        name: "Protein",
        amount: 27.43,
        unit: "g",
        percentOfDailyNeeds: 54.86
      },
      {
        name: "Vitamin K",
        amount: 224.4,
        unit: "µg",
        percentOfDailyNeeds: 213.72
      },
      {
        name: "Vitamin A",
        amount: 8117.7,
        unit: "IU",
        percentOfDailyNeeds: 162.35
      },
      {
        name: "Calcium",
        amount: 551.94,
        unit: "mg",
        percentOfDailyNeeds: 55.19
      },
      {
        name: "Selenium",
        amount: 37.57,
        unit: "µg",
        percentOfDailyNeeds: 53.67
      },
      {
        name: "Phosphorus",
        amount: 467.26,
        unit: "mg",
        percentOfDailyNeeds: 46.73
      },
      {
        name: "Vitamin C",
        amount: 33.52,
        unit: "mg",
        percentOfDailyNeeds: 40.63
      },
      {
        name: "Potassium",
        amount: 1360.0,
        unit: "mg",
        percentOfDailyNeeds: 38.86
      },
      {
        name: "Manganese",
        amount: 0.76,
        unit: "mg",
        percentOfDailyNeeds: 38.13
      },
      {
        name: "Vitamin B2",
        amount: 0.62,
        unit: "mg",
        percentOfDailyNeeds: 36.34
      },
      {
        name: "Folate",
        amount: 137.74,
        unit: "µg",
        percentOfDailyNeeds: 34.43
      },
      {
        name: "Vitamin B6",
        amount: 0.5,
        unit: "mg",
        percentOfDailyNeeds: 24.77
      },
      {
        name: "Magnesium",
        amount: 97.47,
        unit: "mg",
        percentOfDailyNeeds: 24.37
      }
    ]
  },
  recipeDescription: "The recipe Lasagna Silvian is ready <b>in around 45 minutes</b> and is definitely an amazing <b>gluten free</b> option for lovers of Mediterranean food. This recipe serves 8 and costs $2.64 per serving. One serving contains <b>523 calories</b>, <b>27g of protein</b>, and <b>34g of fat</b>. 1 person were impressed by this recipe. A mixture of zucchini, pacific natural foods creamy tomato soup, portabella mushroom, and a handful of other ingredients are all it takes to make this recipe so delicious. Only a few people really liked this main course. It is brought to you by Foodista. Overall, this recipe earns a <b>solid spoonacular score of 66%</b>. Try <a href=\"https://spoonacular.com/recipes/silvias-focaccia-pugliese-553085\">Silvia’s Focaccia Pugliese</a>, <a href=\"https://spoonacular.com/recipes/vegetable-lasagna-with-homemade-lasagna-sheets-without-pasta-machine-627913\">Vegetable Lasagna With Homemade Lasagna Sheets (Without Pasta Machine)</a>, and <a href=\"https://spoonacular.com/recipes/lasagna-de-pollo-con-championes-chicken-and-mushroom-lasagna-226408\">Lasagna de Pollo con Champiñones (Chicken and Mushroom Lasagna)</a> for similar recipes.",
  prepTime: 45,
  cuisineDescription: 'Italian',
  servings: 8,
  recipeInstructions: [
    {
      number: 1,
      step: "Preheat oven to 350F. In a large stock pot  prepare 12 Lasagna noodles per package instructions (make sure to salt the water). When done, leave noodles in the water and remove the stock pot from the heat.In a stainless steel skillet, melt the butter and then add the chopped onion. Allow to cook over medium heat for 3-4 minutes."
    },
    {
      number: 2,
      step: "Add the minced garlic cloves and the chorizo. Cook over medium heat until the chorizo is cooked through."
    },
    {
      number: 3,
      step: "Add the can of diced tomatoes and the jar of pasta sauce (I used Ragu Chunky"
    },
    {
      number: 4,
      step: "Sauteed Onion and Garlic Flavor Pasta Sauce."
    },
    {
      number: 5,
      step: "Remove the lasagna noodles from the water using tongs and lay out flat."
    },
    {
      number: 6,
      step: "Spread 1 heaping tsp of ricotta cheese on each noodle. On top of the ricotta spread some of the Serrano ham."
    },
    {
      number: 7,
      step: "Roll up the lasagna noodles and place in an oven proof baking dish.Top the rolled noodles with the sauce. Gently lift up each noodle roll and allow some of the sauce to run beneath."
    },
    {
      number: 8,
      step: "Sprinkle the shredded mozzarella over the top and place the baking dish on top of a baking sheet."
    },
    {
      number: 9,
      step: "Bake for 45 minutes until the sauce is bubbly and the cheese is browned slightly. Just before removing from the oven, set the broiler to finish the cheese if necessary."
    },
    {
      number: 10,
      step: "Garnish with cilantro and Mexican crumbling cheese if desired."
    }
  ],
  tags: [
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
      value: true
    },
    {
      name: 'dairyFree',
      value: false
    },
    {
      name: 'sustainable',
      value: false
    }
  ],
  reviewDocument: {
    type: []
  },
  youtubeLinks: [
    'https://www.youtube.com/watch?v=zVqunZUuwSs','https://www.youtube.com/watch?v=BFrkRFgHLVk','https://www.youtube.com/watch?v=fVDsTP-pTXs'
  ]
})



Recipe.collection.drop()
Recipe.create(recipe1, recipe2, recipe3, recipe4, recipe5, recipe6, recipe7, recipe8, recipe9, recipe10)
  .then(() => {
    console.log('Recipe seed inserted successfully');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
    console.log('insert seeds ran')
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
