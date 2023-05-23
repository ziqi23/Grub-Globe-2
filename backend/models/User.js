const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    profilePhoto: { 
      type: Buffer 
    },
    profileImageUrl: {
      type: String
    },
    completedRecipe: [
      {
        recipeId: {
          type: Schema.Types.ObjectId,
          ref: 'Recipe'
        }
      }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);
