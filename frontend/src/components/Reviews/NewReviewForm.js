import "./Review.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { HiThumbUp, HiThumbDown } from "react-icons/hi";

const NewReviewForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

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
            <textarea placeholder="Write a review..." value={text}></textarea>
            <label>
              Would you make this again?
              <HiThumbUp />
              <HiThumbDown />
            </label>
            <button type="submit">Post review!</button>
          </form>
          <h1>Title of the review</h1>
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
};

export default ReviewBox;
