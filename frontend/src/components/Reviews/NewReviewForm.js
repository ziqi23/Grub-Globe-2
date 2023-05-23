import "./Review.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { HiThumbUp, HiThumbDown } from "react-icons/hi";
import { useState } from "react";
import { composeReview, clearReviewErrors } from "../../store/reviews";
import { FaGrinStars } from "react-icons/fa";
import StarRatingInput from "./stars";
import defaultPicture from "../Profile/default-profile.png";
import { useEffect } from "react";
import { fetchRecipeReviews } from "../../store/reviews";
import { updateReview } from "../../store/reviews";
import ReviewBox from "./ReviewBox";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { deleteReview } from "../../store/reviews";

const NewReviewForm = ({ recipeId, message, review }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [wouldMakeAgain, setWouldMakeAgain] = useState(true);
  const [wouldRecommend, setWouldRecommend] = useState(true);
  const [starRating, setStarRating] = useState(5);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [clickedMakeAgain, setClickedMakeAgain] = useState(false);
  const [clickedRecommend, setClickedRecommend] = useState(false);
  const errors = useSelector((state) => state.errors.reviews);
  const Buffer = require("buffer/").Buffer;
  const [updateReviewClicked, setUpdateReviewClicked] = useState(false);

  useEffect(() => {
    return () => dispatch(clearReviewErrors());
  }, [dispatch]);

  let bufferArr;
  let image;
  if (sessionUser?.photo) {
    bufferArr = new Uint8Array(sessionUser.photo.data);
    image = Buffer.from(bufferArr).toString("base64");
  }

  useEffect(() => {
    if (review) {
      setTitle(review.title);
      setText(review.text);
      setWouldMakeAgain(review.wouldMakeAgain);
      setWouldRecommend(review.wouldRecommend);
      setStarRating(review.starRating);
    }
  }, [review]);

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

  const editButtons = () => {
    if (review) {
      return (
        <div className="update-buttons">
          <MdCancel
            id="review-cancel-icon"
            onClick={() => {
              setUpdateReviewClicked(true);
            }}
          />
          <AiTwotoneDelete
            id="review-delete-icon"
            onClick={handleReviewDelete}
          />
        </div>
      );
    }
  };

  const handleReviewDelete = () => {
    dispatch(deleteReview(review._id)).then(() => {
      dispatch(fetchRecipeReviews(review.recipe));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewContents = {
      title,
      text,
      wouldMakeAgain,
      wouldRecommend,
      starRating,
      recipe: recipeId,
    };

    if (review) {
      dispatch(updateReview(reviewContents, review._id)).then(() => {
        dispatch(fetchRecipeReviews(recipeId));
        setUpdateReviewClicked(true);
      });
    } else {
      dispatch(composeReview(reviewContents)).then(() => {
        dispatch(fetchRecipeReviews(recipeId));
      });
    }
  };

  if (updateReviewClicked) {
    return <ReviewBox review={review} />;
  }

  return (
    <>
      <h1 id="write-review-title">{message}</h1>
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
              <div id="form-input-accuracy">
                <StarRatingInput
                  disabled={false}
                  onChange={onStarClick}
                  rating={starRating}
                  icon={<FaGrinStars />}
                />
              </div>
            </div>
            <div className="thumbs-container">
              <h2>Would you make this again?</h2>
              <div className="thumbs-buttons-container">
                <HiThumbUp
                  onClick={() => handleMakeAgainClick(true)}
                  className={`${
                    wouldMakeAgain ? "thumb-clicked" : "thumb-unclicked"
                  } ${clickedMakeAgain && wouldMakeAgain ? "btn-bigger" : ""}`}
                />
                <HiThumbDown
                  onClick={() => handleMakeAgainClick(false)}
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
                  className={`${
                    wouldRecommend ? "thumb-clicked" : "thumb-unclicked"
                  } ${clickedRecommend && wouldRecommend ? "btn-bigger" : ""}`}
                />
                <HiThumbDown
                  onClick={() => handleRecommendClick(false)}
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
            {errors && errors.title && (
              <div className="errors">{errors?.title}</div>
            )}
            <textarea
              placeholder="What did you think?"
              id="new-review-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            {errors && errors.text && (
              <div className="errors">{errors?.text}</div>
            )}
            {errors && errors.recipe && (
              <div className="errors">{errors?.recipe}</div>
            )}
          </div>
          <div id="review-edit-buttons-container">
            {editButtons()}
            <button id="new-review-submit" type="submit">
              {review ? "Update review!" : "Post review!"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewReviewForm;
