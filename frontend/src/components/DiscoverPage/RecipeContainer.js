
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import FavoritesTile from '../Profile/FavoritesTile';

const RecipeContainer = ({ recipe }) => {
    return (
        <>
            <Link to={`/recipes/${recipe?._id}`}>
                <FavoritesTile recipe={recipe} />
            </Link>
        </>
    );
};

export default RecipeContainer;