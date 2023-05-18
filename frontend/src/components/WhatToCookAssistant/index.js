import { useState } from "react";
import "./WhatToCookAssistant.css";
import jwtFetch from "../../store/jwt";
import { useEffect, useRef } from "react";
import { HiLightBulb } from "react-icons/hi";

export default function SplashAiChat() {
  const [questionInput, setQuestionInput] = useState("");
  const [pastQuestions, setPastQuestions] = useState([]);
  const [pastAnswers, setPastAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState([]);

  const chatThreadContainerRef = useRef(null);

  useEffect(() => {
    const container = chatThreadContainerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [pastQuestions, pastAnswers, isLoading]);

  const toggleChatbox = () => {
    const chatbox = document.getElementById("splash-ai-chatbox");
    chatbox.classList.toggle("hidden");
  };

  const pastQA = () => {
    const numQuestions = pastQuestions.length;
    if (numQuestions <= 0) return null;

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

  useEffect(() => {
    if (questionInput.length === 0) return;
    if (prompt.length > 6) {
      setPrompt(prompt.slice(2));
    }
    const updatedPrompt = [...prompt];
    const lastElement = updatedPrompt[updatedPrompt.length - 1];
    if (lastElement && lastElement.role === "user") {
      updatedPrompt[updatedPrompt.length - 1] = {
        role: "user",
        content: questionInput,
      };
      setPrompt(updatedPrompt);
    } else {
      setPrompt([...prompt, { role: "user", content: questionInput }]);
    }
  }, [questionInput]);

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
      if (response.status !== 200) {
        setPastQuestions((prevState) => [questionInput, ...prevState]);
        setPastAnswers((prevState) => [
          "Sorry, OpenAI's got-3.5-turbo model is currently overloaded with other requests. Please try again later, or explore the globe to find your next food adventure.",
          ...prevState,
        ]);
        setPrompt([...prompt, { role: "assistant", content: "" }]);
      }

      console.log("data.result", data.result);
      setPastQuestions((prevState) => [questionInput, ...prevState]);
      setPastAnswers((prevState) => [data.result, ...prevState]);
      setQuestionInput("");
      setPrompt([...prompt, { role: "assistant", content: data.result }]);
    } catch (error) {
      console.error(error);
      //   alert(error.message);
      //   console.log("in catch at 100");
      setPastQuestions((prevState) => [questionInput, ...prevState]);
      setPastAnswers((prevState) => [
        "Sorry, OpenAI's got-3.5-turbo model is currently overloaded with other requests. Please try again later, or explore the globe to find your next food adventure.",
        ...prevState,
      ]);
      setPrompt([...prompt, { role: "assistant", content: "" }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div id="splash-open-chatbox-button" onClick={toggleChatbox}>
        <div id="splash-hover-container">
          <div id="splash-ai-chatbubble"></div>
          <div id="splash-open-chatbox-lightbulb">{<HiLightBulb />}</div>
        </div>
      </div>
      <div id="splash-ai-chatbox" className="hidden">
        <main id="ai-chatbox-content-container">
          <h3 id="splash-recipe-assistant-header">
            Need help deciding what to cook?
          </h3>
          <div id="splash-chat-thread-container" ref={chatThreadContainerRef}>
            <div id="otherQ-list-container">{pastQA()}</div>
            {isLoading && (
              <div id="lastQ-container">
                <div id="splash-spinner-container">
                  <div id="splash-spinner"></div>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={onSubmit} id="recipe-assistant-form">
            <input
              type="text"
              name="question"
              placeholder="What are you craving? ⏎"
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
        </main>
      </div>
    </>
  );
}
