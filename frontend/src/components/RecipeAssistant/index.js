import { useState } from "react";
import "./RecipeAssistant.css";
import jwtFetch from "../../store/jwt";
import { useEffect, useRef } from "react";

export default function AiChat({ recipeNameFromParent, recipeStepFromParent }) {
  const [questionInput, setQuestionInput] = useState("");
  const [recipeName, setRecipeName] = useState(recipeNameFromParent || "");
  const [recipeStep, setRecipeStep] = useState(recipeStepFromParent);
  const [result, setResult] = useState();
  const [pastQuestions, setPastQuestions] = useState([
    // "How do I submerge all the cabbage?",
    // "What is the right way to clean cabbage?",
    // "Is it safe to ferment food at room temp?",
  ]);
  const [pastAnswers, setPastAnswers] = useState([
    // "Use a heavy object like a plate to submerge food. You can also buy fermentation lids.",
    // "Remove the outer layers of cabbage and rinse the rest.",
    // "Yes, as long as you ferment food in a dark place and restrict oxygen intake, fermentation at room temp is safe.",
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const chatThreadContainerRef = useRef(null);

  useEffect(() => {
    const container = chatThreadContainerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [pastQuestions, pastAnswers, isLoading]);

  const toggleChatbox = () => {
    const chatbox = document.getElementById("ai-chatbox");
    chatbox.classList.toggle("hidden");
  };

  const pastQA = () => {
    const numQuestions = pastQuestions.length;
    if (numQuestions <= 1) return null;

    const qAndA = [];
    for (let i = numQuestions - 1; i >= 0; i--) {
      qAndA.push(
        <div id="otherQ-container" key={i}>
          <p id="otherQ-text">{pastQuestions[i]}</p>
          <h3 id="otherA-text">{pastAnswers[i]}</h3>
        </div>
      );
    }
    return qAndA;
  };

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    // setPastQuestions([questionInput, ...pastQuestions]);

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
      setPastQuestions([questionInput, ...pastQuestions]);
      setPastAnswers([data.result, ...pastAnswers]);
      setQuestionInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div id="open-chatbox-button" onClick={toggleChatbox}>
        <div id="hover-container">
          <div id="ai-chatbubble"></div>
          <h1 id="open-chatbox-questionmark">?</h1>
        </div>
      </div>
      <div id="ai-chatbox">
        <main id="ai-chatbox-content-container">
          <h3 id="recipe-assistant-header">Need help on this recipe?</h3>
          <div id="chat-thread-container" ref={chatThreadContainerRef}>
            <div id="otherQ-list-container">{pastQA()}</div>
            {isLoading && (
              <div id="lastQ-container">
                <div id="spinner-container">
                  <div id="spinner"></div>
                </div>
              </div>
            )}

            {/* {pastQuestions && !isLoading && (
              <div id="lastQ-container">
                <p id="lastQ-text">{pastQuestions[0]}</p>
                <h3 id="lastA-text">{pastAnswers[0]}</h3>
              </div>
            )} */}
          </div>
          <form onSubmit={onSubmit} id="recipe-assistant-form">
            <input
              type="text"
              name="question"
              placeholder="What's your question? ⏎"
              value={questionInput}
              maxLength="200"
              id="recipe-assistant-input"
              onChange={(e) => setQuestionInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSubmit(e);
                }
              }}
            />
            <input
              type="submit"
              value="Ask smart assistant"
              id="recipe-assistant-button"
            />
          </form>
          {/* <div id="chatbox-answer">{result}</div> */}
        </main>
      </div>
    </>
  );
}
