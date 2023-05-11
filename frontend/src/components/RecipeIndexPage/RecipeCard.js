import { useEffect } from "react";
import "./RecipeIndex.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import FavHeart from "../FavHeart";

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
            <h1>{recipe.recipeName}</h1>
            <p>Total Duration: {recipe.prepTime} minutes</p>
          </div>
          {/* <br></br> */}
          <p className="tags-p">
            Tags:{" "}
            {recipe?.tags.map((tag, i, tags) =>
              tag.value ? `${tag.name}` : ""
            )}
          </p>
          <div id="view-recipe-and-heart-container">
            <div className="view-recipe-button">
              <Link to={`/recipes/${recipe._id}`}>VIEW RECIPE</Link>
            </div>
            <FavHeart
              recipe={recipe}
              favorites={favorites}
              className="favheart-index"
            />
            {/* <FavHeart recipe={recipe} favorites={favorites} id="favheart-index" /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
