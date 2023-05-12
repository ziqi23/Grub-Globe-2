import "./Review.css";

const ReviewBox = ({ review }) => {
  return (
    <>
      <div className="review-box-container">
        <div className="review-user-info">
          <div className="circle"></div>
        </div>

        <div className="review-details-container">
          <h1>{review.title}</h1>
          <h3>{review.user.username}</h3>
          <p>{review.text}</p>
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
