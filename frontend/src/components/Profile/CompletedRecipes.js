// import "./CompletedRecipes.css";
import mapPin from "../../assets/icons/general-icons/icons8-map-pin-48.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FavoritesTile from "./FavoritesTile";
import "./FavoritesTile.css"

const CompletedRecipes = ({recipes}) => {
  const history = useHistory();
  return(
    <>
      {recipes.map((recipe) => 
          <FavoritesTile recipe={recipe} />
        // <div
        //   onClick={() => history.push(`/recipes/${recipe.recipe._id}`)}
        //   id="completed-recipe-tile-container"
        //   key={recipe._id}
        // >
        //   <div className="image-placeholder">
        //     <img
        //       className="actual-image"
        //       src={recipe.recipe.photoUrl}
        //       alt="recipe image"
        //     />
        //   </div>
        //   <div className="country-container">
        //     <img src={mapPin} alt="map pin" className="map-pin" />
        //     <h3>{recipe.recipe.country}</h3>
        //   </div>
        //   <h1>{recipe.recipe.recipeName}</h1>
        // </div>
      
    )}
    </>
  )
}

export default CompletedRecipes;
