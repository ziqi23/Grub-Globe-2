import ReviewBox from "./ReviewBox";
import "./Review.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRecipeReviews } from "../../store/reviews";
import NewReviewForm from "./NewReviewForm";
import { getCurrentUser } from "../../store/session";

const ReviewIndex = ({ recipeId }) => {
  const recipeReviews = useSelector((state) =>
    Object.values(state.reviews.recipe)
  );
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [hasCompletedRecipe, setHasCompletedRecipe] = useState(false)

  useEffect(() => {
    dispatch(fetchRecipeReviews(recipeId));
    dispatch(getCurrentUser())
  }, [dispatch]);

  useEffect(() => {
    sessionUser?.completedRecipe.forEach((recipe) => {
      if (recipe?.recipeId === recipeId) setHasCompletedRecipe(true)
    }) 
  }, [dispatch, hasCompletedRecipe, sessionUser])

  const composeReviewSection = () => {
    let hasWrittenReview = false;
    if (recipeReviews && sessionUser) {
      for (let i = 0; i < recipeReviews.length; i++) {
        if (recipeReviews[i].user._id === sessionUser._id) {
          hasWrittenReview = true;
        }
      }
    }

    if (sessionUser && !hasWrittenReview && hasCompletedRecipe) {
      return (
        <NewReviewForm
          recipeId={recipeId}
          message={"You cooked this - write a review!"}
        />
      );
    }
  };

  return (
    <>
        {composeReviewSection()}
        <h1 className="review-index-container-title">
          {recipeReviews.length > 0
            ? "Reviews"
            : "No reviews yet - get cookin'!"}
        </h1>
      <div className="review-index-container">
        {recipeReviews.map((review, i) => (
          <ReviewBox key={i} review={review} />
        ))}
      </div>
    </>
  );
};

export default ReviewIndex;
