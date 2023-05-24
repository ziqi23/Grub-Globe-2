
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import FavoritesTile from '../Profile/FavoritesTile';
import './RecipeContainer.css';


const RecipeContainer = ({ recipe }) => {
    return (
        <>
            <Link to={`/recipes/${recipe?._id}`}>
                {/* <FavoritesTile recipe={recipe} className="recs-tile"/> */}
                <div className='recipe-container'>
                    <div className='discover-page-img-container'>
                        <img className='discover-page-img' src={recipe?.photoUrl} alt={recipe?.recipeName}/>
                    </div>
                    <div className='discover-recipe-text'>
                        <p className='discover-recipe-title'>{recipe?.recipeName}</p>
                        <p className='discover-recipe-country'>{recipe?.country}</p>
                    </div>

                </div>
            </Link>
        </>
    );
};

export default RecipeContainer;