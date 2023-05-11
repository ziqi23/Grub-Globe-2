import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import RecipeIndex from "./RecipeIndex";
import "./RecipeIndex.css"
import { useEffect } from "react";
import { fetchRecipes } from "../../store/recipes.js"

const RecipeIndexPage = (props) => {

    const dispatch = useDispatch();

    const recipes = useSelector(state => Object.values(state.recipes))
    
    useEffect(() => {
        dispatch(fetchRecipes({country: "United States"}))
    }, [dispatch])

    return (
        <>
            <Header />
            <div className="below-header-container">
                <div class="side-region-text">
                    <h1>{recipes[0]?.country}</h1>
                </div>
                <h1 className="recipe-index-title">FOLLOW ALONG RECIPES</h1>
                <RecipeIndex recipes={recipes}/>
            </div>
        </>
    )
};
export default RecipeIndexPage;