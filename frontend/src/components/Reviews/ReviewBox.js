import "./Review.css";
import { HiThumbUp, HiThumbDown } from "react-icons/hi";
import StarRatingInput from "./stars";

const ReviewBox = ({ review }) => {
  return (
    <>
      <div className="review-box-container">
        <div className="review-user-info">
          <div className="circle">
            {/* <img
                className="review-profile-picture-file"
                src={
                  image
                    ? `data:image/image/png;base64,${image}`
                    : defaultPicture
                }
              /> */}
          </div>
        </div>

        <div id="past-review-container">
          <div id="new-review-ratings-inputs">
            <div className="star-and-title-container">
              <div id="form-input-accuracy" className="review-unclickable">
                <StarRatingInput disabled={true} rating={review.starRating} />
              </div>
            </div>
            <div className="thumbs-container">
              <h2>Would you make this again?</h2>
              <div className="thumbs-buttons-container">
                <HiThumbUp
                  className={`${
                    review.wouldMakeAgain ? "thumb-clicked" : "thumb-unclicked"
                  } review-unclickable`}
                />
                <HiThumbDown
                  className={`${
                    !review.wouldMakeAgain ? "thumb-clicked" : "thumb-unclicked"
                  } review-unclickable`}
                />
              </div>
            </div>
            <div className="thumbs-container">
              <h2>Would you recommend this?</h2>
              <div className="thumbs-buttons-container">
                <HiThumbUp
                  className={`${
                    review.wouldRecommend ? "thumb-clicked" : "thumb-unclicked"
                  } review-unclickable`}
                />
                <HiThumbDown
                  className={`${
                    !review.wouldRecommend ? "thumb-clicked" : "thumb-unclicked"
                  } review-unclickable`}
                />
              </div>
            </div>
          </div>
          <div id="new-review-text-inputs">
            <h1 id="past-review-title">{review.title}</h1>
            <p id="past-review-text">{review.text}</p>
          </div>
          {/* <button id="new-review-submit" type="submit">
              Post review!
            </button> */}
        </div>
      </div>
    </>
  );
};

export default ReviewBox;
