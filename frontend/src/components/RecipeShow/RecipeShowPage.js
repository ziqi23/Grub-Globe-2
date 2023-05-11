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

const RecipeShowPage = ({ recipe }) => {
  const [toggleFollowAlong, setToggleFollowAlong] = useState(false);
  const [currentRecipeStep, setCurrentRecipeStep] = useState("");
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const favorites = useSelector((state) => Object.values(state.favorites));

  useEffect(() => {
    console.log(currentRecipeStep, "current recipe step");
  }, [currentRecipeStep]);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch, sessionUser]);

  const handleFollowAlong = () => {
    setToggleFollowAlong(true);
    setCurrentRecipeStep(0);
  };
  return (
    <>
      <Header />
      <div className="below-header-container">
        {/* this is where the show page contents start */}
        <div className="recipe-show-page-container">
          <div className="details-container">
            <div>
              <h2>Duration</h2>
              <p>Prep time: 15 minutes</p>
              {/* <p>Pret time: {recipe.preptime}</p> */}
              <p>Cook time: 20 minutes</p>
              {/* <p>Cook time: {recipe.cooktime}</p> */}
            </div>
            <div className="ingredients-container">
              <h2>Ingredients</h2>
              <Ingredients />
            </div>
            {/* <div className="ingredients-container">
                            <h2>Ingredients</h2>
                            <ul> */}
            {/* {recipe.ingredients.map(ingredient => {
                                    <li>ingredient</li>
                                })} */}
            {/* <li>4 pieces <p>boneless chicken thighs</p></li>
                                <li>1/4 cup <p>soy sauce</p></li>
                                <li>1/4 cup <p>mirin</p></li>
                                <li>1/4 cup <p>sake</p> </li>
                                <li>1/4 cup <p>sugar</p></li>
                                <li>2 tbsp <p>vegetable oil</p></li>
                                <li>2 stalks <p>green onion</p></li>
                                <li>4 cups <p>cooked rice</p></li>
                            </ul>
                        </div> */}
          </div>
          <div className="main-recipe-content-container">
            {/* <h1>{recipe.name}</h1> */}
            <div className="main-recipe-info-header">
              <h1>Chicken Teriyaki Bowl</h1>
              <div>
                <img src={mapPin} alt="map pin" />
                <h3>japan</h3>
              </div>
              <div className="image-placeholder-recipe-show">
                image placeholder
              </div>
            </div>
            <div>
              <h2>Directions</h2>
              {/* <ul>
                                {recipe.directions.map((step, i) => {
                                    <li>{i}. {step}</li>
                                })}
                            </ul> */}
              <ul>
                <li>
                  1. Combine soy sauce, mirin, sake, and sugar in a small
                  saucepan and heat over medium heat until the sugar dissolves.
                  Let cool.
                </li>
                <li>
                  2. Cut chicken into bite-size pieces and sprinkle with salt
                  and pepper.
                </li>
                <li>
                  3. Heat vegetable oil in a large skillet over medium-high
                  heat. Add chicken and cook until browned on all sides.
                </li>
                <li>
                  4. Pour the teriyaki sauce over the chicken and let it simmer
                  until the sauce thickens and the chicken is cooked through.
                </li>
                <li>
                  5. Divide the rice into 4 bowls and top each bowl with the
                  chicken and teriyaki sauce.
                </li>
                <li>6. Garnish with sliced green onions.</li>
              </ul>
            </div>
            <div className="follow-along-button-container">
              <h2>Ready?</h2>
              <div
                className="follow-along-button"
                // onClick={() => setToggleFollowAlong(true)}
                onClick={handleFollowAlong}
              >
                Let's get cookin!
              </div>
            </div>
          </div>
          <div className="macros-container">
            <div>
              <h2>Macronutrients</h2>
              {/* this will probably be a separate component */}
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

      {/* {toggleFollowAlong && (
                <FollowAlongCarousel 
                    closeFollowAlong={() => setToggleFollowAlong(false)} 
                    recipeSteps={recipe.steps}
                    recipeIngredients={recipe.ingredients}/>
            )} */}
      {toggleFollowAlong && (
        <FollowAlongCarousel
          closeFollowAlong={() => setToggleFollowAlong(false)}
          setCurrentRecipeStep={setCurrentRecipeStep}
        />
      )}
      <AiChat
        recipeNameFromParent="Chicken Teriyaki Bowl"
        recipeStepFromParent={currentRecipeStep}
      />
      <FavHeart recipe={recipe} favorites={favorites} />
    </>
  );
};

export default RecipeShowPage;
