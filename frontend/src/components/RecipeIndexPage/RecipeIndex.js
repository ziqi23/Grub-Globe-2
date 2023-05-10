import RecipeCard from "./RecipeCard";
import "./RecipeIndex.css"

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

const RecipeIndex = ({recipes}) => {

    return (
        <div class="recipes-index">
             <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                clickable: true,
                }}
                modules={[Pagination, Navigation]}
                navigation={true}
                className="mySwiper"
            >
                {recipes.map(recipe => 
                    <SwiperSlide>
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    </SwiperSlide>
                )}
                
            </Swiper>
            {/* <RecipeCard /> */}
        </div>
    )
};
export default RecipeIndex;