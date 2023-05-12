import "./Review.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { HiThumbUp, HiThumbDown } from "react-icons/hi";
import { useState } from "react";
import { composeReview } from "../../store/reviews";
import StarRatingInput from "./stars";

const NewReviewForm = ({ recipeId }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [wouldMakeAgain, setWouldMakeAgain] = useState(true);
  const [wouldRecommend, setWouldRecommend] = useState(true);
  const [starRating, setStarRating] = useState(5);
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [clickedMakeAgain, setClickedMakeAgain] = useState(false);
  const [clickedRecommend, setClickedRecommend] = useState(false);

  const onStarClick = (number) => {
    setStarRating(parseInt(number));
    // const button = document.querySelector("thumb-clicked");
    // button.classList.add("btn-bigger");
    // setTimeout(() => {
    //   button.classList.remove("btn-bigger");
    // }, 200);
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
    setErrors([]);
    const review = {
      title,
      text,
      wouldMakeAgain,
      wouldRecommend,
      starRating,
      recipe: recipeId,
    };
    dispatch(composeReview(review));
  };

  return (
    <>
      <div className="review-box-container">
        <div className="review-user-info">
          <div className="circle"></div>
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

            {/* </div> */}

            {/* <select
              value={starRating}
              onChange={(e) => setStarRating(e.target.value)}
            >
              <option value="">Select a rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select> */}
          </div>
          <div id="new-review-text-inputs">
            <input
              type="text"
              id="new-review-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title your review..."
            />
            <textarea
              placeholder="Write a review..."
              id="new-review-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <button id="new-review-submit" type="submit">
            Post review!
          </button>
        </form>
      </div>
    </>
  );
};
{
  /* <h1>Title of the review</h1>
          <h3>John Doe</h3>
          <p>
            Duis dapibus nisl dictum, blandit mi eget, mattis nulla. Nam sed
            augue sit amet sem venenatis hendrerit. Donec convallis magna et
            vulputate pulvinar. Proin tempor dolor orci, ut gravida velit
            aliquam id. Maecenas egestas nibh diam, et dignissim augue mollis
            eget. Quisque pellentesque faucibus velit ut ultrices. Nullam
            laoreet hendrerit vulputate.{" "}
          </p>
        </div>
      </div>
      <hr></hr>
      <div className="review-box-container">
        <div className="review-user-info">
          <div className="circle"></div>
        </div>

        <div className="review-details-container">
          <h1>Title of the review</h1>
          <h3>Jane Doe</h3>
          <p>
            Duis dapibus nisl dictum, blandit mi eget, mattis nulla. Nam sed
            augue sit amet sem venenatis hendrerit. Donec convallis magna et
            vulputate pulvinar. Proin tempor dolor orci, ut gravida velit
            aliquam id. Maecenas egestas nibh diam, et dignissim augue mollis
            eget. Quisque pellentesque faucibus velit ut ultrices. Nullam
            laoreet hendrerit vulputate.{" "}
          </p>
        </div>
      </div>
    </>
  );
}; */
}

export default NewReviewForm;
