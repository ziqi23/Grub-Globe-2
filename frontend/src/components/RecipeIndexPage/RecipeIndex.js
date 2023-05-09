import RecipeCard from "./RecipeCard";
import "./RecipeIndex.css"

const RecipeIndex = ({recipes={}}) => {
    return (
        <div class="recipes-index">
            <RecipeCard />
            {/* {recipes.map(recipe => {
                <RecipeCard key={recipe.id} recipe={recipe} />
            })} */}
        </div>
    )
};
export default RecipeIndex;