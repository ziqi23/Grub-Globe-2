import { useEffect, useState } from "react";
import "./ReviewsTile.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {FcCheckmark } from "react-icons/fc";
import {VscClose} from "react-icons/vsc"
import {AiFillStar, AiOutlineEdit, AiOutlineCloseCircle} from "react-icons/ai"
import {RiDeleteBin6Line} from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { fetchUserReviews } from "../../store/reviews";
import { updateReview } from "../../store/reviews";
import StarRatingInput from "../Reviews/stars";


const ReviewsTiles = ({review}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);

    // edit review mode
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [wouldMakeAgain, setWouldMakeAgain] = useState(true);
    const [wouldRecommend, setWouldRecommend] = useState(true);
    const [starRating, setStarRating] = useState(5);

    const reviewHTML = () => {
        if (editMode) {
            return (
                <>
                {starRatings()}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    class="reviews-tile-title-input"
                />
                <textarea
                    type="textarea"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    class="reviews-tile-text-input"
                />
                <div className="reviews-icons-section">
                    <p>Would Make Again</p>
                    <FcCheckmark
                        onClick={() => setWouldMakeAgain(true)}
                        className={wouldMakeAgain ? "selected-icon" : "review-icon" }/>
                    <VscClose
                        onClick={() => setWouldMakeAgain(false)}
                        className={wouldMakeAgain ? "review-x-icon" : "review-selected-x-icon" }/>
                    <p>Would Recommend</p>
                    <FcCheckmark
                        onClick={() => setWouldRecommend(true)}
                        className={wouldRecommend ? "selected-icon" : "review-icon" }/>
                    <VscClose
                        onClick={() => setWouldRecommend(false)}
                        className={wouldRecommend ? "review-x-icon" : "review-selected-x-icon" }/>
                </div>
                {editButtons()}
                </>
            )
        } else if (!editMode) {
            return (
                <>
                    {starRatings()}
                    <h2>{review.title}</h2>
                    <p>{review.text}</p>
                    <div className="reviews-icons-section">
                        <p>Would Make Again</p>{review.wouldMakeAgain ? <FcCheckmark className="review-icon"/> : <VscClose className="review-x-icon"/>}
                        <p>Would Recommend </p>{review.wouldRecommend ? <FcCheckmark className="review-icon"/> : <VscClose className="review-x-icon"/>}
                    </div>
                    {editButtons()}
                </>
            )
        }
    };

    useEffect(() => {
        setTitle(review.title);
        setText(review.text);
        setWouldMakeAgain(review.wouldMakeAgain);
        setWouldRecommend(review.wouldRecommend);
        setStarRating(review.starRating)
    }, [editMode])

    const formattedDate = (createdAt) => {
        const dateOptions = {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        };
        return new Date(createdAt).toLocaleString('en-US', dateOptions).toUpperCase();
    };

    const onStarClick = (num) => {
        setStarRating(parseInt(num));
    };


    const starRatings = () => {
        if (editMode) {
            return (
                <div className="prof-star-ratings">
                    <StarRatingInput
                        disabled={false}
                        onChange={onStarClick}
                        rating={starRating}
                        icon={<AiFillStar />}
                    />
                </div>
            )
        } else if (!editMode) {
            return (
                <div className="prof-star-ratings">
                    {[1, 2, 3, 4, 5].map((rating, i) => (
                        <AiFillStar className={rating <= review.starRating ? "filled" : "empty"}/>
                    ))}
                </div>
            )
        }
    }

    const handleReviewDelete = () => {
        dispatch(deleteReview(review._id)).then(() => {
            dispatch(fetchUserReviews(sessionUser._id));
        });
      };

    const handleUpdate = (e) => {
        e.preventDefault();
        const reviewContents = {
            title,
            text,
            wouldMakeAgain,
            wouldRecommend,
            starRating,
            recipe: review.recipe._id,
          };
        if (editMode) {
            dispatch(updateReview(reviewContents, [], review._id)).then(() => {
                dispatch(fetchUserReviews(sessionUser._id));
            });
        }
        setEditMode(false);
    }

    const editButtons = () => {
        if (sessionUser && sessionUser._id === review.user._id){
        return (
            <>
                <div  className="reviews-icons-section">
                    {editMode
                        ? <AiOutlineCloseCircle
                            onClick={() => setEditMode(false)}
                            className="edit-icons"
                        />
                        : <AiOutlineEdit
                            onClick={() => setEditMode(true)}
                            className="edit-icons"
                        />}
                    <RiDeleteBin6Line onClick={handleReviewDelete} className="edit-icons"/>
                </div>
                {editMode && (
                    <button onClick={handleUpdate}>Update!</button>
                )}
            </>
        )}
    }

    return (
        <div className="reviews-tile-container">
            <div className="reviews-title-top">
                <div onClick={() => history.push(`/recipes/${review?.recipe?._id}`)}>
                    <img src={review?.recipe?.photoUrl} alt="recipe picture" />
                    <div className="image-overlay"></div>
                    <div className="recipe-info-container">
                        <h1 >{review?.recipe?.recipeName}</h1>
                        <p>{review?.recipe?.country}</p>
                    </div>
                </div>
            </div>
            <div className="reviews-tile-middle">
                <p>{formattedDate(review.createdAt)}</p>
                {reviewHTML()}
            </div>
        </div>
    );
};

export default ReviewsTiles;
