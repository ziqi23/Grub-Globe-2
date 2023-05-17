import "./Review.css";
import { HiThumbUp, HiThumbDown } from "react-icons/hi";
import StarRatingInput from "./stars";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AiTwotoneEdit } from "react-icons/ai";
import { FaGrinStars } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { fetchRecipeReviews } from "../../store/reviews";
import defaultPicture from "../Profile/default-profile.png";
import NewReviewForm from "./NewReviewForm";

const ReviewBox = ({ review }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const Buffer = require("buffer/").Buffer;
  const [editClicked, setEditClicked] = useState(false);

  let bufferArr;
  let image;
  if (review.user.profilePhoto) {
    bufferArr = new Uint8Array(review.user.profilePhoto.data);
    image = Buffer.from(bufferArr).toString("base64");
  }

  const handleReviewDelete = () => {
    console.log(review.recipe, "recipe", review, "review");
    dispatch(deleteReview(review._id)).then(() => {
      dispatch(fetchRecipeReviews(review.recipe));
    });
  };

  const editButtons = () => {
    if (sessionUser && sessionUser._id === review.user._id) {
      return (
        <div className="edit-buttons">
          <AiTwotoneEdit
            id="review-edit-icon"
            onClick={() => {
              setEditClicked(true);
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

  if (editClicked) {
    return (
      <NewReviewForm
        recipeId={review.recipe}
        message={"Update your review"}
        review={review}
      />
    );
  } else {
    return (
      <>
        <div className="review-box-container">
          <div className="review-user-info">
            <div className="circle">
              <img
                className="review-profile-picture-file"
                src={
                  image
                    ? `data:image/image/png;base64,${image}`
                    : defaultPicture
                }
              />
            </div>
            <h1 id="past-review-username">
                {review.user.username}
              </h1>
          </div>

          <div id="past-review-container">
            <div id="new-review-ratings-inputs">
              <div className="star-and-title-container">
                <div id="form-input-accuracy" className="review-unclickable">
                  <StarRatingInput disabled={true} rating={review.starRating} icon={<FaGrinStars />}/>
                </div>
              </div>
             
            </div>
            <div id="new-review-text-inputs">

              <h1 id="past-review-title">{review.title}</h1>
              <p id="past-review-text">{review.text}</p>

              <div className="thumbs-container">
                <h2>Would you make this again?</h2>
                <div className="thumbs-buttons-container">
                  <HiThumbUp
                    className={`${
                      review.wouldMakeAgain
                        ? "thumb-clicked"
                        : "thumb-unclicked"
                    } review-unclickable`}
                  />
                  <HiThumbDown
                    className={`${
                      !review.wouldMakeAgain
                        ? "thumb-clicked"
                        : "thumb-unclicked"
                    } review-unclickable`}
                  />
                </div>
              </div>
              <div className="thumbs-container">
                <h2>Would you recommend this?</h2>
                <div className="thumbs-buttons-container">
                  <HiThumbUp
                    className={`${
                      review.wouldRecommend
                        ? "thumb-clicked"
                        : "thumb-unclicked"
                    } review-unclickable`}
                  />
                  <HiThumbDown
                    className={`${
                      !review.wouldRecommend
                        ? "thumb-clicked"
                        : "thumb-unclicked"
                    } review-unclickable`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div id="edit-delete-review-container">{editButtons()}</div>
        </div>
      </>
    );
  }
};

export default ReviewBox;
