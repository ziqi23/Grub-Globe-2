import React from "react";
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
    const currentStep = swiper.realIndex || 0;
    setCurrentRecipeStep(recipeSteps[currentStep]);
  };

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
          {recipeSteps.map((step, i) => (
              <SwiperSlide>
                <StepPage 
                  step={step.step} 
                  key={i} 
                  stepNum={step.number}
                  closeFollowAlong={closeFollowAlong} 
                  setCurrentRecipeStep={setCurrentRecipeStep}
                  ingredients={recipeIngredients}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default FollowAlongCarousel;
