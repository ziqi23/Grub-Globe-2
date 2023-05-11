import { FaHeart } from "react-icons/fa";
import "./FavHeart.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteFavorite, createFavorite } from "../../store/favorites";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const FavHeart = ({ favorites }) => {
  //remove recipe for now
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [heartClick, setHeartClick] = useState(false);
  const recipe = { id: 1 };
  let fav;

  if (favorites) {
    favorites.forEach((favorite) => {
      if (favorite.recipe._id === recipe.id) {
        fav = favorite;
      }
    });
  }

  useEffect(() => {
    if (fav) {
      setHeartClick(true);
    }
  }, [fav, recipe.id]);

  if (!sessionUser)
    return (
      <div>
        <FaHeart id="recipe-heart" className="recipe-heart-unauth" />
      </div>
    );

  const handleHeartClick = async () => {
    if (!heartClick) {
      try {
        dispatch(createFavorite({ recipe: recipe }));
        setHeartClick(true);
      } catch (error) {
        console.error(error);
      }
    } else if (fav) {
      try {
        dispatch(deleteFavorite(fav.id));
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
