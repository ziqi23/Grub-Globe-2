import { useEffect } from "react";
import "./ReviewsTile.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {FcCheckmark } from "react-icons/fc";
import {VscClose} from "react-icons/vsc"
import {AiFillStar, AiOutlineEdit} from "react-icons/ai"
import {RiDeleteBin6Line} from "react-icons/ri"


const ReviewsTiles = ({review}) => {
    const history = useHistory();

    const formattedDate = (createdAt) => {
        const dateOptions = {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        };
        return new Date(createdAt).toLocaleString('en-US', dateOptions).toUpperCase();
    };

    const starRatings = () => {
        return (
            <div className="prof-star-ratings">
                {[1, 2, 3, 4, 5].map((rating, i) => (
                    <AiFillStar className={rating <= review.starRating ? "filled" : "empty"}/>
                ))}
            </div>
            
        )
    }

    useEffect(() => {
        console.log(formattedDate(review.createdAt))
    }, [])

    return (
        <div className="reviews-tile-container">
            <div className="reviews-title-top">
                <div onClick={() => history.push(`/recipes/${review.recipe._id}`)}>
                    <img src={review.recipe.photoUrl} alt="recipe picture" />
                    <div className="image-overlay"></div>
                    <div className="recipe-info-container">
                        <h1 >{review.recipe.recipeName}</h1>
                        <p>{review.recipe.country}</p>
                    </div>
                </div>
            </div>
            <div className="reviews-tile-middle">
                <p>{formattedDate(review.createdAt)}</p>
                {starRatings()}
                <h2>{review.title}</h2>
                {/* <p>{review.text}</p> */}
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                <div className="reviews-icons-section">
                    <p>Would Make Again</p>{review.wouldMakeAgain ? <FcCheckmark className="review-icon"/> : <VscClose className="review-x-icon"/>}
                    <p>Would Recommend </p>{review.wouldRecommend ? <FcCheckmark className="review-icon"/> : <VscClose className="review-x-icon"/>}
                </div>
                <div  className="reviews-icons-section">
                    <AiOutlineEdit className="edit-icons"/>
                    <RiDeleteBin6Line className="edit-icons"/>
                </div>
            </div>


        </div>
    );
};

export default ReviewsTiles;