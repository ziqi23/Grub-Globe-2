const { Configuration, OpenAIApi } = require("openai");

const express = require("express");
const router = express.Router();
const { openaiApiKey } = require("../../config/keys");

const configuration = new Configuration({
  apiKey: openaiApiKey,
});
const openai = new OpenAIApi(configuration);

const CountryAndRecipeList = "";

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
  //   console.log(generatePrompt(prompt), "prompt");

  if (prompt === []) {
    res.status(400).json({
      error: {
        message: "Please enter a valid question",
      },
    });
    return;
  }

  try {
    console.log(prompt, "prompt in backend");
    const completion = await openai.createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages: generatePrompt(prompt),
      }
      //   (model = "gpt-3.5-turbo"),
      //   (messages = generatePrompt(question))
    );
    // res.status(200).json({ result: completion.data.choices[0].text }); response["choices"][0]["message"]["content"];
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
      content:
        "You are a helpful assistant who helps users pick the right recipe to cook, from the following exact list of recipe options. You make a recipe suggestion, briefly explain why that's a good choice, and note which country the recipe is from. The recipe list is: United States: Hamburger, Fried chicken, Apple pie, Clam chowder, Caesar salad, Mexico: Tacos, Guacamole, Tamales, Enchiladas, Margarita", //, Italy: Osso buco, Lasagna, Tiramisu, Caprese salad, Risotto, Spain: Paella, Gazpacho, Churros, Croquetas, Sangria, France: Baguette, Beef bourguignon, Coq a vin, Creme brulee, French onion soup, United Kingdom: Bangers and mash, Shepherd’s pie, Full English breakfast, Trifle, Yorkshire pudding, Germany: Bratwurst, Sauerkraut, Black forest cake, Pretzel, Beer, Japan: Sushi, Ramen, Tempura, Miso soup, Matcha, China: Fried rice, Hot and sour soup, Dim sum, Kung pao chicken, Chow mein, India: Butter chicken, Biryani, Samosas, Tandoori chicken, Rogan josh, Thailand: Papaya salad, Green curry, Mango sticky rice, Pad see ew, Massaman curry, Vietnam: Pho, Banh mi, Spring rolls, Com tam, Ca kho to, Brazil: Feijoada, Brigadeiro, Pastel, Tapioca, Peru: Ceviche, Lomo saltado, Aji de gallina, Anticuchos, Pisco sour, Greece: Moussaka, Souvlaki, Tzatziki, Baklava, Greek salad, Turkey: Doner kebab, Dolma, Baklava, Manti, Turkish tea, Morocco: Couscous, Harira soup, Pastilla, Mint tea, Lebanon: Shawarma, Tabouleh, Hummus, Falafel, South Korea: Kimchi, Bulgogi, Bibimbap, Japchae, Sikhae, Ethiopia: Injera, Doro wat, Kitfo, Tibs, Shiro, South Africa: Bobotie, Biltong, Bunny chow, Melktert, Potjiekos, Australia: Vegemite on toast, Pavlova, Meat pie, Lamingtons, Anzac biscuits, Russia: Borscht, Pelmeni, Beef stroganoff, Blini, Pirozhki, Sweden: Meatballs (Köttbullar), Gravlax, Knäckebröd (Crispbread), Princess cake (Prinsesstårta), Ärtsoppa (Pea soup), Indonesia: Nasi goreng (Fried rice), Satay, Rendang, Gado-gado (Salad with peanut sauce), Bakso (Meatball soup), Iran: Chelow kabab (Rice with kabab), Ghormeh sabzi (Herb stew), Fesenjan (Pomegranate walnut stew), Ash-e reshteh (Noodle soup), Tahdig (Crispy rice), Poland: Pierogi (Dumplings), Bigos (Sauerkraut and fresh cabbage stew), Placki ziemniaczane (Potato pancakes), Barszcz (Beet soup), Żurek (Sour rye soup), Canada: Poutine, Butter tarts, Nanaimo bars, Tourtière (Meat pie), Caesar (Cocktail)",
    },
  ].concat(prompt);
  //     { role: "user", content: question },
  //     // {
  //     //   role: "assistant",
  //     //   content: "The Los Angeles Dodgers won the World Series in 2020.",
  //     // },
  //     // { role: "user", content: "Where was it played?" },
  //   ];
}

module.exports = router;
