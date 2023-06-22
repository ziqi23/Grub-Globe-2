# grubGlobe

_Social, interactive, and AI-augmented MERN fullstack app for exploring diverse recipes from around the world_

### Background

grubGlobe is a fullstack app to answer the question "what should I cook?" We designed grubGlobe for the culinary adventurer-at-heart who wants to explore the best recipes from around the world. And not only that, we wanted to make it as easy as possible to get cookin' and track one's culinary journey.

Explore it <a href="https://grubglobe.herokuapp.com/?utm_source=grubglobe&utm_medium=readme">🍜 here!</a>

Creators:

- <a href="https://www.taisiat.com/?utm_source=grubglobe&utm_medium=readme">Taisia Karaseva</a>, team lead, AI | <a href="https://github.com/taisiat">github</a> | <a href="https://www.linkedin.com/in/taisiakaraseva/">Linkedin</a>
- Ziqi Zou, globe, flex | <a href="https://github.com/ziqi23">github</a> | <a href="https://www.linkedin.com/in/ziqi-zou/">Linkedin</a>
- Leah Seyoum, search, backend | <a href="https://github.com/leahseyoum">github</a> | <a href="https://www.linkedin.com/in/leah-seyoum-958288277/">Linkedin</a>
- Michelle Chung, badges, flex | <a href="https://github.com/michellechung099">github</a> | <a href="https://www.linkedin.com/in/michelle-chung-3a915a134/">Linkedin</a>
- Kat Vu, frontend | <a href="https://github.com/katpvu">github</a> | <a href="https://www.linkedin.com/in/kat-vu-57b50411b/">Linkedin</a>

---

### Functionality & MVPs

In grubGlobe, users are able to:

- Discover recipes by:
  - Exploring the interactive world globe to select cuisines
  - Using the searchbar to pinpoint recipes matching their preferences, including dietary needs and ingredients
  - Spinning the wheel to get a delicious random recommendation
  - Checking out a recommended recipe list, derived from their prior grubGlobe activity
  - Asking the AI assistant for a recommendation based on what they're craving or what ingredients they have
- Get cookin' by:
  - Entering a kitchen-optimized step-by-step recipe flow
  - Asking a second AI assistant for advice for the specific recipe and recipe step ("How do I 'fold in the cheese'???")
- Track their culinary journey by earning badges for cooking recipes and writing reviews

---

### Technologies, Libraries, APIs

This project is implemented with the following technologies:

- `React` and `JavaScript` frontend with `CSS3` styling and `Redux state`
- `MongoDB`, `Mongoose`, `Node.js`, `Express` backend
- `OpenAI`'s text-davinci-003 and gpt-3.5-turbo models to create 2 AI assistants
- `AWS` for hosting recipe images and `Active Storage` for using images in app
- `Heroku` for app hosting
- `Webpack` to bundle and transpile the source code
- `npm` to manage project dependencies
- `Spoonacular` API for recipes
- `Three.js` for 3D scene rendering

---

### Implementation Highlights

### Globe

On the splash page of the application is a 3D globe visualization offering a simple and intuitive way to navigate to different countries. This interactive sphere is set to spin by default, showcasing the different countries a user can choose from. Users can decide to manually spin the globe to a desired location or hover over a country to see a short description of the local cuisine. If the description fits the user's appetite, clicking on the 'take me there' button routes to a recipe show page featuring that particular country. An example of this user experience is shown below:

