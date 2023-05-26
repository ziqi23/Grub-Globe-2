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
import { FaTimesCircle } from 'react-icons/fa';
import { useRef } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { PhotosModal } from "../../context/PhotosModal";

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
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const fileRef = useRef(null);
    const [openPhotoModal, setOpenPhotoModal] = useState(false);
    const [newImages, setNewImages] = useState([]);
    const [newImageUrls, setNewImageUrls] = useState([]);

    const photoModal = () => {
        return (
            <>
                {openPhotoModal &&
                    <PhotosModal onClose={() => setOpenPhotoModal(false)}>
                        <Carousel>
                            {review.imageUrls.map((photoUrl, i) => (
                                <div key={i}>
                                    <img src={photoUrl} />
                                </div>
                            ))}
                        </Carousel>
                    </PhotosModal>
                }
            </>
        )
    }

    const updateFiles = async (e) => {
        const newFiles = Array.from(e.target.files);

        if (newFiles.length !== 0) {
            let filesLoaded = 0;
            const urls = [];
            newFiles.forEach((file, i) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    urls[i] = fileReader.result;
                    if (++filesLoaded === newFiles.length){
                        setNewImages(newFiles);
                        setNewImageUrls(urls);
                    }
                }
            });
        }
    }

    const handleRemoveClick = (e, index) => {
        e.preventDefault();
        const updatedImages = [...newImages];
        const updatedImageUrls = [...newImageUrls];
        updatedImages.splice(index, 1);
        updatedImageUrls.splice(index, 1);
        setNewImages(updatedImages);
        setNewImageUrls(updatedImageUrls);
    }

    const reviewHTML = () => {
        if (editMode) {
            return (
                <>
                {starRatings()}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="reviews-tile-title-input"
                />
                <textarea
                    type="textarea"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="reviews-tile-text-input"
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
                <div id="review-images-edit">
                    <div className="image-upload-edit-container">
                        <label htmlFor="image-upload-edit" className="image-upload-placeholder-edit">
                            +
                        </label>
                        <input
                            id="image-upload-edit"
                            ref={fileRef}
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            multiple
                            onChange={updateFiles}
                            style={{ display: 'none' }}
                        />
                    </div>
                    {[...imageUrls,...newImageUrls].map((image, index) => (
                        <div key={index} className="image-preview-container">
                        <img src={image} alt={`Preview ${index}`} height="100" width="100" />
                        <button
                            className="image-remove-button"
                            onClick={(e) => handleRemoveClick(e, index)}>
                            <FaTimesCircle size={20} />
                        </button>
                        </div>
                    ))}
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
                    {photosGallery()}
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
        setStarRating(review.starRating);
        setImageUrls(review.imageUrls);
    }, [editMode, review.title, review.text, review.wouldMakeAgain, review.wouldRecommend, review.starRating, review.imageUrls])

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
                        <AiFillStar key={i} className={rating <= review.starRating ? "filled" : "empty"}/>
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

        const updatedImages = [...images, ...newImages];
        const updatedImageUrls = [...imageUrls, ...newImageUrls];

        const reviewContents = {
            title,
            text,
            wouldMakeAgain,
            wouldRecommend,
            starRating,
            recipe: review.recipe._id,
            imageUrls: updatedImageUrls,
          };
        if (editMode) {
            dispatch(updateReview(reviewContents, updatedImages, review._id)).then(() => {
                dispatch(fetchUserReviews(sessionUser._id));
                setImages([]);
                setImageUrls([]);
                setNewImages([]);
                setNewImageUrls([]);
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
                    <button
                        className="update-button"
                        onClick={handleUpdate}
                    >
                        UPDATE!
                    </button>
                )}
            </>
        )}
    }


    const photosGallery = () => {
        return (
            <div id="profile-reviews-photos-container" >
                {review.imageUrls.map((imageUrl, i) => (
                    <div key={i} className="image-preview-container" onClick={() => setOpenPhotoModal(true)} >
                        <img src={imageUrl} alt="review upload" />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <>
        <div className="reviews-tile-container">
            <div className="reviews-title-top">
                <div onClick={() => history.push(`/recipes/${review?.recipe?._id}`)}>
                    <img src={review?.recipe?.photoUrl} alt="recipe" />
                    <div className="image-overlay"></div>
                    <div className="recipe-info-container">
                        <h1 >{review?.recipe?.recipeName}</h1>
                        <p>{review?.recipe?.country}</p>
                    </div>
                </div>
            </div>
            <div className="reviews-tile-middle">
                <p>{formattedDate(review?.createdAt)}</p>
                {reviewHTML()}
            </div>
            <div id="photo-modal-container">
                {photoModal()}
            </div>
        </div>
        </>
    );
};

export default ReviewsTiles;
