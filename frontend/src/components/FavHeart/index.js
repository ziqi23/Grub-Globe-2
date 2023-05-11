import { FaHeart } from "react-icons/fa";
import "./FavHeart.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteFavorite, createFavorite } from "../../store/favorites";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const FavHeart = ({ favorites, recipe }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [heartClick, setHeartClick] = useState(false);

  let fav;
  if (favorites) {
    console.log(favorites, "favorites");
    favorites.forEach((favorite) => {
      console.log(favorite.recipe, "favorite.recipe", recipe._id, "recipe._id");
      if (favorite.recipe === recipe._id) {
        fav = favorite;
        console.log(fav, "fav");
      }
    });
  }

  useEffect(() => {
    if (fav) {
      setHeartClick(true);
    }
  }, [fav, recipe]);

  if (!sessionUser)
    return (
      <div>
        <FaHeart id="recipe-heart" className="recipe-heart-unauth" />
      </div>
    );

  const handleHeartClick = async () => {
    // console.log(recipe, "recipe", sessionUser, "sessionUser");
    // dispatch(deleteFavorite("645d2da66f35ae160fc141be"));
    if (!heartClick) {
      try {
        dispatch(
          createFavorite({ recipe: recipe._id, user: sessionUser._id })
        ).then(setHeartClick(true));
      } catch (error) {
        console.error(error);
      }
    } else if (fav) {
      try {
        dispatch(deleteFavorite(fav._id));
        setHeartClick(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <FaHeart
        id="recipe-heart"
        className={heartClick ? "heart-clicked" : ""}
        onClick={handleHeartClick}
      />
    </div>
  );
};

export default FavHeart;