![globe](https://media1.giphy.com/media/5oiykRFWmZu7DnSVU8/giphy.gif)

We built this experience using Three.js. Starting with a simple sphere geometry included within the library.

<h5 a><strong><code>globe.js</code></strong></h5>

```JavaScript
const globeGeometry = new THREE.SphereGeometry(30, 64, 64);
const globeMaterial = new THREE.MeshStandardMaterial({ color: 0x9dd0ff });
const globe = new THREE.Mesh(globeGeometry, globeMaterial);
globe.position.x = 0;
globe.position.z = 0;
globe.position.y = 0;
```

The first challenge was to find a way to section the globe into dynamic sub-components representing countries. We needed to determine whenever a user click is registered, whether the user meant to click on, for example, 'China' or 'Mexico'.

We decided to utilize Three.js's raytracer to first determine the user's cursor location in 3D space and convert them into plain xy coordinates.

<h5 a><strong><code>globe.js</code></strong></h5>

```JavaScript
let lastCall = Date.now();
function handleMouseMoveForRaycaster(e) {
  if (Date.now() - lastCall < 200) {
    return;
  }
  lastCall = Date.now();
  if (e.target.tagName === "CANVAS") {
    mousePos.x = (e.offsetX / canvasWidth) * 2 - 1;
    mousePos.y = -((e.offsetY / canvasHeight) * 2 - 1);
  }
  raycaster.setFromCamera(mousePos, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length !== 0) {
    setUv(intersects[0].uv);
  } else {
    autoRotate = true;
  }
}
```

With the above code, we now had a better understanding of the user's click event, which can be represented by normalized 2D coordinates between -1 and 1. Still, we needed to find a way to map these coordinates to individual countries.

Our solution was to leverage a blank 2D world map found on Google Images and assign unique color codes to each country. Upon raycaster returning a coordinate, we'd read this image, check the color associated with the UV coordinates, and in turn deduce the name of the country.

```Javascript
const colorMapping = {
  "70744C": "United States",
  "847233": "Italy",
  "9E8D56": "China",
  "5C9E5D": "Mexico",
  "555931": "India",
  "6A5912": "France",
  ...
}

function getColorFromUV(u, v) {
const width = Math.floor(u * image.width);
const height = Math.floor((1 - v) * image.height);
const index = (width + (height - 1) * image.width) * 4;
const hexColor =
  imageColor.data[index].toString(16) +
  imageColor.data[index + 1].toString(16) +
  imageColor.data[index + 2].toString(16);
return hexColor;
}
```

After the core logic to handle user clicks was in place, we brought the visualization to life by adding 20,000 dots on the surface of the globe. Upon hovering over a country, the corresponding dots jump out in a smooth animation. 

```Javascript
for (let i = 0; i < 20000; i++) {
  const phi = Math.acos(-1 + (2 * i) / 20000);
  const theta = Math.sqrt(20000 * Math.PI) * phi;
  const vector = new THREE.Vector3();
  vector.setFromSphericalCoords(30, phi, theta);
  ...
}
```

In our implementation of the globe, one notable challenge was finding the right balance between looks and performance. Many of the visualizations we considered looked great but also slowed down the rendering of the application, which would have taken a toll on the user experience.

---

### AI assistants

<a href="https://youtu.be/PFHso7U-87M">▶️ Watch AI assistants walkthrough here!</a>

A user can get inspiration and recipe help from 2 AI assistants.

The first AI assistant lives on the globe splash page and can point the user to a recipe from our database:

![globe page assistant](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGVhYmIxMDkxMmFiMTNkMjM5NzkzOWE0MDU2ODlhZmRlM2E3ZWMxNyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/MC9IJ6ADrUvJMVE3K0/giphy.gif)

This assistant is powered by `OpenAI gpt-3.5-turbo chat completions` model. At the time (May 2023) this was `OpenAI`'s most cost effective model at 1/10 the cost of `davinci chat completions`, which was important for this implementation. Each request has a high number of tokens, because 1. we wanted this assistant to be able to remember conversation context/'keep up' a conversation, and 2. we needed the assistant to know our inventory of recipes and select only from that list.

To support this implementation, we generate a prompt for each request inside the `generateTurbo router`. This prompt gives the model context on recipes that are fair game, and on what format the response should take.

<h5 a><strong><code>generateTurbo.js</code></strong></h5>

```JavaScript
function generatePrompt(prompt) {
  return [
    {
      role: "system",
      content: `You are a helpful assistant who helps users pick the right recipe to cook. You only pick recipes from the following list. You make a recipe suggestion, briefly explain why that's a good choice, and note which country the recipe is from. The recipe list is: ${CountryAndRecipeList},`,
    },
  ].concat(prompt);
}
```

The `prompt` above comes from the frontend `WhatToCookAssistant`. It is an array where we hold user questions and model answers, so that the next model answer can 'keep up' the conversation.

Notably, we recognized that keeping conversation records from several questions ago wouldn't add much to user experience but would lead to a higher number of tokens sent in each request... potentially even more tokens than `OpenAI ` allows. Thus, we check the length of the `prompt` array and remove older entries.

<h5 a><strong><code>WhatToCookAssistant/index.js</code></strong></h5>

```JavaScript
  useEffect(() => {
    //do nothing until user starts to input a question
    if (questionInput.length === 0) return;
    //keep only up to 3 prior Q&A's
    if (prompt.length > 6) {
      setPrompt(prompt.slice(2));
    }
    const updatedPrompt = [...prompt];
    const lastElement = updatedPrompt[updatedPrompt.length - 1];
    //if we already have a user input entry going, update it
    if (lastElement && lastElement.role === "user") {
      updatedPrompt[updatedPrompt.length - 1] = {
        role: "user",
        content: questionInput,
      };
      setPrompt(updatedPrompt);
    } else {
    //if we don't yet have a user input entry, start one now
      setPrompt([...prompt, { role: "user", content: questionInput }]);
    }
  }, [questionInput]);
