import { useEffect, useState } from 'react'
import './RandomRecipeGenerator.css';
import chefImage from '../../assets/images/bloom-chef-serving-a-pizza.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import jwtFetch from '../../store/jwt';

const RandomRecipeGenerator = () => {
    const history = useHistory();

    const [currentImage, setCurrentImage] = useState(chefImage);
    const [currentRecipeName, setCurrentRecipeName] = useState("");
    const [currentRecipeId, setCurrentRecipeId] = useState(0);
    const [pushed, setPushed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [index, setIndex] = useState(0);
    const [totalRecipes, setTotalRecipes] = useState(10);

    const resetIndex = () => {
        const index = (Math.floor(Math.random() * totalRecipes));
    }
   
    const getRecipes = async () => {
        try {
            const res = await jwtFetch('/api/recipes/randomRecipes');
            const fetchedRecipes = await res.json();
            setRecipes(fetchedRecipes);
            resetIndex();
        } catch (err) {
            console.error(err)
        }
    }
    
    useEffect(() => {
        getRecipes();
    }, [pushed])

    let recipeInterval;

    const generateRandomRecipe = () => {
        if (recipes.length > 0) {
          const newIndex = Math.floor(Math.random() * recipes.length);
          setIndex(newIndex);
          setCurrentImage(recipes[newIndex].photoUrl);
          setCurrentRecipeName(recipes[newIndex].recipeName);
          setCurrentRecipeId(recipes[newIndex]._id);
          recipeInterval = setInterval(() => {
            const newIndex = Math.floor(Math.random() * recipes.length);
            setIndex(newIndex);
            setCurrentImage(recipes[newIndex].photoUrl);
            setCurrentRecipeName(recipes[newIndex].recipeName);
            setCurrentRecipeId(recipes[newIndex]._id);
          }, 500);
        }
      };
      
    const handlePush = () => {
        setPushed(true);
        console.log(pushed)
        setIsLoading(true);
        resetIndex();
        generateRandomRecipe();
        setTimeout(() => {
            clearInterval(recipeInterval);
            setIsLoading(false)
            setPushed(false);
        }, 5000)
    }

    const loading = () => {
        return (
            <div className="loading-container">
                <div class="loading-wrapper">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="shadow"></div>
                    <div class="shadow"></div>
                    <div class="shadow"></div>
                </div>
            </div>
        )
    }

    return (
        <div id="random-recipe-generator-container">
            <div id="text-box">
                <h1>Don't know what to pick?</h1>
                <h4>We'll pick a random one for you</h4>
                <div 
                    id="random-recipe-button"
                    onClick={handlePush}
                >
                    GIVE ME A RANDOM RECIPE
                </div>
            </div>

            <div id="random-recipe-generator-button-container">
                <img src={currentImage} alt="button image" />
                <div className="overlay"></div>
                {pushed 
                    ? ""
                    : <h1 
                        id="recipe-name-link"
                        onClick={() => history.push(`/recipes/${currentRecipeId}`)}
                    >
                        {currentRecipeName}
                    </h1>}
                {isLoading ? loading() : ""}
            </div>

        </div>
    )
};

export default RandomRecipeGenerator;