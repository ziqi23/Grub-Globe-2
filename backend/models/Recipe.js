const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  country: {
    type: String,
    required: true
  },
  recipeName: {
    type: String,
    required: true
  },
  recipeAuthor: {
    type: String,
    required: true
  },
  ingredients: [
    {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: false
      },
      unit: {
        type: String,
        required: false
      }
    }
  ],
  nutrition: {
    nutrients: [
      {
        name: {
          type: String,
          required: true
        },
        amount: {
          type: Number,
          required: true
        },
        unit: {
          type: String,
          required: true
        },
        percentOfDailyNeeds: {
          type: Number,
          required: true
        }
      }
    ]
  },
   recipeDescription: {
    type: String,
    default: "",
    required: true
  },
  prepTime: {
    type: Number
  },
  cuisineDescription: {
    type: String,
    default: ""
  },
  servings: {
    type: Number
  },
  recipeInstructions: [
    {
      number: {
        type: Number,
        required: true
      },
      step: {
        type: String,
        required: true
      }
    }
  ],
  tags: [
        
  ],
  youtubeLinks: {
    type: [String]
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
