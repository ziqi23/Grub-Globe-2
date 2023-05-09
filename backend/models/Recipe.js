const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  country: {
    type: String
  },
  recipeName: {
    type: String
  },
  recipeImage: {
    type: String
  },
  recipeAuthor: {
    type: String,
  },
  ingredients: {
    type: [{
      id: {
        type: Number
      },
      name: {
        type: String
      },
      amount: {
        type: Number
      },
      unit: {
        type: String
      }
    }],
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
   },
   recipeDescription: {
    type: String,
    default: ""
  },
  prepTime: {
    type: Number,
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

module.exports = mongoose.model('Recipe', recipeSchema);
