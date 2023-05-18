import "./RecipeShowPage.css";
import Header from "../Header/Header";
import mapPin from "../../assets/icons/general-icons/icons8-map-pin-48.png";
import FollowAlongCarousel from "../FollowAlong/FollowAlongCarousel";
import { useEffect, useState } from "react";
import Ingredients from "./Ingredients";
import AiChat from "../RecipeAssistant";
import FavHeart from "../FavHeart";
import { fetchFavorites } from "../../store/favorites";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchRecipe } from "../../store/recipes";
import Macronutrients from "./Macronutrients";
import ReviewIndex from "../Reviews/ReviewIndex";
import glutenFreeIcon from "../../assets/icons/general-icons/icons8-no-gluten-100.png";
import dairyFreeIcon from "../../assets/icons/general-icons/icons8-non-lactose-food-100.png";
import sustainableIcon from "../../assets/icons/general-icons/icons8-sustainable-100.png";
import veganIcon from "../../assets/icons/general-icons/icons8-vegan-100.png";
import vegetarianIcon from "../../assets/icons/general-icons/icons8-vegetarian-100.png";
import timerIcon from "../../assets/icons/general-icons/icons8-timer-100.png";
import plateIcon from "../../assets/icons/general-icons/icons8-plate-100.png";
import { getCurrentUser } from "../../store/session";

const RecipeShowPage = () => {
  const dispatch = useDispatch();
  const { recipeId } = useParams();
  const [tooltipOpen, setTooltipOpen] = useState(-1)

  const icons = {
    glutenFree: glutenFreeIcon,
    dairyFree: dairyFreeIcon,
    sustainable: sustainableIcon,
    vegan: veganIcon,
    vegetarian: vegetarianIcon,
  };

  const recipe = useSelector((state) =>
    state.recipes ? state.recipes[recipeId] : null
  );

  const displayTags = recipe?.tags.map((tag, i) => (
    <div key={i}>
      <img className="icon" src={icons[tag]} alt={`${tag} icon`} />
      <h2 className="tag">{tag}</h2>
    </div>
  ));

  const [toggleFollowAlong, setToggleFollowAlong] = useState(false);
  const [currentRecipeStep, setCurrentRecipeStep] = useState("");

  const sessionUser = useSelector((state) => state.session.user);

  const favorites = useSelector((state) => Object.values(state.favorites));

  useEffect(() => {
    dispatch(fetchRecipe(recipeId));
    console.log(recipe?.tags);
  }, [recipeId, dispatch]);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch, sessionUser]);



  const handleFollowAlong = () => {
    setToggleFollowAlong(true);
    setCurrentRecipeStep(recipe?.recipeInstructions[0].step);
  };

  const handleMouseLeave = (e) => {
    e.preventDefault()
    setTooltipOpen(-1)
  }

  return (
    <>
      <Header />
      <div className="below-header-container">
        <div className="recipe-show-page-container">
          <div className="details-container">
            <div className="ingredients-container">
              <h2>Ingredients</h2>
              <Ingredients ingredients={recipe?.ingredients} />
            </div>
          </div>
          <div className="main-recipe-content-container">
            {/* <h1>{recipe.name}</h1> */}
            <div className="main-recipe-info-header">
              <FavHeart recipe={recipe} favorites={favorites} />
              <h1 className="recipe-index-recipe-name">{recipe?.recipeName}</h1>
              <div>
                <img src={mapPin} alt="map pin" className="map-pin" />
                <h3>{recipe?.country}</h3>
              </div>
              <div className="image-placeholder-recipe-show">
                <img
                  className="actual-image"
                  src={recipe?.photoUrl}
                  alt="recipe image"
                />
              </div>
              <h3>Recipe by: {recipe?.recipeAuthor}</h3>

            </div>
            <div className="smaller-content-info">
              <div>
                <img className="icon" src={timerIcon} />
                <h2>Duration</h2>
                <p>{recipe?.prepTime} minutes</p>
              </div>
              <div>
                <img className="icon" src={plateIcon} />
                <h2>Servings </h2>
                <p>{recipe?.servings}</p>
              </div>
              {displayTags?.map((tag) => tag)}
            </div>

            <div>
              <h2>Directions</h2>
              <ul>
                {recipe?.recipeInstructions.map((step, i) => (
                  <li key={step?._id}>
                    {step?.number}. {step?.step}
                  </li>
                ))}
              </ul>
            </div>
            <div className="follow-along-button-container">
              <h2>Ready?</h2>
              <div className="follow-along-button" onClick={handleFollowAlong}>
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
            <div onMouseLeave={handleMouseLeave}>
              <h2>Nutrition</h2>
              <Macronutrients macronutrients={recipe?.nutrition.nutrients} tooltipOpen={tooltipOpen} setTooltipOpen={setTooltipOpen}/>
            </div>
          </div>
        </div>
        <ReviewIndex recipeId={recipeId} />
      </div>

      {toggleFollowAlong && (
        <FollowAlongCarousel
          closeFollowAlong={() => setToggleFollowAlong(false)}
          recipeSteps={recipe?.recipeInstructions}
          recipeIngredients={recipe?.ingredients}
          setCurrentRecipeStep={setCurrentRecipeStep}
          currentRecipeStep={currentRecipeStep}
          recipeId={recipeId}
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
