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
  currentRecipeStep,
}) => {
  const handleSlideChange = (swiper) => {
    const currentStep = swiper.realIndex || 0;
    setCurrentRecipeStep(recipeSteps[currentStep].step);
  };

  // analyzeStep function determines if the step is a normalStep or timerStep
  const analyzeStep = (step) => {
    const timerKeywords = ["seconds", "second", "minute", "minutes", "hour", "hours"]
    for (let i = 0; i < timerKeywords.length; i++) {
      if (step.includes(timerKeywords[i])) {
        return false //timer step
      }
    }
    return true // normal step
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
                normalStep={analyzeStep(step.step)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default FollowAlongCarousel;
