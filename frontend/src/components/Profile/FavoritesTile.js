import "./FavoritesTile.css";
import mapPin from "../../assets/icons/general-icons/icons8-map-pin-48.png";

const FavoritesTile = ({ recipe }) => {
  return (
    <>
      <div id="favorites-tile-container">
        <div className="image-placeholder">
          <img
            className="actual-image"
            src={recipe?.photoUrl}
            alt="recipe image"
          />
        </div>
        <div className="country-container">
          <img src={mapPin} alt="map pin" className="map-pin" />
          <h3>{recipe?.country}</h3>
        </div>
        <h1>{recipe.recipeName}</h1>
      </div>
    </>
  );
};

export default FavoritesTile;
