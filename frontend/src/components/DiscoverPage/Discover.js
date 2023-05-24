import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import RandomRecipeGenerator from "./RandomRecipeGenerator";
import { fetchFavorites } from "../../store/favorites";
import { useDispatch } from "react-redux";
import { fetchReviews } from "../../store/reviews";
import { fetchRecipeRecommendations } from "../../store/recipes";
import RecipeContainer from "./RecipeContainer";
import './Discover.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../Header/Header";
import LoaderDots from "../LoaderDots";
import { resetFavorites } from "../../store/favorites";

const Discover = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const completedRecipeIds = user.completedRecipe;
    const favorites = useSelector(state => Object.values(state.favorites));
    const recipeReviewsArray = useSelector(state => Object.values(state.reviews));
    const recipeReviews = recipeReviewsArray[0];
    const [loading, setLoading] = useState(true);

    const [viewport, setViewport] = useState("");
    const [windowWidth, setWindowWidth] = useState();

    // useEffect(() => {
    //     dispatch(resetFavorites());
    //   }, [user]);      

    useEffect(() => {
        if (windowWidth <= 920) {
          setViewport("Mobile");
        }
        else {
          setViewport("Desktop");
        }
      }, [windowWidth])


        useEffect(() => {
            window.addEventListener('resize', handleResize);
            function handleResize(e) {
            setWindowWidth(window.innerWidth);
            }
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
        }, [])

    
    useEffect(() => {
         dispatch(fetchFavorites());
         dispatch(fetchReviews());
    }, [dispatch, user])

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
                setLoading(false);
            
        }
    }, [dispatch, recipeReviews, user]);
    
    // const [recipesWithMostReviewsFinal, setRecipesWithMostReviewsFinal] = useState([]);

    useEffect(() => {
    const fetchRecipeRecommendationsAsync = async () => {
        if (recipesWithMostReviews && recipesWithMostReviews.length > 0) {
        const data = await dispatch(fetchRecipeRecommendations(recipesWithMostReviews));
        // console.log(data, 'data')
        // setRecipesWithMostReviewsFinal(data);
        }
    };

    fetchRecipeRecommendationsAsync();
    }, [dispatch, recipeReviews]);

    // useEffect(() => { 
    //     dispatch(fetchRecipeRecommendations(recipesWithMostReviews));
    // }, [dispatch, recipeReviews, recipesWithMostReviews]);

    const recipesWithMostReviewsFinal = useSelector(state => state.recipes['recipe recommendations']);
    console.log(recipesWithMostReviewsFinal, 'recipesWithMostReviewsFinal')

    const [discoverFavorites, setDiscoverFavorites] = useState([]);
    
    useEffect(() => {
      if (favorites.length > 0) {
        const favoritesCopy = [...favorites];

        for (let i = 0; i < favorites.length; i++) {
          
            const currentFavorite = favoritesCopy[i];
            const country = currentFavorite.recipe.country;
            const recipeName = currentFavorite.recipe.recipeName.split(' ').join('');
            const query = `${country} , ${recipeName}`;
            
            fetch(`/api/search?q=${query}`)
                .then((response) => response.json())
                .then((data) => {
                    if (favorites.length === 1) {
                        setDiscoverFavorites(data);
                        
                    } else {
                        // const isAlreadyIncluded = discoverFavorites.some( (recipe) => recipe._id === data[1]._id);
                        setDiscoverFavorites((prevFavorites) => {
                            const isAlreadyIncluded = prevFavorites.some((recipe) => recipe._id === data[0]._id);
                            if (!isAlreadyIncluded) {
                              return [...prevFavorites, data[0]];
                            }
                            return prevFavorites;
                          });
    
                        // if (!isAlreadyIncluded) {
                        // console.log(data[1]); // Log the favorite
                        // setDiscoverFavorites((prev) => [...prev, data[1]]);
                        // console.log(discoverFavorites, 'discoverFavorites')
                        // }
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        
      }
    
    }, [dispatch, favorites.length, user]);
   
    
    
    if (loading) {
        return <LoaderDots />
    }

   
    return (
        <>
            <div className="recommendations-container">
            <Header viewport={viewport}/>
                <div className="recipe-generator-container"><RandomRecipeGenerator /></div>
                <div className="recommendations">
                    <h1 className="recommendations-title">Recommendations for you</h1>
                   { discoverFavorites.length > 0 ?  <div className="recommendations-header-favorites">Based on your favorites and completed recipes...</div> : null}
                        <div className="recommendations-grid-favorites">
                            {discoverFavorites?.map((recipe, index) => (
                            <RecipeContainer key={index} recipe={recipe} />
                                ))}
                        </div>
                        
                    <div className="recommendations-header-reviews">Highly rated recipes...</div> 
                            <div className="recommendations-grid-reviews">
                                {recipesWithMostReviewsFinal?.map((recipe) => (
                                    <RecipeContainer key={recipe?._id} recipe={recipe} />
                                ))}

                            </div>
                        
                </div>
            </div>
        </>

    );
};

export default Discover;