import "./Review.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { HiThumbUp, HiThumbDown } from "react-icons/hi";
import { useState } from "react";
import { composeReview, clearReviewErrors } from "../../store/reviews";
import StarRatingInput from "./stars";
import defaultPicture from "../Profile/default-profile.png";
import { useEffect } from "react";
import { fetchRecipeReviews } from "../../store/reviews";

const NewReviewForm = ({ recipeId }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [wouldMakeAgain, setWouldMakeAgain] = useState(true);
  const [wouldRecommend, setWouldRecommend] = useState(true);
  const [starRating, setStarRating] = useState(5);
  //   const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [clickedMakeAgain, setClickedMakeAgain] = useState(false);
  const [clickedRecommend, setClickedRecommend] = useState(false);
  const errors = useSelector((state) => state.errors.reviews);

  useEffect(() => {
    return () => dispatch(clearReviewErrors());
  }, [dispatch]);

  let bufferArr;
  let image;
  if (sessionUser?.photo) {
    bufferArr = new Uint8Array(sessionUser.photo.data);
    image = Buffer.from(bufferArr).toString("base64");
  }

  const onStarClick = (number) => {
    setStarRating(parseInt(number));
  };

  const handleMakeAgainClick = (val) => {
    setWouldMakeAgain(val);
    setClickedMakeAgain(true);
    setTimeout(() => setClickedMakeAgain(false), 1000);
  };

  const handleRecommendClick = (val) => {
    setWouldRecommend(val);
    setClickedRecommend(true);
    setTimeout(() => setClickedRecommend(false), 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      title,
      text,
      wouldMakeAgain,
      wouldRecommend,
      starRating,
      recipe: recipeId,
    };
    dispatch(composeReview(review)).then(() => {
      dispatch(fetchRecipeReviews(recipeId));
    });
  };

  return (
    <>
      <h1 id="write-review-title">You cooked this - write a review!</h1>
      <div className="review-box-container">
        <div className="review-user-info">
          <div className="circle">
            <img
              className="review-profile-picture-file"
              src={
                image ? `data:image/image/png;base64,${image}` : defaultPicture
              }
            />
          </div>
        </div>

        <form id="new-review-form" onSubmit={handleSubmit}>
          <div id="new-review-ratings-inputs">
            <div className="star-and-title-container">
              {/* <p className="form-field-title-stars">Rating</p> */}
              <div id="form-input-accuracy">
                <StarRatingInput
                  disabled={false}
                  s
                  onChange={onStarClick}
                  rating={starRating}
                />
              </div>
            </div>
            <div className="thumbs-container">
              <h2>Would you make this again?</h2>
              <div className="thumbs-buttons-container">
                <HiThumbUp
                  onClick={() => handleMakeAgainClick(true)}
                  //   className={
                  //     wouldMakeAgain ? "thumb-clicked" : "thumb-unclicked"
                  //   }
                  className={`${
                    wouldMakeAgain ? "thumb-clicked" : "thumb-unclicked"
                  } ${clickedMakeAgain && wouldMakeAgain ? "btn-bigger" : ""}`}
                />
                <HiThumbDown
                  onClick={() => handleMakeAgainClick(false)}
                  //   className={
                  //     !wouldMakeAgain ? "thumb-clicked" : "thumb-unclicked"
                  //   }
                  className={`${
                    !wouldMakeAgain ? "thumb-clicked" : "thumb-unclicked"
                  } ${clickedMakeAgain && !wouldMakeAgain ? "btn-bigger" : ""}`}
                />
              </div>
            </div>
            <div className="thumbs-container">
              <h2>Would you recommend this?</h2>
              <div className="thumbs-buttons-container">
                <HiThumbUp
                  onClick={() => handleRecommendClick(true)}
                  //   className={
                  //     wouldRecommend ? "thumb-clicked" : "thumb-unclicked"
                  //   }
                  className={`${
                    wouldRecommend ? "thumb-clicked" : "thumb-unclicked"
                  } ${clickedRecommend && wouldRecommend ? "btn-bigger" : ""}`}
                />
                <HiThumbDown
                  onClick={() => handleRecommendClick(false)}
                  //   className={
                  //     !wouldRecommend ? "thumb-clicked" : "thumb-unclicked"
                  //   }
                  className={`${
                    !wouldRecommend ? "thumb-clicked" : "thumb-unclicked"
                  } ${clickedRecommend && !wouldRecommend ? "btn-bigger" : ""}`}
                />
              </div>
            </div>
          </div>
          <div id="new-review-text-inputs">
            <input
              type="text"
              id="new-review-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title your review..."
            />
            {errors && <div className="errors">{errors?.title}</div>}
            <textarea
              placeholder="Write a review..."
              id="new-review-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            {errors && <div className="errors">{errors?.text}</div>}
          </div>
          <button id="new-review-submit" type="submit">
            Post review!
          </button>
        </form>
      </div>
    </>
  );
};

export default NewReviewForm;
