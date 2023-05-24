import { useDispatch, useSelector } from 'react-redux';
import './BurgerMenu.css'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { fetchRecipe } from "../../store/recipes";
import Ingredients from '../RecipeShow/Ingredients';
import Macronutrients from '../RecipeShow/Macronutrients';
import RecipeSearch from '../SearchBar/Search';
import NavBar from '../NavBar/NavBar';
import {BiBowlHot} from 'react-icons/bi'
import {IoNutritionOutline} from 'react-icons/io5'

const BurgerMenu = ({openLoginModal, openSignupModal}) => {
    const dispatch = useDispatch();
    const { recipeId } = useParams();
    const recipe = useSelector((state) => state.recipes ? state.recipes[recipeId] : null);

    useEffect(() => {
        if (recipeId) {
            dispatch(fetchRecipe(recipeId));
        }
      }, [recipeId, dispatch]);

    return (
        <div className="burger-menu-dropdown">
            <div className="burger-menu-search">
                <RecipeSearch />
            </div>
            {recipeId && (
                <>
                <div className="burger-menu-ingredients">
                    <div className='burger-menu-category'>
                        <BiBowlHot />
                        <h2>Ingredients</h2>
                    </div>
                    <div className='burger-menu-ingredient-details'>
                        <Ingredients ingredients={recipe?.ingredients} />
                    </div>
                </div>
                <div className="burger-menu-nutrition">
                    <div className='burger-menu-category'>
                        <IoNutritionOutline />
                        <h2>Nutrition Facts</h2>
                    </div>
                    <Macronutrients macronutrients={recipe?.nutrition.nutrients} />
                </div>
                </>
            )}
            <div className='burger-menu-user-actions'>
                <NavBar
                    openLoginModal={openLoginModal}
                    openSignupModal={openSignupModal}
                />
            </div>
        </div>
    )
}

export default BurgerMenu