import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import RecipeIndex from "./RecipeIndex";
import "./RecipeIndex.css"
import { useEffect } from "react";
import { fetchRecipes } from "../../store/recipes.js"

const RecipeIndexPage = (props) => {
    // need to fetch recipes based on params
    // if the front-end url has /country
    const dispatch = useDispatch();

    const recipes = useSelector(state => Object.values(state.recipes))
    
    useEffect(() => {
        dispatch(fetchRecipes({country: "United States"}))
    }, [])

    return (
        <>
            <Header />
            <div className="below-header-container">
                <div class="side-region-text">
                    <h1>COUNTRY/REGION</h1>
                </div>
                <h1 className="recipe-index-title">FOLLOW ALONG RECIPES</h1>
                {/* <RecipeIndex /> */}
                <RecipeIndex recipes={recipes}/>
            </div>
        </>
    )
};
export default RecipeIndexPage;