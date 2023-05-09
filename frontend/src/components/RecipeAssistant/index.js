import { useState } from "react";
import "./RecipeAssistant.css";
import jwtFetch from "../../store/jwt";

export default function AiChat() {
  const [questionInput, setQuestionInput] = useState("");
  const [recipeName, setRecipeName] = useState("Saurkraut");
  const [recipeStep, setRecipeStep] = useState(
    "Ensure all cabbage is submerged in brine."
  );
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      //   const response = await fetch("/api/generate", {
      const response = await jwtFetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: questionInput,
          recipe: recipeName,
          step: recipeStep,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setQuestionInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div id="ai-chatbox">
      <main id="ai-chatbox-content-container">
        <h3>Ask for help on a recipe</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="question"
            placeholder="Enter your recipe question"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
          />
          <input type="submit" value="Ask" />
        </form>
        <div id="chatbox-answer">{result}</div>
      </main>
    </div>
  );
}
