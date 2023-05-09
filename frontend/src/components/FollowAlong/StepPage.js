import NormalStep from "./NormalStep";
import TimerStep from "./TimerStep";
import cookingUtensils from "../../assets/images/seasons-cooking-utensils.png"
import fruitsVeggies from "../../assets/images/seasons-fruits-and-vegetables-harvest.png"
import { useState } from "react";
import upArrow from '../../assets/icons/general-icons/icons8-slide-up-64.png'
import downArrow from '../../assets/icons/general-icons/icons8-down-button-64.png'
import "./FollowAlong.css"
import Ingredients from "../RecipeShow/Ingredients";

const StepPage = ({step, stepNum, closeFollowAlong, ingredients}) => {
    const [toggleIngredients, setToggleIngredients] = useState(false)

    const handleToggleIngredients = () => {
        if (toggleIngredients) {
            setToggleIngredients(false)
        } else {
            setToggleIngredients(true)
        }
    }
    // algorithm for checking if normal step or timer step - return step type (normal/timer)

    return (
        <>
            <div className="step-page-container">
                <img className="utensils-image" src={cookingUtensils} alt="cooking utensils" />
                <img className="fruits-image" src={fruitsVeggies} alt="fruit and vegetables" />
                <div className="exit-container">
                    <div onClick={closeFollowAlong}>Exit</div>
                </div>

                <div className="step-container">
                    <div className="ingredients-toggle" onClick={handleToggleIngredients}>
                        <img src={toggleIngredients ? upArrow : downArrow} />
                        <p>Ingredients</p> 
                        {toggleIngredients && (
                            <div className="step-page-ingredients-container">
                                <Ingredients ingredients={ingredients} />
                            </div>
                        )}
                    </div>
                    <div className="step-number">
                        <h1>Step 1</h1>
                    </div>
                    <div className="step-instruction">
                        <TimerStep />
                    </div>
                    {/* {stepType === "normal" ? <NormalStep step={step} stepNum={stepNum}/> : <TimerStep step={step} stepNum={stepNum} />} */}
                </div>

                {/* <div className="event-listener-options">
                    <p>Use arrow keys bkjadhs</p>
                </div> */}
            </div>
        </>
    )
};

export default StepPage;