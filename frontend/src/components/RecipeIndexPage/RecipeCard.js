import "./RecipeIndex.css"
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from "react";

// import required modules
import { Pagination, Navigation } from "swiper";


const RecipeCard = ({recipe}) => {
    const [swiperRef, setSwiperRef] = useState(null);

    return (
        <>
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
                <SwiperSlide>
                    <div className="recipe-card">
                        <div className="image-placeholder">image placeholder</div>
                        <div className="recipe-quick-info-container">
                            <h1>Recipe Name</h1>
                            <p>Total Duration: 40 minutes</p>
                            <br></br>
                            <p>Tags: Healthy</p>
                            <div className="view-recipe-button">VIEW RECIPE</div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="recipe-card" >
                        <div className="image-placeholder">image placeholder</div>
                        <div className="recipe-quick-info-container">
                            <h1>Recipe Name</h1>
                            <p>Total Duration: 40 minutes</p>
                            <br></br>
                            <p>Tags: Healthy</p>
                            <div className="view-recipe-button">VIEW RECIPE</div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="recipe-card">
                        <div className="image-placeholder">image placeholder</div>
                        <div className="recipe-quick-info-container">
                            <h1>Recipe Name</h1>
                            <p>Total Duration: 40 minutes</p>
                            <br></br>
                            <p>Tags: Healthy</p>
                            <div className="view-recipe-button">VIEW RECIPE</div>
                        </div>
                    </div></SwiperSlide>
                <SwiperSlide>
                    <div className="recipe-card">
                        <div className="image-placeholder">image placeholder</div>
                        <div className="recipe-quick-info-container">
                            <h1>Recipe Name</h1>
                            <p>Total Duration: 40 minutes</p>
                            <br></br>
                            <p>Tags: Healthy</p>
                            <div className="view-recipe-button">VIEW RECIPE</div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

           
            
            
        </>
    )
};

export default RecipeCard;