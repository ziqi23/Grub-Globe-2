import NormalStep from "./NormalStep";
import TimerStep from "./TimerStep";
import cookingUtensils from "../../assets/images/seasons-cooking-utensils.png";
import fruitsVeggies from "../../assets/images/seasons-fruits-and-vegetables-harvest.png";
import { useEffect, useState } from "react";
import upArrow from "../../assets/icons/general-icons/icons8-slide-up-64.png";
import downArrow from "../../assets/icons/general-icons/icons8-down-button-64.png";
import "./FollowAlong.css";
import Ingredients from "../RecipeShow/Ingredients";

const StepPage = ({
  step,
  stepNum,
  closeFollowAlong,
  ingredients,
  setCurrentRecipeStep,
  currentRecipeStep,
  normalStep
}) => {
  const [toggleIngredients, setToggleIngredients] = useState(false);
  // const [stepType, setStepType] = useState("normal");

  const handleToggleIngredients = () => {
    if (toggleIngredients) {
      setToggleIngredients(false);
    } else {
      setToggleIngredients(true);
    }
  };
  const handleExit = () => {
    closeFollowAlong();
    setCurrentRecipeStep("");
  };


  return (
    <>
      <div className="step-page-container">
        <img
          className="utensils-image"
          src={cookingUtensils}
          alt="cooking utensils"
        />
        <img
          className="fruits-image"
          src={fruitsVeggies}
          alt="fruit and vegetables"
        />
        <div className="exit-container">
          {/* <div onClick={closeFollowAlong}>Exit</div> */}
          <div onClick={handleExit}>Exit</div>
        </div>

        <div className="step-container">
          <div className="ingredients-toggle" onClick={handleToggleIngredients}>
            <img src={toggleIngredients ? upArrow : downArrow} alt="arrow"/>
            <p>Ingredients</p>
            {toggleIngredients && (
              <div className="step-page-ingredients-container">
                <Ingredients ingredients={ingredients} />
              </div>
            )}
          </div>
          <div className="step-number">
            <h1>Step {stepNum}</h1>
          </div>
          <div className="step-instruction">
            {/* <TimerStep /> */}
            {/* <NormalStep step={step}/> */}
            {normalStep ? <NormalStep step={step}/> : <TimerStep step={step} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default StepPage;