```

We also recognized a drawback of the `OpenAI gpt-3.5-turbo chat completions` model: every 25 requests or so, `OpenAI` gives a server overload error. We built an error handler to let the user know about the issue directly inside the assistant's chat interface. We also make note of this in the model request prompt so that the next time the model is able to respond, it apologizes for the delay and proceeds to giving a recipe recommendation.

<h5 a><strong><code>WhatToCookAssistant/index.js</code></strong></h5>

```JavaScript
 async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await jwtFetch("/api/generateTurbo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();
      //when request is OK, populate chat interface's bubbles with user's question and model's answer
      setPastQuestions((prevState) => [questionInput, ...prevState]);
      setPastAnswers((prevState) => [data.result, ...prevState]);
      //and, clear the input field to prep for next question
      setQuestionInput("");
      //also prepare next request's prompt with model's answer
      setPrompt([...prompt, { role: "assistant", content: data.result }]);
    } catch (error) {
        //if response is not OK, populate chat interface's bubbles with user's question and custom message about server overload
      console.error(error);
      setPastQuestions((prevState) => [questionInput, ...prevState]);
      setPastAnswers((prevState) => [
        "Sorry, OpenAI's got-3.5-turbo model is currently overloaded with other requests. Please try again in a moment, or explore the globe to find your next food adventure.",
        ...prevState,
      ]);
      //also prepare next request's prompt with mention of the failed request
      setPrompt([
        ...prompt,
        {
          role: "assistant",
          content: "OpenAI server was overloaded so I couldn't answer",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }
```

The second AI assistant lives on the recipe page and can answer questions about the recipe, without user needing to specify which recipe they are talking about:

![AI assistant on recipe show page](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGY4N2JkNjVkNWU3YWMxZjU2MGNmODI5MjllYWZlNWJhY2RjN2NiMiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/BpvsG9BmcHBtJnOsBL/giphy.gif)

The assistant can also answer questions about the recipe step, without user needing to specify the recipe or recipe step they are on:

![AI assistant on recipe steps flow](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTU1YWM1ZTlmZTY0ZmVhNjViNmI2NTc4OGViMzA3MGY5ODNhYjIxZSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/vLDuoIFTCRdUoK1yt9/giphy.gif)

This assistant is powered by `OpenAI text-davinci-003 chat completions` model. We used this faster, more dependable, but more expensive model because this assistant serves a different purpose. This assistant needs to quickly answer one-off questions about a recipe or recipe step so the user can get cookin'. To support this, the frontend `RecipeAssistant` component sends the recipe name and an optional recipe step (if in the let's get cookin' flow) and the `generateDavinci` router conditionally forms a prompt.

<h5 a><strong><code>generateDavinci.js</code></strong></h5>

```JavaScript
function generatePrompt(question, recipeName, recipeStep) {
  const capitalizedQuestion =
    question[0].toUpperCase() + question.slice(1).toLowerCase();
  return `I'm cooking ${recipeName}. ${
    recipeStep === "" ? "" : `I'm at step ${recipeStep}.`
  }

Help me with this question: ${question}`;
}
```

After experimentation, we landed on a `temperature` of 0.6 and `max_tokens` of 256 to get responses of the desired level of creativity and length.

---

### Search

The user experience of the recipe search feature is important for our app because it allows users to easily find recipes based on specific criteria such as country/cuisine, and dietary preferences (vegan, vegetarian, gluten-free, etc.). The search bar is located at the top of the recipes list page as well as the user profile page for easy access.

![image name](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWZ5NHR6ZGp3M3JsdnEzYjg5bnN2aHYxeXVtaDVhbGRtbTZ6eHBlMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ef2BWiEbJiYc3OgiLC/giphy.gif)

To implement this user experience, we utilized a library called CreatableSelect for the search bar component. Here's an example of the code snippet for the search component:

<h5 a><strong><code>Search.js</code></strong></h5>

```JavaScript
<CreatableSelect
          isMulti
          isCreatable={true}
          options={countryTagOptions}
          placeholder="Search by country or tag..."
          onChange={(selected) => {
            const selectedCountries = selected.filter(
              (option) => option.category !== "Tags"
            );
            const selectedTags = selected.filter(
              (option) => option.category === "Tags"
            );
            setQuery(selected.map((option) => option.value).join(" , "));
          }}
        />
```

This code snippet demonstrates the usage of the CreatableSelect component with multi-select capability. It allows users to select multiple options from the dropdown, including both pre-defined options (country/cuisine) and custom options (tags). The onChange handler updates the query based on the selected options.

On the server-side, we implemented a route to handle the search functionality. Here's an example of the code snippet for the search route:

<h5 a><strong><code>search.js</code></strong></h5>

```JavaScript
router.get("/", async (req, res) => {
  const query = req.query.q;
  const queryArray = query.split(" , ");

  if (queryArray.length === 1) {
    try {
      const recipes = await Recipe.find({
        $or: [
          { recipeName: { $regex: query, $options: "i" } },
          { country: { $regex: query, $options: "i" } },
          {
            tags: {
              $elemMatch: {
                $regex: query.replace(/[-\s]/g, ""),
                $options: "i",
              },
            },
          },
          {
            ingredients: {
              $elemMatch: { name: { $regex: query, $options: "i" } },
            },
          },
        ],
      }).sort({ createdAt: -1 });
      return res.json(recipes);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else if (
    queryArray.length > 1 &&
    queryArray.every((term) =>
      [
        "vegan",
        "vegetarian",
        "gluten-free",
        "dairy-free",
        "sustainable",
      ].includes(term)
    )
  ) {
    try {
      const recipes = await Recipe.find({
        tags: {
          $all: queryArray.map(
            (tag) => new RegExp(tag.replace(/[-\s]/g, ""), "i")
          ),
        },
      }).sort({ createdAt: -1 });

      return res.json(recipes);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else if (queryArray.length > 1) {
    try {
      const recipes = await Recipe.find({
        $or: queryArray.map((term) => ({
          $or: [
            { recipeName: { $regex: term, $options: "i" } },
            { country: { $regex: term, $options: "i" } },
            {
              tags: {
                $elemMatch: {
                  $regex: term.replace(/[-\s]/g, ""),
                  $options: "i",
                },
              },
            },
            {
              ingredients: {
                $elemMatch: { name: { $regex: query, $options: "i" } },
              },
            },
          ],
        })),
      }).sort({ createdAt: -1 });
      return res.json(recipes);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
});
```

In this code snippet, the / route handles the search functionality. It parses the search query and splits it into an array of terms. The code then checks different scenarios based on the length and content of the query array to perform appropriate searches in the database.

Throughout the implementation, we considered various challenges, such as handling different types of search queries (single term, multiple terms, tags), matching the search terms against recipe names, countries, tags, and ingredients, and sorting the search results based on relevance (e.g., sorting by recipe creation date). By using appropriate MongoDB queries and logical operations, we were able to overcome these challenges and provide an efficient and relevant search experience for our users.

---

### User experience stickiness

In order to enhance user experience, we implemented a Random Recipe Generator into our application, utilizing a randomized algorithm that provides a wide array of unique recipes to users. This system promotes culinary diversity and encourages the exploration of different recipes.

Paired with the generator, we also implemented a Badge System, where users gain badges based on their completed recipes. These badges function as tangible incentives and metrics for progress.

These features enrich our app's user interface (UI) and user experience (UX), fostering engagement and user retention. These features allow an immersive recipe exploration experience that is both rewarding and enriching.

#### Badge Rewarding System

In order to enhance the experience of home cooking, we decided to gamify it by implementing a badge reward system, which serves to motivate users to explore and cook a greater variety of recipes through our app. On the profile page, a user is able to see their progress for these badges as there are five levels of proficiency a user can achieve for each badge: Rookie, Adept, Expert, Wizardly, and Legendary. The badge rewarding system is based on the total number of recipes a user has completed, the diversity of recipes they've completed, how many reviews they've written, and the number of healthy recipes they've cooked.

<p align="center"><img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGM4NjkyZGI4ZDJmZGNiY2NlMWYxYjgzNDRhN2EyNzZlZmQ5ZGExNSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/anpYfrLS2iXcXGD7AP/giphy.gif" alt="badges"/></p>

Since the badges are entirely based on the current user, we populated the backend response when fetching the current user, with the user's completed recipes. 

<h5 a><strong><code>users.js</code></strong></h5>

```JavaScript
  router.patch(
    "/completeRecipe",
    validateCompleteRecipeInput,
    async function (req, res, next) {
      try {
        const { userId, recipeId } = req.body;
  
        let user = await User.findById(userId);
        const completedRecipeIds = user.completedRecipe.map((recipe) =>
          recipe.recipeId.toString()
        );
  
        if (!completedRecipeIds.includes(recipeId)) {
          user = await User.findByIdAndUpdate(
            userId,
            { $push: { completedRecipe: { recipeId: recipeId } } },
            { new: true }
          );
        }
      } catch (err) {
        const error = new Error(`Completion unsuccessful: ${err.message}`);
        error.statusCode = 500;
        error.errors = { message: "recipe completion unsuccessful" };
        return next(error);
      }
    }
  );
```

<h5 a><strong><code>CompleteFollowAlongButton.js</code></strong></h5>

These completed recipe data were collected on the frontend when the user clicks the "Finished!" button at the end of completing all the recipe steps. 

```JavaScript
 const handleFinishedFollowAlong = () => {
        closeFollowAlong();
        setCurrentRecipeStep("");

        const completedRecipeObj = {
            userId: sessionUser._id,
            recipeId: recipeId
        }

        dispatch(addCompletedRecipe(completedRecipeObj));
        window.location.reload();
    }
```

<h5 a><strong><code>Profile.js</code></strong></h5>

From these completed recipes, recipe data attributes such as recipe tags and recipe country were used to generate the Global Gastronaut badge and Plant-Based Prodigy badge. The Culinary Connoisseur badge was based on the number of completed recipes and the Tastemaker Extraordinaire badge was based on the total number of user reviews. 

```JavaScript
  useEffect(() => {
    if (sessionUser && sessionUser.completedRecipe) {
      const fetchPromises = sessionUser.completedRecipe.map(({ recipeId }) =>
        dispatch(fetchRecipe(recipeId))
      );

      Promise.all(fetchPromises)
        .then((fetchedRecipes) => {
          setCompletedRecipes(fetchedRecipes);
          const numComplete = fetchedRecipes.length;
          const uniqueCountry = new Set(
            fetchedRecipes.map((recipe) => {
              return recipe.recipe.country;
            })
          );

          const numHealthy = fetchedRecipes.filter(
            (recipe) =>
              recipe.recipe.tags.includes("vegetarian") ||
              recipe.recipe.tags.includes("vegan") ||
              recipe.recipe.tags.includes("glutenFree")
          ).length;
          const reviewsCount = userReviews?.length;

          setNumCompleted(numComplete);
          setUniqueCountries(uniqueCountry.size);
          setNumReviews(reviewsCount);
          setNumHealthyRecipes(numHealthy);
        })
        .catch((error) => {
          console.error("Error fetching recipes: ", error);
        });
    }
  }, [sessionUser, dispatch, userReviews?.length]);
```

#### Random Recipe Generator

Another way a user can discover new recipes easily is through the random recipe generator button, which was inspired by the experience of a slot machine. Upon clicking the "GIVE ME A RANDOM RECIPE" button, this will make a fetch to the backend for an array of 10 randomly selected recipes from our database recipes collection.

<p align="center">
<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTdkNGQ1MTk2ZjBlOWVlM2RhNWFjZjZmZmEwNzJmMjYzNGIwMzJmYSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/BUqZHGwjiLyE7s8BUe/giphy.gif" alt="random-recipe-generator"/>
</p>

Initially, we were fetching all the recipes from the backend to the frontend and then randomly indexing throughout that entire array of recipes for definite randomization and optimized time complexity, but this was a very slow process. In response, we created a backend route that would generate an aggregate of 10 random recipes that would be sent to the client-side for rendering. 

<h5 a><strong><code>backend/routes/api/recipes.js</code></strong></h5>

```JavaScript
// returns completely random set of 10 recipes 
router.get('/randomRecipes', async (req, res) => {
    try {
        const randomRecipes = await Recipe.aggregate([{ $sample: {size: 10 }}])
        return res.json(randomRecipes)
    } catch (err) {
        return res.json([]);
    }
})
```

At first, the recipe rotation was built using a setInterval, but it was noticably lagging in between recipes. The function, `initializeRecipeRotation` was improved by setting up setTimeouts, which were dependent on a recipe's index. The first recipe is displayed immediately upon calling the function, and the subsequent recipes are placed in a queue. The local state to display current recipe is changed every 0.5 seconds.

<h5 a><strong><code>RandomRecipeGenerator.js</code></strong></h5>

```JavaScript
    const initializeRecipeRotation = () => {
        // display first recipe
        let currentIndex = 0
        setCurrentImage(recipes[currentIndex].photoUrl);
        setCurrentRecipeName(recipes[currentIndex].recipeName);
        setCurrentRecipeId(recipes[currentIndex]._id);

        // setup next recipes in rotation
        for (let i = 1; i < 10; i++) {
            setTimeout(() => {
                setCurrentImage(recipes[i].photoUrl);
                setCurrentRecipeName(recipes[i].recipeName);
                setCurrentRecipeId(recipes[i]._id);
            }, (500*i))
        }
    }
```

---

#### Other Features

Take a look at the source files for implementation of other notable features:

- Recipe and user image hosting via `AWS` and `MongoDB buffer`, including ability to change profile picture
- Full user auth, with modals for login and signup
- Reviews, cooked recipes, and favorites CRUD
- Frontend and backend input validation + messaging throughout
- Mobile and tablet responsiveness

---

### Future Features

Upcoming improvements include:

- Live API call integration to enable search on more recipes
- Ability to add ingredient substitutions and refresh the nutrition panel
- Feature to adjust font to be easier to read for some users
- Ability to view other users' profiles

---

### Asset Attribution

- Seed content by <a href="https://chat.openai.com/chat">ChatGPT</a> and <a href="https://spoonacular.com/food-api">Spoonacular</a>
- Images by Spoonacular and Google image search
- CSS reset by <a href="http://meyerweb.com/eric/tools/css/reset/">Meyerweb</a>
