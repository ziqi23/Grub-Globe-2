import RecipeCard from "./RecipeCard";
import "./RecipeIndex.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "../../store/favorites";
import Spinner from "../SearchBar/Spinner";

const RecipeIndex = ({ recipes }) => {
  const favorites = useSelector((state) => Object.values(state.favorites));
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch, sessionUser]);

  console.log(recipes, 'recipes')
  return (
    recipes.length > 0 ? 
    <div class="recipes-index">
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          1160: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          800: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          420: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        navigation={true}
        className="mySwiper"
      >
        {recipes.map((recipe) => (
          <SwiperSlide>
            <RecipeCard key={recipe.id} recipe={recipe} favorites={favorites} />
          </SwiperSlide>
        ))}
      </Swiper> 
      {/* <RecipeCard /> */}
    </div> : <p className="error-message">No results found, try something else!</p>
  );
};
export default RecipeIndex;
