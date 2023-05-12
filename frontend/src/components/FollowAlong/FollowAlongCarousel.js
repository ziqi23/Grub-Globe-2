import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./FollowAlong.css";
import { Pagination, Navigation } from "swiper";
import StepPage from "./StepPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";

const FollowAlongCarousel = ({
  recipeSteps,
  closeFollowAlong,
  recipeIngredients,
  setCurrentRecipeStep,
  currentRecipeStep,
  recipeId
}) => {
  const handleSlideChange = (swiper) => {
    const currentStep = swiper.realIndex || 0;
    setCurrentRecipeStep(recipeSteps[currentStep].step);
  };

  const lastStep = recipeSteps[recipeSteps.length - 1];

  const checkIfLastStep = (step) => {
    if (step === lastStep.step) {
      return true
    } else {
      return false
    }
  }

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
          {recipeSteps?.map((step, i) => (
            <SwiperSlide>
              <StepPage
                step={step.step}
                key={i}
                stepNum={step.number}
                closeFollowAlong={closeFollowAlong}
                setCurrentRecipeStep={setCurrentRecipeStep}
                ingredients={recipeIngredients}
                currentRecipeStep={currentRecipeStep}
                lastStep={checkIfLastStep(step.step)}
                recipeId={recipeId}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default FollowAlongCarousel;
