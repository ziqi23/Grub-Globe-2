import { useEffect, useState } from "react";
// import { AiFillStar } from "react-icons/ai";
import { FaGrinStars } from "react-icons/fa";
import "./Review.css";

const StarRatingInput = ({ rating, disabled, onChange }) => {
  const [activeRating, setActiveRating] = useState(rating);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setActiveRating(rating);
  }, [rating]);

  const starIcon = (number) => {
    const props = {};
    if (!disabled) {
      props.onMouseEnter = () => setActiveRating(number);
      props.onMouseLeave = () => setActiveRating(rating);
      props.onClick = () => {
        onChange(number);
        setClicked(true);
        setTimeout(() => setClicked(false), 1000);
      };
    }
    return (
      <div
        key={number}
        // className={activeRating >= number ? "filled" : "empty"}
        className={`star-icon ${activeRating >= number ? "filled" : "empty"} ${
          clicked && activeRating >= number ? "btn-bigger" : ""
        }`}
        {...props}
      >
        <FaGrinStars />
      </div>
    );
  };

  return (
    <div className="star-rating-input">
      {[1, 2, 3, 4, 5].map((number) => starIcon(number))}
    </div>
  );
};

export default StarRatingInput;
