# grubGlobe

_Social, interactive, and AI-augmented MERN fullstack app for exploring diverse recipes from around the world_

### Background

grubGlobe is a fullstack app to answer the question "what should I cook?" We designed grubGlobe for the culinary adventurer-at-heart who wants to explore the best recipes from around the world. And not only that, we wanted to make it as easy as possible to get cookin' and track one's culinary journey.

Explore it here! <a href="https://grubglobe.herokuapp.com/">https://grubglobe.herokuapp.com/</a>

Creators:

- Taisia Karaseva, team lead, AI | <a href="https://github.com/taisiat">github</a> | <a href="https://www.linkedin.com/in/taisiakaraseva/">Linkedin</a>
- Ziqi Zou, globe, flex | <a href="https://github.com/ziqi23">github</a> | <a href="https://www.linkedin.com/in/ziqi-zou-2a877818a/">Linkedin</a>
- Leah Seyoum, search, backend | <a href="https://github.com/leahseyoum">github</a> | <a href="https://www.linkedin.com/in/leah-seyoum-958288277/">Linkedin</a>
- Michelle Chung, badges, flex | <a href="https://github.com/michellechung099">github</a> | <a href="https://www.linkedin.com/in/michelle-chung-3a915a134/">Linkedin</a>
- Kat Vu, frontend | <a href="https://github.com/katpvu">github</a> | <a href="https://www.linkedin.com/in/kathy-vu-57b50411b/">Linkedin</a>

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

---

### Implementation Highlights

### Globe

[TK note: briefly describe the user experience and why this experience was important for our app. Include a brief gif of experience; you can record a screen clipping and upload to giphy, then use the format below to embed. Must be under 20s, longer gifs tend to cut off]

A user can ...

Example ...:

![image name](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGVhYmIxMDkxMmFiMTNkMjM5NzkzOWE0MDU2ODlhZmRlM2E3ZWMxNyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/MC9IJ6ADrUvJMVE3K0/giphy.gif)

[TK note: then, explain how we built that user experience - general technical approach plus code snippets]

The blah does blah

<h5 a><strong><code>index.js</code></strong></h5>

```JavaScript
codecodecode
```

Notably, more blah

<h5 a><strong><code>index.js</code></strong></h5>

```JavaScript
codecodecode
```

Interesting considerations and challenges and how we overcame...

---

### AI assistants

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

[TK note: briefly describe the user experience and why this experience was important for our app. Include a brief gif of experience; you can record a screen clipping and upload to giphy, then use the format below to embed. Must be under 20s, longer gifs tend to cut off]

A user can ...

Example ...:

![image name](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGVhYmIxMDkxMmFiMTNkMjM5NzkzOWE0MDU2ODlhZmRlM2E3ZWMxNyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/MC9IJ6ADrUvJMVE3K0/giphy.gif)

[TK note: then, explain how we built that user experience - general technical approach plus code snippets]

The blah does blah

<h5 a><strong><code>index.js</code></strong></h5>

```JavaScript
codecodecode
```

Notably, more blah

<h5 a><strong><code>index.js</code></strong></h5>

```JavaScript
codecodecode
```

Interesting considerations and challenges and how we overcame...

---

### User experience stickiness

[TK note: briefly describe the user experience and why this experience was important for our app. Include a brief gif of experience; you can record a screen clipping and upload to giphy, then use the format below to embed. Must be under 20s, longer gifs tend to cut off. I think in this section we cover badges, magic button (with Big O considerations) for sure, can cover more as well. Can prob make mini headers within this section to split out the topics, each with its own gif and code snippets etc.]

A user can ...

Example ...:

![image name](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGVhYmIxMDkxMmFiMTNkMjM5NzkzOWE0MDU2ODlhZmRlM2E3ZWMxNyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/MC9IJ6ADrUvJMVE3K0/giphy.gif)

[TK note: then, explain how we built that user experience - general technical approach plus code snippets]

The blah does blah

<h5 a><strong><code>index.js</code></strong></h5>

```JavaScript
codecodecode
```

Notably, more blah

<h5 a><strong><code>index.js</code></strong></h5>

```JavaScript
codecodecode
```

Interesting considerations and challenges and how we overcame...

---

#### Other Features

Take a look at the source files for implementation of other notable features:

- Recipe and user image hosting via `AWS` and `MongoDB buffer`, including ability to change profile picture
- Full user auth, with modals for login and signup
- Reviews, cooked recipes, and favorites CRUD
- Frontend and backend input validation + messaging throughout

---

### Future Features

Upcoming improvements include:

- Live API call integration to enable search on more recipes
- Ability to add ingredient substitutions and refresh the nutrition panel
- Feature to adjust font to be easier to read for some users

---

### Asset Attribution

- Seed content by <a href="https://chat.openai.com/chat">ChatGPT</a> and <a href="https://spoonacular.com/food-api">Spoonacular</a>
- Images by Spoonacular and Google image search
- CSS reset by <a href="http://meyerweb.com/eric/tools/css/reset/">Meyerweb</a>
