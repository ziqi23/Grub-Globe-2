import Header from "../Header/Header";
import RecipeIndex from "./RecipeIndex";
import "./RecipeIndex.css"

const RecipeIndexPage = (props) => {
    // need to fetch recipes based on params

    return (
        <>
            <Header />
            <div className="below-header-container">
                <div class="side-region-text">
                    <h1>COUNTRY/REGION</h1>
                </div>
                <h1 className="recipe-index-title">FOLLOW ALONG RECIPES</h1>
                <RecipeIndex />
                {/* <RecipeIndex recipes={recipes}/> */}
            </div>
        </>
    )
};
export default RecipeIndexPage;