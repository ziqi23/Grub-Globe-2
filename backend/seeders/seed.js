const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const Recipe = require('../models/Recipe');
const recipeData = require('./recipeData/recipeData.json');
const Review = require("../models/Review.js");
const Favorite = require('../models/Favorite');
const { ObjectId } = require('mongoose').Types;

const users = [];

users.push(
  new User ({
    _id: "164000000000000000000000",
    username: 'demo-user',
    firstName: 'Iam',
    lastName: 'Demo',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('starwars', 10),
    completedRecipe: [
      {
        recipeId: "026000000000000000000000"
      },
      {
        recipeId: "036000000000000000000000"
      },
      {
        recipeId: "113000000000000000000000"
      },
      {
        recipeId: "114000000000000000000000"
      },
      {
        recipeId: "119000000000000000000000"
      },
      {
        recipeId: "123000000000000000000000"
      },
      {
        recipeId: "057000000000000000000000"
      },
      {
        recipeId: "138000000000000000000000"
      },
      {
        recipeId: "140000000000000000000000"
      },
      {
        recipeId: "071000000000000000000000"
      },
      {
        recipeId: "073000000000000000000000"
      },
      {
        recipeId: "062000000000000000000000"
      },
      {
        recipeId: "065000000000000000000000"
      }]
    }),

  new User({
    _id: "010000000000000000000000",
    username: 'julia-child',
    firstName: 'Julia',
    lastName: 'Child',
    email: 'julia.child@gmail.com',
    hashedPassword: bcrypt.hashSync('masteringtheartoffrenchcooking', 10),
    completedRecipe: [
      {
        recipeId: "026000000000000000000000"
      },
      {
        recipeId: "156000000000000000000000"
      },
      {
        recipeId: "119000000000000000000000"
      }
    ]
  }),

  new User({
    _id: "020000000000000000000000",
    username: 'anthony-bourdain',
    firstName: 'Anthony',
    lastName: 'Bourdain',
    email: 'anthony.bourdain@yahoo.com',
    hashedPassword: bcrypt.hashSync('kitchenconfidential', 10),
    completedRecipe: [{
      recipeId: "027000000000000000000000"
    }, {
      recipeId: "157000000000000000000000"
    },{
      recipeId: "113000000000000000000000"
    }]
    }),

    new User({
    _id: "030000000000000000000000",
    username: 'guy-fieri',
    firstName: 'Guy',
    lastName: 'Fieri',
    email: 'guy.fieri@hotmail.com',
    hashedPassword: bcrypt.hashSync('flavortown', 10),
    completedRecipe: [{
      recipeId: "027000000000000000000000"
    }, {
      recipeId: "157000000000000000000000"
    },{
      recipeId: "114000000000000000000000"
    }]
    }),

    new User({
    _id: "040000000000000000000000",
    username: 'bear-grylls',
    firstName: 'Bear',
    lastName: 'Grylls',
    email: 'bear.grylls@outlook.com',
    hashedPassword: bcrypt.hashSync('manvswild', 10),
    completedRecipe: [{
      recipeId: "029000000000000000000000"
    }, {
      recipeId: "036000000000000000000000"
    },{
      recipeId: "120000000000000000000000"
    }]
    }),

    new User({
    _id: "050000000000000000000000",
    username: 'ina-garten',
    firstName: 'Ina',
    lastName: 'Garten',
    email: 'ina.garten@aol.com',
    hashedPassword: bcrypt.hashSync('barefootcontessa', 10),
    completedRecipe: [{
      recipeId: "029000000000000000000000"
    }, {
      recipeId: "156000000000000000000000"
    }, {
      recipeId: "122000000000000000000000"
    }]
    }),

    new User ({
    _id: "060000000000000000000000",
    username: 'gourmetguru',
    firstName: 'Gordon',
    lastName: 'Ramsay',
    email: 'gordon@hellskitchen.com',
    hashedPassword: bcrypt.hashSync('beefwellington', 10),
    completedRecipe: [{
      recipeId: "028000000000000000000000"
    }, {
      recipeId: "037000000000000000000000"
    }, {
      recipeId: "120000000000000000000000"
    }]
    }),

    new User ({
    _id: "070000000000000000000000",
    username: 'asianwokstar',
    firstName: 'Ming',
    lastName: 'Tsai',
    email: 'ming@ming.com',
    hashedPassword: bcrypt.hashSync('blueginger', 10),
    completedRecipe: [{
      recipeId: "075000000000000000000000"
    }, {
      recipeId: "155000000000000000000000"
    }, {
      recipeId: "121000000000000000000000"
    }]
    }),

    new User ({
    _id: "080000000000000000000000",
    username: 'theglobetrotter',
    firstName: 'Andrew',
    lastName: 'Zimmern',
    email: 'azimmern@travelchannel.com',
    hashedPassword: bcrypt.hashSync('bizarrefoods', 10),
    completedRecipe: [{
      recipeId: "076000000000000000000000"
    }, {
      recipeId: "037000000000000000000000"
    }, {
      recipeId: "121000000000000000000000"
    }]
    }),

    new User({
    _id: "090000000000000000000000",
    username: 'masterbaker',
    firstName: 'Mary',
    lastName: 'Berry',
    email: 'mary.berry@gmail.com',
    hashedPassword: bcrypt.hashSync('greatbritishbakeoff', 10),
    completedRecipe: [{
      recipeId: "077000000000000000000000"
    }, {
      recipeId: "038000000000000000000000"
    }, {
      recipeId: "122000000000000000000000"
    }]
    }),

    new User({
    _id: "100000000000000000000000",
    username: 'kitchengoddess',
    firstName: 'Nigella',
    lastName: 'Lawson',
    email: 'nigella.lawson@gmail.com',
    hashedPassword: bcrypt.hashSync('simplynigella', 10),
    completedRecipe: [{
      recipeId: "078000000000000000000000"
    }, {
      recipeId: "155000000000000000000000"
    }, {
      recipeId: "135000000000000000000000"
    }]
    }),

    new User ({
    _id: "110000000000000000000000",
    username: 'danielhumm',
    firstName: 'Daniel',
    lastName: 'Humm',
    email: 'daniel.humm@elevenmadisonpark.com',
    hashedPassword: bcrypt.hashSync('worldsbestrestaurant', 10),
    completedRecipe: [{
      recipeId: "075000000000000000000000"
    }, {
      recipeId: "153000000000000000000000"
    }, {
      recipeId: "074000000000000000000000"
    }]
    }),

    new User ({
    _id: "120000000000000000000000",
    username: 'alainducasse',
    firstName: 'Alain',
    lastName: 'Ducasse',
    email: 'alain.ducasse@frenchcuisine.com',
    hashedPassword: bcrypt.hashSync('cordonbleu', 10),
    completedRecipe: [{
      recipeId: "076000000000000000000000"
    }, {
      recipeId: "038000000000000000000000"
    }, {
      recipeId: "057000000000000000000000"
    }, {
      recipeId: "103000000000000000000000"
    }]
    }),

    new User ({
    _id: "130000000000000000000000",
    username: 'indianajones',
    firstName: 'Indiana',
    lastName: 'Jones',
    email: 'indy@gmail.com',
    hashedPassword: bcrypt.hashSync('adventure', 10),
    completedRecipe: [{
      recipeId: "077000000000000000000000"
    }, {
      recipeId: "118000000000000000000000"
    }, {
      recipeId: "058000000000000000000000"
    }]
    }),

    new User ({
    _id: "140000000000000000000000",
    username: 'laracroft',
    firstName: 'Lara',
    lastName: 'Croft',
    email: 'lara@gmail.com',
    hashedPassword: bcrypt.hashSync('tombraider', 10),
    completedRecipe: [{
      recipeId: "078000000000000000000000"
    }, {
      recipeId: "153000000000000000000000"
    }, {
      recipeId: "058000000000000000000000"
    }]
    }),

    new User ({
    _id: "150000000000000000000000",
    username: 'jacksparrow',
    firstName: 'Jack',
    lastName: 'Sparrow',
    email: 'jack@gmail.com',
    hashedPassword: bcrypt.hashSync('pirates', 10),
    completedRecipe: [{
      recipeId: "081000000000000000000000"
    }, {
      recipeId: "039000000000000000000000"
    }, {
      recipeId: "059000000000000000000000"
    }]
    }),

    new User ({
    _id: "160000000000000000000000",
    username: 'rambo',
    firstName: 'John',
    lastName: 'Rambo',
    email: 'rambo@gmail.com',
    hashedPassword: bcrypt.hashSync('survival', 10),
    completedRecipe: [{
      recipeId: "082000000000000000000000"
    }, {
      recipeId: "039000000000000000000000"
    }, {
      recipeId: "059000000000000000000000"
    }]
    }),

    new User ({
    _id: "170000000000000000000000",
    username: 'odysseus',
    firstName: 'Odysseus',
    lastName: 'The Great',
    email: 'odysseus@gmail.com',
    hashedPassword: bcrypt.hashSync('troy', 10),
    completedRecipe: [{
      recipeId: "096000000000000000000000"
    }, {
      recipeId: "112000000000000000000000"
    }, {
      recipeId: "060000000000000000000000"
    }]
    }),

    new User({
    _id: "180000000000000000000000",
    username: 'amundsen',
    firstName: 'Roald',
    lastName: 'Amundsen',
    email: 'roald.amundsen@gmail.com',
    hashedPassword: bcrypt.hashSync('southpole', 10),
    completedRecipe: [{
      recipeId: "097000000000000000000000"
    }, {
      recipeId: "112000000000000000000000"
    }, {
      recipeId: "091000000000000000000000"
    }]
    }),

    new User({
    _id: "190000000000000000000000",
    username: 'edmundhillary',
    firstName: 'Edmund',
    lastName: 'Hillary',
    email: 'edmund.hillary@gmail.com',
    hashedPassword: bcrypt.hashSync('everest', 10),
    completedRecipe: [{
      recipeId: "081000000000000000000000"
    }, {
      recipeId: "111000000000000000000000"
    }, {
      recipeId: "089000000000000000000000"
    }]
    }),

    new User({
    _id: "200000000000000000000000",
    username: 'ernestshackleton',
    firstName: 'Ernest',
    lastName: 'Shackleton',
    email: 'ernest.shackleton@gmail.com',
    hashedPassword: bcrypt.hashSync('endurance', 10),
    completedRecipe: [{
      recipeId: "082000000000000000000000"
    }, {
      recipeId: "111000000000000000000000"
    }, {
      recipeId: "060000000000000000000000"
    }]
    }),

    new User ({
    _id: "210000000000000000000000",
    username: 'captainnemo',
    firstName: 'Captain',
    lastName: 'Nemo',
    email: 'nemo@nautilus.com',
    hashedPassword: bcrypt.hashSync('underwater', 10),
    completedRecipe: [{
      recipeId: "096000000000000000000000"
    }, {
      recipeId: "094000000000000000000000"
    }, {
      recipeId: "056000000000000000000000"
    }, {
      recipeId: "124000000000000000000000"
    }]
    }),

    new User ({
    _id: "220000000000000000000000",
    username: 'cooper',
    firstName: 'Joseph',
    lastName: 'Cooper',
    email: 'joe.cooper@nasa.gov',
    hashedPassword: bcrypt.hashSync('interstellar', 10),
    completedRecipe: [{
      recipeId: "097000000000000000000000"
    }, {
      recipeId: "094000000000000000000000"
    }, {
      recipeId: "100000000000000000000000"
    }, {
      recipeId: "107000000000000000000000"
    }]
    }),

    new User({
    _id: "230000000000000000000000",
    username: 'jamieoliver',
    firstName: 'Jamie',
    lastName: 'Oliver',
    completedRecipe: [{
      recipeId: "095000000000000000000000"
    }, {
      recipeId: "040000000000000000000000"
    }, {
      recipeId: "086000000000000000000000"
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
      hashedPassword: bcrypt.hashSync('spago', 10),
      completedRecipe: [{
        recipeId: "115000000000000000000000"
      }, {
        recipeId: "040000000000000000000000"
      }, {
        recipeId: "056000000000000000000000"
      }]
    }),

    new User({
      _id: "250000000000000000000000",
      username: 'alicewaters',
      firstName: 'Alice',
      lastName: 'Waters',
      email: 'alicewaters@gmail.com',
      hashedPassword: bcrypt.hashSync('slowfood', 10),
      completedRecipe: [{
        recipeId: "116000000000000000000000"
      }, {
        recipeId: "117000000000000000000000"
      }, {
        recipeId: "123000000000000000000000"
      }]
    })
)

const reviews = [];
reviews.push(
  new Review({
    user: "164000000000000000000000",
    recipe: "026000000000000000000000",
    title: "Delicious and Satisfying",
    text: "I absolutely loved the poutine! The combination of crispy fries, rich gravy, and melty cheese curds was a perfect comfort food. The flavors were amazing, and the portion size was generous. I would definitely make it again and highly recommend it to others. A 5-star experience!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),


  new Review({
    user: "010000000000000000000000",
    recipe: "026000000000000000000000",
    title: "Classic Canadian Dish",
    text: "Poutine is a classic Canadian dish, and this recipe nailed it! The fries were perfectly crispy, the gravy was savory and flavorful, and the cheese curds added a delightful gooeyness. It brought back fond memories of enjoying poutine from food trucks during my visits to Canada. I would definitely make it again and highly recommend it to anyone looking for a delicious and comforting meal. 5 stars!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),

  new Review({
    user: "020000000000000000000000",
    recipe: "027000000000000000000000",
    title: "Sweet and Irresistible",
    text: "These butter tarts were absolutely delicious! The buttery and flaky pastry paired perfectly with the sweet and gooey filling. Each bite was a delightful explosion of flavors. I couldn't resist having seconds! I would definitely make them again and highly recommend them to anyone with a sweet tooth. A perfect 5-star treat!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),

  new Review({
    user: "030000000000000000000000",
    recipe: "027000000000000000000000",
    title: "Canadian Delicacy",
    text: "Butter tarts are a true Canadian delicacy, and this recipe captured the authentic taste perfectly. The pastry was buttery and flaky, and the filling had just the right balance of sweetness. It brought back nostalgic memories of enjoying butter tarts during family gatherings. I would definitely make them again and highly recommend them to anyone looking to indulge in a classic Canadian treat. 5 stars!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),


  new Review({
    user: "040000000000000000000000",
    recipe: "029000000000000000000000",
    title: "Decadent and Delicious",
    text: "These Nanaimo bars were absolutely divine! The layers of chocolate, creamy custard, and coconut crust created a heavenly combination of flavors and textures. Each bite was a delightful treat. I couldn't get enough of them! I would definitely make them again and highly recommend them to anyone with a sweet tooth. A perfect 5-star dessert!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),


  new Review({
    user: "050000000000000000000000",
    recipe: "029000000000000000000000",
    title: "Delicious and Decadent",
    text: "These Nanaimo Bars are absolutely heavenly! The layers of chocolate, custard, and coconut are perfectly balanced and rich in flavor. I couldn't stop at just one piece. Highly recommended!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),

  new Review({
    user: "060000000000000000000000",
    recipe: "028000000000000000000000",
    title: "Disappointing Outcome",
    text: "I tried making the Timbits recipe, but unfortunately, they didn't turn out as expected. The dough was too dense, resulting in heavy and chewy Timbits. I followed the instructions carefully, but something went wrong. I wouldn't make these again and cannot recommend this recipe.",
    wouldMakeAgain: false,
    wouldRecommend: false,
    starRating: 1
  }),


  new Review({
    user: "070000000000000000000000",
    recipe: "075000000000000000000000",
    title: "Delicious Twist on a Classic",
    text: "I tried the Tex-Mex Burger recipe, and it was absolutely amazing! The combination of flavors from the spices, toppings, and sauces was outstanding. The burger patty was juicy and perfectly cooked. I highly recommend this recipe and will definitely make it again!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),


  new Review({
    user: "080000000000000000000000",
    recipe: "076000000000000000000000",
    title: "Disappointing Result",
    text: "I was excited to try the Spicy Fried Chicken with Sweet Chili Sauce, but the end result didn't meet my expectations. The chicken didn't turn out as crispy as I had hoped, and the sweet chili sauce lacked the desired kick. It was just an average dish for me, and I don't think I'll be making it again.",
    wouldMakeAgain: false,
    wouldRecommend: false,
    starRating: 2
  }),

  new Review({
    user: "090000000000000000000000",
    recipe: "077000000000000000000000",
    title: "A New Favorite Dessert",
    text: "I made the Apple Pie Bars, and they were a hit with my family! The crust was buttery and flaky, and the apple filling was perfectly spiced. It tasted just like a slice of apple pie but in a convenient bar form. I would highly recommend this recipe and will definitely make it again!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 4
  }),


  new Review({
    user: "100000000000000000000000",
    recipe: "078000000000000000000000",
    title: "Healthy Twist on a Classic Comfort Food",
    text: "I tried the Light Clam Chowder recipe, and it was a pleasant surprise! The use of lighter ingredients didn't compromise the flavor. The chowder was creamy, packed with clams, and had a lovely balance of seasonings. It's a healthier version of a classic comfort food that I would make again.",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 4
  }),

  new Review({
    user: "110000000000000000000000",
    recipe: "075000000000000000000000",
    title: "A Flavor Explosion",
    text: "I recently tried the Tex-Mex Burger recipe, and it blew me away! The combination of spices and toppings created a burst of flavors in every bite. The patty was juicy and perfectly seasoned. This recipe is a definite winner, and I can't wait to make it again!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),


  new Review({
    user: "120000000000000000000000",
    recipe: "076000000000000000000000",
    title: "Spice Lovers' Delight",
    text: "If you're a fan of spicy food, the Spicy Fried Chicken with Sweet Chili Sauce is a must-try! The chicken had a crispy coating with a spicy kick, and the sweet chili sauce added a perfect balance of sweetness. I highly recommend this recipe to spice enthusiasts. I'll definitely make it again!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 4
  }),

  new Review({
    user: "130000000000000000000000",
    recipe: "077000000000000000000000",
    title: "A Fall Favorite",
    text: "The Apple Pie Bars recipe is a fantastic dessert option, especially during the fall season. The bars had a buttery crust and a delicious apple filling with a hint of cinnamon. They were a hit with my family and friends. I'll be making these again and again!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),


  new Review({
    user: "140000000000000000000000",
    recipe: "078000000000000000000000",
    title: "Satisfying and Light",
    text: "The Light Clam Chowder recipe is a guilt-free version of a classic favorite. The chowder had a creamy texture and was loaded with tender clams. It was a satisfying and comforting meal without feeling heavy. I would highly recommend this recipe for anyone looking for a healthier option.",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 4
  }),


  new Review({
    user: "150000000000000000000000",
    recipe: "081000000000000000000000",
    title: "Perfect Party Dip",
    text: "I recently made the guacamole recipe, and it turned out to be the perfect party dip! The avocados were perfectly ripe and creamy, and the combination of lime juice, cilantro, and spices added a burst of flavor. It was a hit among my friends, and I'll definitely make it again!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),

  new Review({
    user: "160000000000000000000000",
    recipe: "082000000000000000000000",
    title: "Delicious and Filling",
    text: "The Beef, Poblano & Cheese Tamales recipe is a winner! The combination of tender beef, flavorful poblano peppers, and melted cheese was absolutely delicious. The masa dough was perfectly steamed, and the tamales were filling and satisfying. I highly recommend trying this recipe!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 4
  }),

  new Review({
    user: "170000000000000000000000",
    recipe: "096000000000000000000000",
    title: "A Tangy Delight",
    text: "The Enchiladas Verdes (Green Enchiladas) recipe is a tangy delight! The green sauce had a perfect balance of tanginess and spice, and it coated the tender chicken and tortillas beautifully. It was a flavorful and satisfying meal that my family loved. I would definitely make it again!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),

  new Review({
    user: "180000000000000000000000",
    recipe: "097000000000000000000000",
    title: "Refreshing and Authentic",
    text: "The Classic Margarita recipe is a refreshing and authentic drink option. The combination of tequila, lime juice, and a touch of sweetness was perfectly balanced. It was a fantastic way to unwind and enjoy a taste of Mexico. I would highly recommend this recipe to margarita lovers!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),

  new Review({
    user: "190000000000000000000000",
    recipe: "081000000000000000000000",
    title: "Disappointing Texture",
    text: "I recently tried the guacamole recipe, but I was disappointed with the texture. The avocados seemed overripe and mushy, resulting in a sloppy consistency. The flavor was decent, but the texture was a letdown. I wouldn't make this again.",
    wouldMakeAgain: false,
    wouldRecommend: false,
    starRating: 2
  }),

  new Review({
    user: "200000000000000000000000",
    recipe: "082000000000000000000000",
    title: "Too Spicy for My Taste",
    text: "I tried the Beef, Poblano & Cheese Tamales recipe, and unfortunately, it was too spicy for my taste. The poblano peppers overwhelmed the dish, making it difficult to appreciate the other flavors. If you enjoy spicy food, this might be for you, but it wasn't my favorite.",
    wouldMakeAgain: false,
    wouldRecommend: true,
    starRating: 3
  }),


  new Review({
    user: "210000000000000000000000",
    recipe: "096000000000000000000000",
    title: "Lacked Depth of Flavor",
    text: "The Enchiladas Verdes (Green Enchiladas) recipe lacked the depth of flavor I was expecting. The green sauce was tangy, but it didn't have the complexity I associate with traditional enchiladas. It was decent, but I've had better versions of this dish. I might explore other recipes next time.",
    wouldMakeAgain: true,
    wouldRecommend: false,
    starRating: 3
  }),


  new Review({
    user: "220000000000000000000000",
    recipe: "097000000000000000000000",
    title: "Too Sweet for My Palate",
    text: "The Classic Margarita recipe was too sweet for my palate. The balance between sweetness and acidity was off, and it overshadowed the tequila flavor. If you prefer sweeter cocktails, you might enjoy this, but I prefer a more traditional, less sweet margarita.",
    wouldMakeAgain: false,
    wouldRecommend: false,
    starRating: 2
  }),


  new Review({
    user: "230000000000000000000000",
    recipe: "095000000000000000000000",
    title: "Authentic and Delicious",
    text: "I tried the Chinese Fried Rice recipe, and it turned out to be absolutely delicious! The flavors were authentic, and the rice had the perfect texture. It was a hit with my family, and I'll definitely be making it again. Highly recommended!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),


  new Review({
    user: "240000000000000000000000",
    recipe: "115000000000000000000000",
    title: "A Flavorful Bowl of Comfort",
    text: "The Hot and Sour Noodle Soup recipe was a flavorful bowl of comfort. The combination of spicy and tangy flavors worked perfectly, and the noodles had a nice chew to them. It was just what I needed on a cold day. I'll be making this again for sure!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 4
  }),


  new Review({
    user: "250000000000000000000000",
    recipe: "116000000000000000000000",
    title: "Tasty, But Lacked Fluffiness",
    text: "I recently made the Barbecue Pork Buns - Dim Sum recipe, and while they were tasty, I felt that the buns lacked the desired fluffiness. The filling was flavorful, but the texture of the buns was a bit dense. I might experiment with different dough recipes next time.",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 3
  }),


  new Review({
    user: "250000000000000000000000",
    recipe: "117000000000000000000000",
    title: "Satisfyingly Spicy",
    text: "The Kung Pao Chicken With Peanuts recipe was satisfyingly spicy and packed with flavor. The combination of tender chicken, crunchy peanuts, and the signature sauce was delightful. It had just the right amount of heat. I'll be adding this to my regular rotation.",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 4
  }),

  new Review({
    user: "130000000000000000000000",
    recipe: "118000000000000000000000",
    title: "Unique and Delicious",
    text: "The Coconut Chow Mein Butterscotch Cookies were a unique twist on classic cookies. The combination of coconut, chow mein noodles, and butterscotch was surprisingly delicious. The cookies had a perfect balance of sweet and salty flavors. I would highly recommend trying this recipe!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),


  new Review({
    user: "140000000000000000000000",
    recipe: "153000000000000000000000",
    title: "A Hearty and Flavorful Soup",
    text: "I made the Russian Borscht recipe, and it turned out to be a hearty and flavorful soup. The combination of beets, vegetables, and beef created a rich and comforting dish. It was perfect for a chilly evening. I'll definitely be making this again!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 4
  }),

  new Review({
    user: "110000000000000000000000",
    recipe: "153000000000000000000000",
    title: "Not My Cup of Tea",
    text: "I gave the Russian Borscht recipe a try, but it wasn't to my liking. The flavors didn't resonate with my taste preferences, and the beet flavor was too dominant for my taste. However, if you enjoy beets, you might find it more appealing. It just wasn't for me.",
    wouldMakeAgain: false,
    wouldRecommend: false,
    starRating: 2
  }),


  new Review({
    user: "100000000000000000000000",
    recipe: "155000000000000000000000",
    title: "An Elegant Delight",
    text: "The Sterling Cooper Blini with Caviar recipe was an elegant delight. The blini were perfectly cooked and had a nice fluffy texture. The caviar added a touch of luxury, and it all came together beautifully. I would highly recommend serving this at special occasions.",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),


  new Review({
    user: "070000000000000000000000",
    recipe: "155000000000000000000000",
    title: "Disappointing Outcome",
    text: "I had high expectations for the Sterling Cooper Blini with Caviar recipe, but unfortunately, it didn't live up to them. The blini turned out dense and lacked the desired lightness. The caviar was the saving grace, but overall, it fell short of my expectations.",
    wouldMakeAgain: false,
    wouldRecommend: false,
    starRating: 3
  }),


  new Review({
    user: "050000000000000000000000",
    recipe: "156000000000000000000000",
    title: "A Delicate and Elegant Soup",
    text: "The Aromatic Broth of Asparagus with Caviar recipe was a delicate and elegant soup. The asparagus flavors were vibrant, and the caviar added a luxurious touch. It was a perfect starter for a special dinner. I would highly recommend giving this recipe a try.",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),

  new Review({
    user: "010000000000000000000000",
    recipe: "156000000000000000000000",
    title: "Lacked Depth of Flavor",
    text: "I tried the Aromatic Broth of Asparagus with Caviar recipe, but I found it to be lacking in depth of flavor. The asparagus taste was somewhat muted, and the broth didn't have the desired complexity. It was a decent soup, but it didn't wow me.",
    wouldMakeAgain: true,
    wouldRecommend: false,
    starRating: 3
  }),

  new Review({
    user: "020000000000000000000000",
    recipe: "157000000000000000000000",
    title: "A Decadent Dessert",
    text: "The Napoleon - A Creamy Puff Pastry Cake recipe was a decadent dessert that pleased everyone. The layers of flaky puff pastry and creamy filling were divine. It required some effort, but the end result was worth it. It's a showstopper dessert for special occasions.",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),

  new Review({
    user: "030000000000000000000000",
    recipe: "157000000000000000000000",
    title: "Time-Consuming and Challenging",
    text: "I attempted the Napoleon - A Creamy Puff Pastry Cake recipe, but it was quite time-consuming and challenging. The puff pastry layers didn't turn out as light and airy as I had hoped, and assembling the cake was tricky. It tasted fine, but the process was labor-intensive.",
    wouldMakeAgain: false,
    wouldRecommend: false,
    starRating: 3
  }),


  new Review({
    user: "164000000000000000000000",
    recipe: "036000000000000000000000",
    title: "A Classic Australian Breakfast",
    text: "Australian Vegemite on Toast is a classic breakfast in Australia, and this recipe captures the authentic taste. The combination of Vegemite's savory and salty flavors with the buttery toast is delicious. It's a quick and easy breakfast option that I would highly recommend.",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 4
  }),

  new Review({
    user: "040000000000000000000000",
    recipe: "036000000000000000000000",
    title: "Not My Cup of Tea",
    text: "I tried the Australian Vegemite on Toast recipe, but it didn't appeal to my taste buds. The strong and salty taste of Vegemite was overpowering, and I couldn't develop a liking for it. However, if you enjoy savory and salty flavors, you might appreciate this dish.",
    wouldMakeAgain: false,
    wouldRecommend: false,
    starRating: 2
  }),


  new Review({
    user: "060000000000000000000000",
    recipe: "037000000000000000000000",
    title: "A Light and Delicate Dessert",
    text: "The Pavlova recipe resulted in a light and delicate dessert that was absolutely delightful. The meringue had a crisp exterior and a soft, marshmallow-like interior. Topped with fresh fruits and whipped cream, it was a heavenly treat. I would definitely make this again.",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),

  new Review({
    user: "080000000000000000000000",
    recipe: "037000000000000000000000",
    title: "Disappointing Outcome",
    text: "I followed the Pavlova recipe, but it didn't turn out as expected. The meringue didn't achieve the desired texture, and it collapsed after baking. The flavors were okay, but the overall presentation and texture were lacking. It was a disappointment for me.",
    wouldMakeAgain: false,
    wouldRecommend: false,
    starRating: 3
  }),


  new Review({
    user: "090000000000000000000000",
    recipe: "038000000000000000000000",
    title: "A Tasty and Filling Savory Pie",
    text: "The Meat Pie recipe was a tasty and filling savory pie. The combination of flavorful meat and a flaky pastry crust was satisfying. It's a great option for a comforting meal. I would make this again and recommend it to fellow meat pie lovers.",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 4
  }),

  new Review({
    user: "120000000000000000000000",
    recipe: "038000000000000000000000",
    title: "Could Use More Seasoning",
    text: "I tried the Meat Pie recipe, but I found it lacking in seasoning. The meat filling needed more flavor, and the overall taste was a bit bland. With some adjustments to the seasoning, it has the potential to be a great dish. It didn't meet my expectations.",
    wouldMakeAgain: true,
    wouldRecommend: false,
    starRating: 3
  }),


  new Review({
    user: "150000000000000000000000",
    recipe:
  "039000000000000000000000",
  title: "Delicious Australian Treat",
  text: "Lamingtons are a delicious Australian treat, and this recipe captures their essence perfectly. The sponge cake coated in chocolate and coconut flakes is a delightful combination. It's a great option for dessert or a sweet snack. I would highly recommend making these.",
  wouldMakeAgain: true,
  wouldRecommend: true,
  starRating: 5
  }),

  new Review({
  user: "160000000000000000000000",
  recipe: "039000000000000000000000",
  title: "Texture Wasn't Right",
  text: "I attempted the Lamingtons recipe, but the texture of the sponge cake didn't turn out as expected. It was slightly dry and didn't have the light and fluffy texture I was hoping for. The chocolate coating and coconut flakes were good, but the cake disappointed me.",
  wouldMakeAgain: false,
  wouldRecommend: false,
  starRating: 2
  }),


  new Review({
    user: "240000000000000000000000",
    recipe: "040000000000000000000000",
    title: "Classic Australian Biscuits",
    text: "ANZAC Biscuits are classic Australian biscuits, and this recipe does justice to their tradition. The crunchy texture and the flavors of oats, coconut, and golden syrup are delightful. They are a perfect accompaniment to a cup of tea. I would make these again.",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 4
  }),

  new Review({
    user: "230000000000000000000000",
    recipe: "040000000000000000000000",
    title: "Too Sweet for My Taste",
    text: "I tried the ANZAC Biscuits recipe, but I found them to be too sweet for my taste. The golden syrup added a strong sweetness that overpowered the other flavors. If you have a sweet tooth, you might enjoy these biscuits, but they were not to my liking.",
    wouldMakeAgain: false,
    wouldRecommend: false,
    starRating: 3
  }),

  new Review({
    user: "220000000000000000000000",
    recipe: "094000000000000000000000",
    title: "Comforting and Delicious",
    text: "The Miso Soup With Thin Noodles recipe was absolutely comforting and delicious. The combination of umami miso broth and delicate thin noodles created a satisfying bowl of soup. It's a perfect dish for a cozy meal or when you need something warm and nourishing. Highly recommended!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),

  new Review({
    user: "210000000000000000000000",
    recipe: "094000000000000000000000",
    title: "Lacked Flavor",
    text: "I tried the Miso Soup With Thin Noodles recipe, but I found it lacking in flavor. The miso broth was too mild, and the noodles didn't absorb much of the flavor. It needed more seasoning and depth to make it more enjoyable. Unfortunately, it didn't meet my expectations.",
    wouldMakeAgain: false,
    wouldRecommend: false,
    starRating: 3
  }),


  new Review({
    user: "200000000000000000000000",
    recipe: "111000000000000000000000",
    title: "Delightful Homemade Sushi",
    text: "The sushi recipe provided a delightful experience of making sushi at home. The combination of fresh fish, sushi rice, and nori sheets was spot on. It's a fun and interactive dish to prepare, and the result was delicious sushi rolls. I would definitely make this again.",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 4
  }),


  new Review({
    user: "190000000000000000000000",
    recipe: "111000000000000000000000",
    title: "Difficult to Master",
    text: "I attempted the sushi recipe, but it was quite challenging to master the technique. Rolling the sushi rolls neatly and evenly was not easy, and the flavors didn't come together as expected. It requires practice and skill to achieve restaurant-quality sushi. It was a bit disappointing for me.",
    wouldMakeAgain: false,
    wouldRecommend: false,
    starRating: 2
  }),


  new Review({
    user: "180000000000000000000000",
    recipe: "112000000000000000000000",
    title: "Flavorful and Satisfying Ramen",
    text: "The Ground Pork Ramen recipe resulted in a flavorful and satisfying bowl of ramen. The combination of tender ground pork, rich broth, and noodles created a comforting and delicious meal. It's a great option for ramen lovers. I would make this again and recommend it.",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),

  new Review({
    user: "170000000000000000000000",
    recipe: "112000000000000000000000",
    title: "Needed More Seasoning",
    text: "I followed the Ground Pork Ramen recipe, but I found the flavors to be a bit bland. It lacked the depth and complexity that I usually expect from a good bowl of ramen. It needed more seasoning and flavor enhancements to elevate the dish. It didn't fully satisfy my ramen cravings.",
    wouldMakeAgain: true,
    wouldRecommend: false,
    starRating: 3
  }),


  new Review({
    user: "164000000000000000000000",
    recipe: "113000000000000000000000",
    title: "Exquisite Fusion Dish",
    text: "The Oriental Filet Mignon on Crisp Kataifi with Shrimp Tempura recipe created an exquisite fusion dish. The combination of tender filet mignon, crispy kataifi, and flavorful shrimp tempura was a delightful experience. It's a dish that impresses both visually and in taste. Highly recommended!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),

  new Review({
    user: "020000000000000000000000",
    recipe: "113000000000000000000000",
    title: "Complex Preparation",
    text: "The Oriental Filet Mignon on Crisp Kataifi with Shrimp Tempura recipe required a complex preparation process. The kataifi wrapping and the cooking technique needed precise execution. It was a time-consuming and challenging dish to make. The result was good, but the effort involved might discourage some home cooks.",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 4
  }),


  new Review({
    user: "164000000000000000000000",
    recipe: "114000000000000000000000",
    title: "Refreshing and Unique Popsicles",
    text: "The Matcha Yuzu Mango Popsicles with Mint recipe offered a refreshing and unique flavor combination. The blend of matcha, yuzu, mango, and fresh mint created a cool and vibrant popsicle. It's a great treat for hot summer days. I would definitely make these again.",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 4
  }),

  new Review({
    user: "030000000000000000000000",
    recipe: "114000000000000000000000",
    title: "Mint Overpowered the Flavors",
    text: "I tried the Matcha Yuzu Mango Popsicles with Mint recipe, but I found that the mint flavor overpowered the other flavors. It became the dominant taste, and I couldn't fully enjoy the matcha, yuzu, and mango combination. I would prefer a more balanced flavor profile.",
    wouldMakeAgain: false,
    wouldRecommend: false,
    starRating: 2
  }),

  new Review({
    user: "164000000000000000000000",
    recipe: "119000000000000000000000",
    title: "Authentic and Flavorful",
    text: "India's Butter Chicken recipe delivered an authentic and flavorful experience. The combination of tender chicken in a rich and creamy tomato-based sauce was absolutely delicious. The spices and herbs added depth and complexity to the dish. I would highly recommend it!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),

  new Review({
    user: "010000000000000000000000",
    recipe: "119000000000000000000000",
    title: "Lacked Spiciness",
    text: "I tried India's Butter Chicken recipe, but I found it to be lacking in spiciness. The flavors were good, but it didn't have the desired level of heat that I enjoy in butter chicken. It needed a bit more kick to make it more exciting. However, it was still a decent dish overall.",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 4
  }),

  new Review({
    user: "040000000000000000000000",
    recipe: "120000000000000000000000",
    title: "Delicious and Fragrant",
    text: "The Veggie Biryani recipe resulted in a delicious and fragrant rice dish. The blend of spices, vegetables, and fragrant basmati rice created a flavorful and aromatic biryani. It's a satisfying vegetarian option that I would definitely make again.",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 4
  }),

  new Review({
    user: "060000000000000000000000",
    recipe: "120000000000000000000000",
    title: "Rice Was Overcooked",
    text: "I followed the Veggie Biryani recipe, but unfortunately, the rice turned out overcooked and mushy. The flavors were good, but the texture was disappointing. It required more precise instructions for cooking the rice to avoid this issue. I might try it again with adjustments.",
    wouldMakeAgain: true,
    wouldRecommend: false,
    starRating: 3
  }),

  new Review({
    user: "070000000000000000000000",
    recipe: "121000000000000000000000",
    title: "Crispy and Flavorful",
    text: "The Baked Samosas recipe yielded crispy and flavorful samosas. The filling was well-spiced and the baked crust was golden and crunchy. It's a healthier alternative to traditional deep-fried samosas without compromising on taste. I would make these again!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),

  new Review({
    user: "080000000000000000000000",
    recipe: "121000000000000000000000",
    title: "Filling Quantity Was Insufficient",
    text: "I tried the Baked Samosas recipe, but I found that the quantity of filling was insufficient for the amount of dough. The samosas ended up with a higher dough-to-filling ratio, and it affected the overall taste. It would be better to have a more generous filling portion in the recipe.",
    wouldMakeAgain: true,
    wouldRecommend: false,
    starRating: 3
  }),


  new Review({
    user: "090000000000000000000000",
  recipe: "122000000000000000000000",
  title: "Authentic Tandoori Flavor",
  text: "The Tandoori Chicken recipe captured the authentic tandoori flavor beautifully. The marinade infused the chicken with a delightful blend of spices, resulting in juicy and flavorful meat. It's a fantastic dish for those who love Indian cuisine. Highly recommended!",
  wouldMakeAgain: true,
  wouldRecommend: true,
  starRating: 5
  }),


  new Review({
  user: "050000000000000000000000",
  recipe: "122000000000000000000000",
  title: "Marinade Time Was Insufficient",
  text: "I followed the Tandoori Chicken recipe, but I felt that the suggested marinade time was insufficient. The flavors didn't penetrate the chicken deeply enough, and it lacked the full tandoori experience. It would benefit from a longer marinating period to enhance the taste.",
  wouldMakeAgain: true,
  wouldRecommend: true,
  starRating: 4
  }),


  new Review({
    user: "164000000000000000000000",
    recipe: "123000000000000000000000",
    title: "Rich and Spicy Kashmiri Dish",
    text: "The Kashmiri Rogan Josh recipe resulted in a rich and spicy dish that truly captured the essence of Kashmiri cuisine. The tender meat cooked in a flavorful gravy with aromatic spices was a delight to the taste buds. It's a must-try for fans of Kashmiri cuisine!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),


  new Review({
    user: "250000000000000000000000",
    recipe: "123000000000000000000000",
    title: "Too Spicy for My Taste",
    text: "I attempted the Kashmiri Rogan Josh recipe, but it turned out to be too spicy for my taste. The heat level overwhelmed the other flavors, and I couldn't fully appreciate the nuances of the dish. It would be helpful to provide options or suggestions for adjusting the spiciness.",
    wouldMakeAgain: false,
    wouldRecommend: false,
    starRating: 3
  }),


  new Review({
    user: "240000000000000000000000",
    recipe: "056000000000000000000000",
    title: "A Taste of South Africa",
    text: "Bobotie is a delightful South African dish that I tried recently. The combination of spiced minced meat, creamy custard topping, and fragrant rice was a unique culinary experience. It had a perfect balance of flavors and textures. I would definitely make this again!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),

  new Review({
    user: "210000000000000000000000",
    recipe: "056000000000000000000000",
    title: "Not to My Liking",
    text: "I gave Bobotie a try, but unfortunately, it didn't match my personal preferences. The combination of flavors didn't resonate with me, and I found the custard topping to be too rich. However, I appreciate the cultural significance of this dish for South Africans.",
    wouldMakeAgain: false,
    wouldRecommend: false,
    starRating: 2
  }),


  new Review({
    user: "164000000000000000000000",
    recipe: "057000000000000000000000",
    title: "Delicious and Addictive",
    text: "Biltong is a South African snack that I absolutely loved. The cured and spiced meat had a rich and savory flavor that was incredibly addictive. It's a great protein-packed snack option for any time of the day. Highly recommended!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 5
  }),

  new Review({
    user: "120000000000000000000000",
    recipe: "057000000000000000000000",
    title: "Texture Wasn't to My Liking",
    text: "I tried making Biltong at home, but the texture didn't turn out to my liking. It was a bit too tough and chewy for my preference. I might need to experiment with different cuts of meat or adjust the curing process. However, the flavors were still enjoyable.",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 3
  }),


  new Review({
    user: "130000000000000000000000",
    recipe: "058000000000000000000000",
    title: "Authentic and Flavorful",
    text: "Bunny Chow is a delicious South African street food that I tried. The combination of curried filling and a hollowed-out loaf of bread was unique and satisfying. It had a good balance of spices and flavors. I would highly recommend trying this iconic dish!",
    wouldMakeAgain: true,
    wouldRecommend: true,
    starRating: 4
  }),

  new Review({
    user: "140000000000000000000000",
    recipe: "058000000000000000000000",
    title: "Challenging to Eat",
    text: "I attempted to make Bunny Chow at home, but I found it challenging to eat. The bread became soggy quickly, and it made it difficult to enjoy the flavors. It might require some practice to achieve the right texture and consistency. However, the concept is intriguing.",
    wouldMakeAgain: true,
    wouldRecommend: false,
    starRating: 3
  }),

  new Review ({
  user: "150000000000000000000000",
  recipe: "059000000000000000000000",
  title: "Deliciously Creamy and Authentic",
  text: "I absolutely loved the Melktert recipe! It was incredibly creamy and had the perfect balance of sweetness. The crust was flaky and buttery, complementing the smooth custard filling beautifully. I will definitely make it again. It's a must-try for anyone looking to indulge in a traditional South African dessert.",
  wouldMakeAgain: true,
  wouldRecommend: true,
  starRating: 5
  }),


  new Review ({
  user: "160000000000000000000000",
  recipe: "059000000000000000000000",
  title: "Disappointing Texture",
  text: "I had high hopes for the Melktert recipe, but unfortunately, the texture of the custard didn't turn out as expected. It was slightly grainy, which took away from the overall enjoyment. However, the flavor was still pleasant, and the crust was delicious. With a few adjustments, it has the potential to be a great dessert. I might give it another try in the future.",
  wouldMakeAgain: false,
  wouldRecommend: true,
  starRating: 3
  }),



  new Review ({
  user: "170000000000000000000000",
  recipe: "060000000000000000000000",
  title: "A Hearty and Flavorful Dish",
  text: "Potjeikos is a fantastic recipe that delivers incredible flavors! The combination of tender meat, vegetables, and spices cooked slowly in a cast-iron pot creates a rich and savory dish that warms the soul. It's perfect for gatherings and outdoor cooking. I highly recommend trying this traditional South African stew. I will definitely make it again.",
  wouldMakeAgain: true,
  wouldRecommend: true,
  starRating: 5
  }),


  new Review ({
  user: "200000000000000000000000",
  recipe: "060000000000000000000000",
  title: "Lacked Depth of Flavor",
  text: "While the Potjeikos recipe was easy to prepare and had a good mix of ingredients, I found the overall flavor to be lacking depth. The meat was tender, but the spices didn't come through as strongly as I had hoped. It was a decent dish, but I've had more flavorful stews before. I might try experimenting with different seasoning combinations if I were to make it again.",
  wouldMakeAgain: false,
  wouldRecommend: true,
  starRating: 3
  }),



  new Review ({
  user: "230000000000000000000000",
  recipe: "086000000000000000000000",
  title: "A Seafood Lover's Delight",
  text: "The Paella Catalane With Mussels, Squid & Crevettes was a true culinary delight! The combination of fresh seafood, flavorful rice, and aromatic saffron created a dish that was both visually stunning and incredibly tasty. The mussels, squid, and crevettes were cooked to perfection, tender and succulent. The flavors melded together beautifully, and each bite was a symphony of taste. I would highly recommend this recipe to any seafood enthusiast. I will definitely make it again!",
  wouldMakeAgain: true,
  wouldRecommend: true,
  starRating: 5
  }),



  new Review ({
  user: "220000000000000000000000",
  recipe: "100000000000000000000000",
  title: "Refreshing and Festive Drink",
  text: "The Sangria recipe was a hit at my recent gathering! It was a refreshing and fruity drink that added a festive touch to the occasion. The combination of red wine, fresh fruits, and a hint of citrus created a well-balanced and delightful flavor. The sangria was easy to make and received many compliments from my guests. I would definitely make it again for future celebrations. Cheers!",
  wouldMakeAgain: true,
  wouldRecommend: true,
  starRating: 5
  }),



  new Review ({
  user: "190000000000000000000000",
  recipe: "089000000000000000000000",
  title: "A Flavorful Appetizer",
  text: "The Sliced Baguette with Anchovy Chive Butter and Radishes recipe was a delicious and unique appetizer. The combination of the creamy anchovy chive butter spread on crispy baguette slices, topped with fresh radishes, created a burst of flavors in every bite. It was a great balance of savory and crunchy, with a hint of brininess from the anchovies. I would recommend trying this recipe for a delightful start to any meal.",
  wouldMakeAgain: true,
  wouldRecommend: true,
  starRating: 5
  }),



  new Review ({
  user: "180000000000000000000000",
  recipe: "091000000000000000000000",
  title: "A Classic French Dish",
  text: "Julia Child's Coq au Vin recipe is a timeless classic that never fails to impress. The chicken was tender and infused with the rich flavors of red wine, mushrooms, onions, and herbs. The sauce was velvety and packed with depth. It required some time and effort to prepare, but the end result was well worth it. I would highly recommend trying this recipe for a taste of authentic French cuisine.",
  wouldMakeAgain: true,
  wouldRecommend: true,
  starRating: 5
  }),



  new Review ({
  user: "120000000000000000000000",
  recipe: "103000000000000000000000",
  title: "Perfectly Fluffy Scones",
  text: "The scones recipe yielded perfectly fluffy and delicious treats. They had a delicate crumb and a subtly sweet flavor. They were great on their own or paired with jam and clotted cream. The recipe was easy to follow, and the scones turned out just as I had hoped. I will definitely be making these scones again for a delightful teatime treat.",
  wouldMakeAgain: true,
  wouldRecommend: true,
  starRating: 5
  }),


  new Review ({
  user: "110000000000000000000000",
  recipe: "074000000000000000000000",
  title: "Creamy and Flavorful Risotto",
  text: "The Risotto with Peas recipe was a hit at my dinner party. The risotto turned out creamy and full of flavor, with the sweetness of peas adding a delightful freshness. The Arborio rice was cooked to perfection, creating a comforting and satisfying dish. It required some attention and stirring, but the end result was absolutely worth it. I would highly recommend this recipe for any risotto lover.",
  wouldMakeAgain: true,
  wouldRecommend: true,
  starRating: 5
  }),


  new Review ({
  user: "220000000000000000000000",
  recipe: "107000000000000000000000",
  title: "Unique and Tasty Combination",
  text: "The Chicken Brats with Root Beer BBQ recipe offered a unique twist on classic bratwurst. The root beer BBQ sauce added a touch of sweetness and tanginess to the juicy chicken brats. The flavors worked surprisingly well together, creating a delicious and satisfying meal. It was a hit with my family and friends. I would definitely make this recipe again for a fun and flavorful barbecue.",
  wouldMakeAgain: true,
  wouldRecommend: true,
  starRating: 5
  }),


  new Review ({
  user: "210000000000000000000000",
  recipe: "124000000000000000000000",
  title: "A Tropical Twist on Rosti",
  text: "The Rosti with Papaya recipe was a delightful tropical twist on the classic Swiss dish. The crispy potato rosti paired perfectly with the sweet and tangy flavors of papaya. It was a refreshing and unique combination that added a burst of tropical flair to the meal. The recipe was easy to follow, and the results were fantastic. I would recommend trying this recipe for a taste of something different.",
  wouldMakeAgain: true,
  wouldRecommend: true,
  starRating: 5
  }),


  new Review ({
  user: "100000000000000000000000",
  recipe: "135000000000000000000000",
  title: "Decadent Brazilian Treat",
  text: "The Brigadeiros recipe was a decadent and indulgent Brazilian treat. These chocolate truffles were rich, fudgy, and incredibly addictive. The combination of condensed milk, cocoa powder, and butter created a smooth and velvety texture. Rolling them in chocolate sprinkles added a delightful crunch. They were a hit at my party, and everyone wanted the recipe. I will definitely make Brigadeiros again for special occasions.",
  wouldMakeAgain: true,
  wouldRecommend: true,
  starRating: 5
  })
)

const favorites = [];
favorites.push(
  new Favorite({
    user: "164000000000000000000000",
    recipe: "026000000000000000000000"
  }),

  new Favorite ({
    user: "164000000000000000000000",
    recipe: "033000000000000000000000"
  }),

  new Favorite ({
    user: "164000000000000000000000",
    recipe: "040000000000000000000000"
  }),

  new Favorite ({
    user: "164000000000000000000000",
    recipe: "046000000000000000000000"
  }),

  new Favorite ({
    user: "164000000000000000000000",
    recipe: "061000000000000000000000"
  }),

  new Favorite ({
    user: "164000000000000000000000",
    recipe: "068000000000000000000000"
  })
)

const insertSeeds = async () => {
  try {
    console.log("Resetting db and seeding users...");

    await User.collection.drop();
    await Recipe.collection.drop();
    await Review.collection.drop();
    await Favorite.collection.drop();

    await User.insertMany(users);
    await Recipe.insertMany(allRecipes);
    await Review.insertMany(reviews);
    await Favorite.insertMany(favorites);

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
