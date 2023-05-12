import ReviewBox from "./ReviewBox";
import "./Review.css";
// import { use } from "../../../../backend/app";
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

  useEffect(() => {
    dispatch(fetchRecipeReviews(recipeId));
  }, [dispatch]);
  //   const reviews = [
  //     {
  //       0: {
  //         title: "Delicious recipe",
  //         description:
  //           "This was one of the best recipes I've ever tried. I loved it so much. I'll make it again for my mom",
  //         rating: 5,
  //         wouldRecommend: true,
  //       },
  //       1: {
  //         title: "Wow, just amazing",
  //         description: "I have no other words. You all need to try this recipe",
  //         rating: 5,
  //         wouldRecommend: true,
  //       },
  //     },
  //   ];
  return (
    <>
      <div className="review-index-container">
        <NewReviewForm recipeId={recipeId} />
        <h1 className="review-index-container-title">Reviews</h1>
        {recipeReviews.map((review, i) => (
          <ReviewBox key={i} review={review} />
        ))}
      </div>
    </>
  );
};

export default ReviewIndex;
