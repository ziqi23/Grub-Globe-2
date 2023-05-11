// const mongoose = require("mongoose");
// const { mongoURI: db } = require('../config/keys.js');
// const Recipe = require('../models/Recipe');
// const { initialize } = require("passport");

// const DEFAULT_RECIPE_IMAGE_URL = 'https://grub-globe-seeds.s3.us-west-2.amazonaws.com/defaultImage.png';

// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(async ()=> {
//     console.log('Connected to MongoDB');
//     initializeImages();
//   })
//   .catch(err => {
//     console.error(err.stack);
//     process.exit(1);
//   });

//   const initializeImages = async () => {
//     console.log("Initializing Recipe Photos");

    // for (const [recipeName, photoUrl] of Object.entries(photoUrls)) {
    //   await Recipe.updateMany({recipeName}, {photoUrl});
    // }

    // const recipes = await
    // await Recipe.updateMany({}, { photoUrl: DEFAULT_RECIPE_IMAGE_URL });

  //   const recipes = await Recipe.find({});
  //   for (const [index, recipe] of recipes.entries()) {
  //     const photoUrl = photoUrls[index % photoUrls.length];
  //     await Recipe.findByIdAndUpdate(recipe._id, { photoUrl });
  //   }

  //   console.log("Done!");
  //   mongoose.disconnect();
  // }
