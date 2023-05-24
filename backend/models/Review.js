const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");
const Recipe = require("./Recipe");

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    wouldMakeAgain: {
      type: Boolean,
      required: true,
    },
    wouldRecommend: {
      type: Boolean,
      required: true,
    },
    starRating: {
      type: Number,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: false
    }
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ user: 1, recipe: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
