const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  recipeName: {
    type: String,
    required: true
  },
  recipeImage: {
    type: String,
    required: true
  },
  recipeAuthor: {
    type: String,
    required: true
  },
  ingredients: {
    type: [{
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
        required: true
      },
      unit: {
        type: String,
        required: true
      }
    }],
    required: true
  },
  nutrition : {
    nutrients: [{
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
    }],
    required: true
   },
   recipeDescription: {
    type: String,
    default: ""
  },
  cookTime: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  cuisineDescription: {
    type: String,
    default: ""
  },
  servings: {
    type: Number,
    required: true
  },
  recipeInstructions: {
    steps: [{
      number: {
        type: Number,
        required: true
      },
      step: {
        type: String,
        required: true
      },
      ingredients: [{
        id: {
          type: Number,
          required: true
        },
        name: {
          type: String,
          required: true
        },
      }],
      equipment: [{
        id: {
          type: Number,
          required: true
        },
        name: {
          type: String,
          required: true
        }
      }]
    }],
    required: true
  },
  tags: {
    type: [{
      name: {
        type: String,
        required: true
      },
      value: {
        type: Boolean,
        required: true
      }
    }]
    // dish types + diets as tags
  },
  reviewDocument: {
    type: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      content: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
      }
    }],
    default: []
  },
  youtubeLinks: {
    type: [String],
    default: []
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
