import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./FollowAlong.css";
import { Pagination, Navigation } from "swiper";
import StepPage from "./StepPage";

const FollowAlongCarousel = ({
  recipeSteps,
  closeFollowAlong,
  recipeIngredients,
  setCurrentRecipeStep,
}) => {
  const handleSlideChange = (swiper) => {
    const dummy = [
      "1. Combine soy sauce, mirin, sake, and sugar in a small saucepan and heat over medium heat until the sugar dissolves. Let cool.",
      "Cut chicken into bite-size pieces and sprinkle with salt and pepper.",
      "step3",
      "step4",
      "step5",
      "step6",
      "step7",
      "step8",
      "step9",
    ];
    // useEffect(() => {
    //   setCurrentRecipeStep(dummy[currentStep]);
    // }, activeIndex);
    console.log(swiper.activeIndex, "activeIndex");
    console.log(swiper.realIndex, "realIndex");
    const currentStep = swiper.realIndex || 0;
    // setCurrentRecipeStep(recipeSteps[currentStep]);
    setCurrentRecipeStep(dummy[currentStep]);
    console.log(dummy[currentStep], "current dummy step");
  };
  // const swiper = new Swiper(".mySwiper", {});
  // console.log(swiper.realIndex, "real index");
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
          onSlideChange={handleSlideChange}
        >
          {/* map through recipe steps and pass into StepPage */}
          {/* {recipeSteps.map((step, i) => {
              <SwiperSlide>
                <StepPage step={step} key={i} stepNum={i+1}closeFollowAlong={closeFollowAlong}/>
              </SwiperSlide>
            })} */}

          <SwiperSlide>
            <StepPage
              closeFollowAlong={closeFollowAlong}
              ingredients={recipeIngredients}
              setCurrentRecipeStep={setCurrentRecipeStep}
            />
          </SwiperSlide>
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
  );
};

export default FollowAlongCarousel;
