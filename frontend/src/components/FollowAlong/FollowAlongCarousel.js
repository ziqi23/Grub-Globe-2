import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './FollowAlong.css'
import { Pagination, Navigation } from "swiper";
import StepPage from "./StepPage";

const FollowAlongCarousel = ({recipeSteps, closeFollowAlong, recipeIngredients}) => {

    return (
        <>
        <div className="follow-along-carousel">
          <Swiper
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {/* map through recipe steps and pass into StepPage */}
            {/* {recipeSteps.map((step, i) => {
              <SwiperSlide>
                <StepPage step={step} key={i} stepNum={i+1}closeFollowAlong={closeFollowAlong}/>
              </SwiperSlide>
            })} */}

            <SwiperSlide><StepPage closeFollowAlong={closeFollowAlong} ingredients={recipeIngredients}/></SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>

        </div>
      </>
    )
};

export default FollowAlongCarousel;