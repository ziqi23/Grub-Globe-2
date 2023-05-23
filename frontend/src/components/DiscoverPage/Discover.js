import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import RandomRecipeGenerator from "./RandomRecipeGenerator";
import { fetchFavorites } from "../../store/favorites";
import { useDispatch } from "react-redux";
import { fetchReviews } from "../../store/reviews";
import { fetchRecipeRecommendations } from "../../store/recipes";
import RecipeContainer from "./RecipeContainer";
import Spinner from "../SearchBar/Spinner";
import './Discover.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Discover = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const completedRecipeIds = user.completedRecipe;
    const favorites = useSelector(state => Object.values(state.favorites));
    const recipeReviewsArray = useSelector(state => Object.values(state.reviews));
    const recipeReviews = recipeReviewsArray[0];
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
         dispatch(fetchFavorites());
         dispatch(fetchReviews());
    }, [dispatch])

    const recipeCounts = {};



    let recipesWithMostReviews;

    useEffect(() => {
        if (recipeReviews && Object.values(recipeReviews).length > 0) {
            recipeReviews.forEach((entry) => {
                const recipeId = entry.recipe;
                const wouldMakeAgain = entry.wouldMakeAgain;
                
                // Increment the count for the recipe if "would make again" is true
                if (wouldMakeAgain) {
                    recipeCounts[recipeId] = (recipeCounts[recipeId] || 0) + 1;
                }
            });
            
            // Sort reviews in descending order
            const sortedRecipes = Object.entries(recipeCounts).sort(
                ([_, countA], [__, countB]) => countB - countA
            );
            
            // Retrieve the recipes with the most "would make again" reviews
            recipesWithMostReviews = sortedRecipes
                .slice(0, 10) 
                .map(([recipeId]) => recipeId);
            
        }
    }, [dispatch, recipeReviews]);
    

    useEffect(() => { 
        dispatch(fetchRecipeRecommendations(recipesWithMostReviews));
    }, [dispatch, recipeReviews]);

    const recipesWithMostReviewsFinal = useSelector(state => state.recipes['recipe recommendations']);

    const [discoverFavorites, setDiscoverFavorites] = useState([]);
    console.log(discoverFavorites, 'inital state')
    
    useEffect(() => {
      if (favorites.length > 0 && discoverFavorites.length === 0) {
        const favoritesCopy = [...favorites];

        for (let i = 0; i < favorites.length; i++) {
          
        //   const randomFavoriteIndex = Math.floor(
        //     Math.random() * favoritesCopy.length
        //   );
          const randomFavorite = favoritesCopy[i];
            const country = randomFavorite.recipe.country;
            const recipeName = randomFavorite.recipe.recipeName.split(' ').join('');
            console.log(recipeName)
            const query = `${country} , ${recipeName}`;
            
            fetch(`/api/search?q=${query}`)
                .then((response) => response.json())
                .then((data) => {
                    discoverFavorites.push(data[1]);
                    i ++;
                    console.log(discoverFavorites, 'discoverFavorites')
                })
                .catch((error) => {
                    console.error(error);
                });
        //   randomFavorites.push(randomFavorite);
        //   favoritesCopy.splice(randomFavoriteIndex, 1);
        }
        
        setLoading(false);
      }
    
    }, [dispatch, favorites, recipeReviews]);

    if (loading) {
        return <Spinner />
    }
    return (
        <>
            <div className="recommendations-container">
            <div onClick={() => history.push("/")} className="logo">
                <h1 className="logo-grub-globe">grubGlobe</h1>
            </div>
                <div className="recipe-generator-container"><RandomRecipeGenerator /></div>
                <div className="recommendations">
                    <h1 className="recommendations-title">Recommendations for you</h1>
                    {/* <div className="recommendations-header-favorites">Based on your favorites and completed recipes...</div>
                        <div className="recommendations-grid-favorites">
                            {discoverFavorites?.map((recipe, index) => (
                            <RecipeContainer key={index} recipe={recipe} />
                                ))}
                        </div> */}
                        
                    <div className="recommendations-header-reviews">Highly rated recipes...</div> 
                            <div className="recommendations-grid-reviews">
                                {recipesWithMostReviewsFinal && recipesWithMostReviewsFinal.map((recipe) => (
                                    <RecipeContainer key={recipe._id} recipe={recipe} />
                                ))}

                            </div>
                        
                </div>
            </div>
        </>

    );
};

export default Discover;