import { useEffect } from "react";
import "./RecipeIndex.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import FavHeart from "../FavHeart";
import mapPin from "../../assets/icons/general-icons/icons8-map-pin-48.png";

const RecipeCard = ({ recipe, favorites }) => {
  return (
    <>
      <div className="recipe-card">
        <div className="image-placeholder">
          <img
            className="actual-image"
            src={recipe?.photoUrl}
            alt="recipe image"
          />
        </div>

        <div className="recipe-quick-info-container">
          <div>
            <div className="country-container">
              <img src={mapPin} alt="map pin" className="map-pin" />
              <h3>{recipe?.country}</h3>
            </div>
            <h1>{recipe.recipeName}</h1>
            <p>Total Duration: {recipe.prepTime} minutes</p>
          </div>
          <div id="view-recipe-and-heart-container">
            <div className="view-recipe-button">
              <Link to={`/recipes/${recipe._id}`}>VIEW RECIPE</Link>
            </div>
            <FavHeart
              recipe={recipe}
              favorites={favorites}
              className="favheart-index"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
