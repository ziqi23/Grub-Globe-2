import "./Review.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { HiThumbUp, HiThumbDown } from "react-icons/hi";
import { useState } from "react";
import { composeReview } from "../../store/reviews";

const NewReviewForm = ({ recipeId }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [wouldMakeAgain, setWouldMakeAgain] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState("");
  const [starRating, setStarRating] = useState("");
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

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

        <div className="review-details-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Name your review"
            />
            <textarea
              placeholder="Write a review..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <label>
              Would you make this again?
              <HiThumbUp
                onClick={() => setWouldMakeAgain(true)}
                className={wouldMakeAgain ? "thumb-clicked" : "thumb-unclicked"}
              />
              <HiThumbDown
                onClick={() => setWouldMakeAgain(false)}
                className={
                  !wouldMakeAgain ? "thumb-clicked" : "thumb-unclicked"
                }
              />
            </label>
            <label>
              Would you recommend this?
              <HiThumbUp
                onClick={() => setWouldRecommend(true)}
                className={wouldRecommend ? "thumb-clicked" : "thumb-unclicked"}
              />
              <HiThumbDown
                onClick={() => setWouldRecommend(false)}
                className={
                  !wouldRecommend ? "thumb-clicked" : "thumb-unclicked"
                }
              />
            </label>
            <select
              value={starRating}
              onChange={(e) => setStarRating(e.target.value)}
            >
              <option value="">Select a rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button type="submit">Post review!</button>
          </form>
        </div>
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
