const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    recipeId: {
      type: String,
      required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Review', reviewSchema);