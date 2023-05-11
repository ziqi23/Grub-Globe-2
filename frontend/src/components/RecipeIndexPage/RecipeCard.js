import { useEffect } from "react";
import "./RecipeIndex.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const RecipeCard = ({recipe}) => {

    return (
        <>
            <div className="recipe-card">
                <div className="image-placeholder">
                    <img className="actual-image" src={recipe?.photoUrl} alt="recipe image"/>
                </div>
                    
                <div className="recipe-quick-info-container">
                    <div>
                        <h1>{recipe.recipeName}</h1>
                        <p>Total Duration: {recipe.prepTime} minutes</p>
                    </div>
                    {/* <br></br> */}
                    <p className="tags-p">Tags: {recipe?.tags.map((tag, i, tags) => tag.value ? `${tag.name}` : "")}</p>
                    <div className="view-recipe-button"><Link to={`/recipes/${recipe._id}`}>VIEW RECIPE</Link></div>
                </div>
            </div>
        </>
    )
};

export default RecipeCard;