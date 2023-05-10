import "./RecipeShowPage.css";
import Header from "../Header/Header";
import mapPin from "../../assets/icons/general-icons/icons8-map-pin-48.png";
import FollowAlongCarousel from "../FollowAlong/FollowAlongCarousel";
import { useEffect, useState } from "react";
import Ingredients from "./Ingredients";
import AiChat from "../RecipeAssistant";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipe } from "../../store/recipes";
import Macronutrients from "./Macronutrients";

const RecipeShowPage = () => {
  const dispatch = useDispatch();
  const { recipeId } = useParams();

  const recipe = useSelector(state => state.recipes ? state.recipes[recipeId] : null)

  const [toggleFollowAlong, setToggleFollowAlong] = useState(false);
  const [currentRecipeStep, setCurrentRecipeStep] = useState("");

  useEffect(() => {
    dispatch(fetchRecipe(recipeId));
  }, [recipeId, dispatch]);

  const handleFollowAlong = () => {
    setToggleFollowAlong(true);
    setCurrentRecipeStep(0);
  };

  return (
    <>
      <Header />
      <div className="below-header-container">
        <div className="recipe-show-page-container">
          <div className="details-container">
            <div className="ingredients-container">
              <h2>Ingredients</h2>
              <Ingredients ingredients={recipe?.ingredients}/>
            </div>
          </div>
          <div className="main-recipe-content-container">
            {/* <h1>{recipe.name}</h1> */}
            <div className="main-recipe-info-header">
              <h1>{recipe?.recipeName}</h1>
              <div>
                <img src={mapPin} alt="map pin" />
                <h3>{recipe?.country}</h3>
              </div>
              <div className="image-placeholder-recipe-show">
                image placeholder
              </div>
              <h3>Recipe by: {recipe?.recipeAuthor}</h3>
              <p className="tags-p">Tags: {recipe?.tags.map((tag, i, tags) => i === (tags.length - 1) ? `${tag.name}` :`${tag.name}, `)}</p>
            </div>
            <div className="smaller-content-info">
                <div>
                  <h2>Duration</h2>
                  <p>{recipe?.prepTime} minutes</p>
                </div>
                <div>
                  <h2>Servings </h2>
                  <p>{recipe?.servings}</p>
                </div>
            </div>
            
            <div>
              <h2>Directions</h2>
              <ul>
                  {recipe?.recipeInstructions.map((step, i) => (
                      <li key={step?._id}>{step?.number}. {step?.step}</li>
                  ))}
              </ul>
            </div>
            <div className="follow-along-button-container">
              <h2>Ready?</h2>
              <div
                className="follow-along-button"
                onClick={handleFollowAlong}
              >
                Let's get cookin!
              </div>
            </div>
            {/* <div className="youtube-links-container">
                {recipe?.youtubeLinks.map((link, i) => 
                  <iframe src={link}></iframe>
                )}
            </div> */}
          </div>
          <div className="macros-container">
            <div>
              <h2>Macronutrients</h2>
              {/* this will probably be a separate component */}
              <Macronutrients macronutrients={recipe?.nutrition.nutrients} />
              <p>Protein</p>
              <div className="macro-bar-1"></div>
              <p>Carbohydrates</p>
              <div className="macro-bar-2"></div>
              <p>Fat</p>
              <div className="macro-bar-1"></div>
              <p>Potassium</p>
              <div className="macro-bar-3"></div>
              <p>Magnesium</p>
              <div className="macro-bar-2"></div>
            </div>
          </div>
        </div>
      </div>

      {toggleFollowAlong && (
          <FollowAlongCarousel 
              closeFollowAlong={() => setToggleFollowAlong(false)} 
              recipeSteps={recipe.recipeInstructions}
              recipeIngredients={recipe.ingredients}
              setCurrentRecipeStep={setCurrentRecipeStep} 
          />
      )}

      <AiChat
        recipeNameFromParent={recipe?.recipeName}
        recipeStepFromParent={currentRecipeStep}
      />
    </>
  );
};

export default RecipeShowPage;
