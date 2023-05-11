const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");
const Recipe = require("./Recipe");

const favoriteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      //   required: true,
    },
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      //   required: true,
    },
  },
  {
    timestamps: true,
  }
);

favoriteSchema.index({ user: 1, recipe: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
