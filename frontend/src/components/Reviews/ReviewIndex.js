import ReviewBox from "./ReviewBox";
import "./Review.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchRecipeReviews } from "../../store/reviews";
import NewReviewForm from "./NewReviewForm";

const ReviewIndex = ({ recipeId }) => {
  const recipeReviews = useSelector((state) =>
    Object.values(state.reviews.recipe)
  );
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchRecipeReviews(recipeId));
  }, [dispatch]);

  const composeReviewSection = () => {
    let hasWrittenReview = false;
    if (recipeReviews && sessionUser) {
      for (let i = 0; i < recipeReviews.length; i++) {
        if (recipeReviews[i].user._id === sessionUser._id) {
          hasWrittenReview = true;
        }
      }
    }
    if (sessionUser && !hasWrittenReview) {
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
      <div className="review-index-container">
        {composeReviewSection()}
        <h1 className="review-index-container-title">
          {recipeReviews.length > 0
            ? "Reviews"
            : "No reviews yet - get cookin'!"}
        </h1>
        {recipeReviews.map((review, i) => (
          <ReviewBox key={i} review={review} />
        ))}
      </div>
    </>
  );
};

export default ReviewIndex;
