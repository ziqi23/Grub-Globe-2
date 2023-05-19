const { Configuration, OpenAIApi } = require("openai");

const express = require("express");
const router = express.Router();
const { openaiApiKey } = require("../../config/keys");

const configuration = new Configuration({
  apiKey: openaiApiKey,
});
const openai = new OpenAIApi(configuration);

router.post("/", async (req, res) => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const question = req.body.question || "";
  const recipeName = req.body.recipe || "";
  const recipeStep = req.body.step || "";

  if (question.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid question",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(question, recipeName, recipeStep),
      temperature: 0.6,
      max_tokens: 256,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
});

function generatePrompt(question, recipeName, recipeStep) {
  const capitalizedQuestion =
    question[0].toUpperCase() + question.slice(1).toLowerCase();
  return `I'm cooking ${recipeName}. ${
    recipeStep === "" ? "" : `I'm at step ${recipeStep}.`
  }

Help me with this question: ${question}`;
}

module.exports = router;
