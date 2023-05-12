import { FaHeart } from "react-icons/fa";
import "./FavHeart.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteFavorite, createFavorite } from "../../store/favorites";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchFavorites } from "../../store/favorites";

const FavHeart = ({ favorites, recipe }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [heartClick, setHeartClick] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  let fav;
  if (favorites) {
    favorites.forEach((favorite) => {
      if (favorite.recipe === recipe?._id) {
        fav = favorite;
      }
    });
  }

  useEffect(() => {
    if (fav) {
      setHeartClick(true);
    } else {
      setHeartClick(false);
    }
  }, [fav, recipe, favorites]);

  if (!sessionUser)
    return (
      <div id="heart-div">
        <FaHeart id="recipe-heart" className="recipe-heart-unauth" />
      </div>
    );

  const handleHeartClick = async () => {
    if (!fav && !buttonDisabled) {
      try {
        dispatch(createFavorite({ recipe: recipe._id })).then(
          dispatch(fetchFavorites())
        );
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setButtonDisabled(false);
        }, 1000);
      }
    } else if (fav && !buttonDisabled) {
      try {
        dispatch(deleteFavorite(fav._id)).then(dispatch(fetchFavorites()));
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setButtonDisabled(false);
        }, 1000);
      }
    }
  };

  return (
    <div id="heart-div">
      <FaHeart
        id="recipe-heart"
        className={heartClick ? "heart-clicked" : ""}
        onClick={handleHeartClick}
        disabled={buttonDisabled}
      />
    </div>
  );
};

export default FavHeart;
