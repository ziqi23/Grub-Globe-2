const { Configuration, OpenAIApi } = require("openai");

const express = require("express");
const router = express.Router();
const { openaiApiKey } = require("../../config/keys");

const configuration = new Configuration({
  apiKey: openaiApiKey,
});
const openai = new OpenAIApi(configuration);

const CountryAndRecipeList =
  "Canada: poutine, butter tarts, classic timbits, nanaimo bars, canadian hot chocolate. Peru: ceviche, lomo saltado, anticuchos, aji de gallina, pisco sour. Australia: vegemite on toast, pavlova, meat pie, lamingtons, ANZAC biscuits. Indonesia: Nasi Goreng (fried rice), satay, rendang, gado-gado, bakso. Sweden: meatballs (kottbullar), gravlax, knackebrod, prinsesstarta, artsoppa (pea soup). Iran: chelow kebab, ghormeh sabzi, fesenjan, ash-e reshteh, tahdig. South Africa: bobotie, biltong, bunny chow, melktert, potjiekos. Ethiopia: injera, doro wat, kifto, tibs, shiro. Morocco: couscous, harira soup, pastilla, mint tea. Lebanon: shewarma, tabouleh, hummus, felafel. Italy: Risotto with peas, osso buco, lasagna silvia, tiramisu with amaretto, caprese salad appetizers. United States: Tex-Mex burger, spicy fried chicken with sweet chili sauce, apple pie bars, light clam chowder, salmon caesar salad. Mexico: shrimp tacos with avocado and grapefruit, guacamole, tomales with beef and poblano, enchiladas verdes, margarita. Spain: paella catalane with seafood, gazpacho with avocado cream, churros, sardine corquettes, sangria. France: sliced baguette with anchovy chive butter and radishes, beef bourguignon, julia child's coq au vin, creme brulee, french onion soup. UK: lean shepherd's pie, scones, berry trifle, yorkshire pudding, bangers and mash. Germany: potatoes with saurkraut and smoked ham, chicken brats with root beer bbq sauce, black forest cake, caramel chocolcate pretzel bars, potato pancakes. Japan: miso soup w tin noodles, sushi, ground pork ramen, oriental filet mignon on kataifi with shrimp tempura, matcha yuzu mango popsicles with mint. China: fried rice, hot and sour soup, bbq pork bun dim sum, kung pao chicken with peanuts, coconut chow mein butterscotch cookies. India: butter chicken, veggie biryani, samosas, tandoori chicken, kashmiri rogan josh. Thailand: rosti with papaya salad, green thai curry with beef, sticky rice and mango dessert shots, pad se ew tofu, massaman curry. Vietnam: pho with zucchini, bahn mi, spring rolls, banh xeo, go kho aka caramelized chicken. Brazil: black bean feijoada, brigadeiros, pastel caprese, tapioca pudding with pineapple and coconut, pai de queijo. Greece: moussaka, marinated souvlaki, honeyed bacon baklava, greek salad, grilled chicken gyros. Turkey: kabobs, turkish delight, spinach sultana bulgur wheat boreks, simit, baharat meatballs. South Korea: kimchi, dak juk, honey citron tea cheesecake, bibimbap, bibim naengmyun. Russia: borscht, beef straganoff, blini with caviar, broth of asparagus with caviar, napoleon pastry. Poland: pierogies with onions, bigoli with soked salmon, roasted beetroot soup, polish rugelach, chicken soup";

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

  const prompt = req.body.prompt || "";

  if (prompt === []) {
    res.status(400).json({
      error: {
        message: "Please enter a valid question",
      },
    });
    return;
  }
  try {
    // Uncomment to test OpenAI server overload;
    // const simulatedErrorResponse = {
    //   response: {
    //     status: 503,
    //     data: {
    //       error: {
    //         message:
    //           "OpenAI's got-3.5-turbo model is currently overloaded with other requests. Please try again later, or explore the globe to find your next food adventure.",
    //       },
    //     },
    //   },
    // };
    // throw simulatedErrorResponse;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: generatePrompt(prompt),
    });
    res
      .status(200)
      .json({ result: completion.data.choices[0].message.content });
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

function generatePrompt(prompt) {
  return [
    {
      role: "system",
      content: `You are a helpful assistant who helps users pick the right recipe to cook. You only pick recipes from the following list. You make a recipe suggestion, briefly explain why that's a good choice, and note which country the recipe is from. The recipe list is: ${CountryAndRecipeList},`,
    },
  ].concat(prompt);
}

module.exports = router;
