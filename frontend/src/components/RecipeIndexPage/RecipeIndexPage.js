import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import RecipeIndex from "./RecipeIndex";
import "./RecipeIndex.css"
import { useEffect } from "react";
import { fetchRecipes } from "../../store/recipes.js"
import { useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";

const RecipeIndexPage = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const recipes = useSelector(state => Object.values(state.recipes))

    let search = location.search.substring(1);
    search = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    // this search variable is decoded to create an object: {country: "United States"}
    
    useEffect(() => {
        dispatch(fetchRecipes(search));
        console.log(search)
    }, [dispatch])

    return (
        <>
            <Header />
            <div className="below-header-container">
                <div className="side-region-text">
                    <h1>{recipes[0]?.country}</h1>
                </div>
                <h1 className="recipe-index-title">FOLLOW ALONG RECIPES</h1>
                <RecipeIndex recipes={recipes}/>
            </div>
        </>
    )
};
export default RecipeIndexPage;