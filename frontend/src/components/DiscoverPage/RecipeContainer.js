import './RecipeContainer.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const RecipeContainer = ({ recipe }) => {
    return (
        <>
            <Link to={`/recipes/${recipe._id}`}>
                <div className="recipe-container">
                    <div className="recipe-container-image">
                        <img src={recipe?.photoUrl} alt={recipe.recipeName} />
                    </div>
                    <div className="title-container">
                        <p>{recipe.recipeName}</p>
                        <p>{recipe.country}</p>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default RecipeContainer;