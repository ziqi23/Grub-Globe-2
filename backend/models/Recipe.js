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
  prepTime: {
    type: Number
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
  tags: {
    type: [String]
  },
  youtubeLinks: {
    type: [String]
  },
  photoUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
