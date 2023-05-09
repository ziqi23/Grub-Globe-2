import { useState } from "react";
import "./RecipeAssistant.css";

export default function Home() {
  const [questionInput, setQuestionInput] = useState("");
  const [recipeName, setRecipeName] = useState("Saurkraut");
  const [recipeStep, setRecipeStep] = useState(
    "Ensure all cabbage is submerged in brine."
  );
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    // setRecipeName("Saurkraut");
    // setRecipeStep("Ensure all cabbage is submerged in brine.");
    try {
      const response = await fetch("/api/generate", {
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
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Ask for help on a recipe</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="question"
            placeholder="Enter your question"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
          />
          <input type="submit" value="Answer" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
