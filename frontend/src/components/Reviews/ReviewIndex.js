import ReviewBox from "./ReviewBox";
import "./Review.css"
const ReviewIndex = (props) => {
    // fetch all reviews for a recipe
    const reviews = [
        { 0: {
            title: "Delicious recipe",
            description: "This was one of the best recipes I've ever tried. I loved it so much. I'll make it again for my mom",
            rating: 5,
            wouldRecommend: true
        }, 1: {
            title: "Wow, just amazing",
            description: "I have no other words. You all need to try this recipe",
            rating: 5,
            wouldRecommend: true
        }}
    ]
    return (
        <>
        <div className="review-index-container">
            <h1 className="review-index-container-title">Reviews</h1>
            {reviews.map((review, i) => (
                <ReviewBox key={i} review={review} />
            ))}
        </div>

        </>
    )
};

export default ReviewIndex;