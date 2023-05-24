const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const Review = require('../models/Review');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    initializeImages();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

const initializeImages = async () => {
  console.log("Initializing Review image URLs...");
  await Review.updateMany({}, { imageUrls: [] });

  console.log("Done!");
  mongoose.disconnect();
}
