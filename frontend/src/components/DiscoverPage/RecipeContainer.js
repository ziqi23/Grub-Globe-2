
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import FavoritesTile from '../Profile/FavoritesTile';
import "./Discover.css"

const RecipeContainer = ({ recipe }) => {
    return (
        <>
            <Link to={`/recipes/${recipe?._id}`}>
                <FavoritesTile recipe={recipe} className="recs-tile"/>
            </Link>
        </>
    );
};

export default RecipeContainer;