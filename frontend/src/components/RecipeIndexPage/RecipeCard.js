import "./RecipeIndex.css"
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


const RecipeCard = ({recipe}) => {

    return (
        <>
            <div className="recipe-card">
                <div className="image-placeholder">image placeholder</div>
                <div className="recipe-quick-info-container">
                    <h1>{recipe.recipeName}</h1>
                    <p>Total Duration: {recipe.prepTime} minutes</p>
                    <br></br>
                    <p>Tags: {recipe.tags.map((tag) => `${tag.name}` + ", ")}</p>
                    <div className="view-recipe-button"><Link to={`/recipes/${recipe._id}`}>VIEW RECIPE</Link></div>
                </div>
            </div>
        </>
    )
};

export default RecipeCard;