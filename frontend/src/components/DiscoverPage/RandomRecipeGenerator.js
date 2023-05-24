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
    const [disabled, setDisabled] = useState(false)

    const getRecipes = async () => {
        try {
            const res = await jwtFetch('/api/recipes/randomRecipes');
            const fetchedRecipes = await res.json();
            setRecipes(fetchedRecipes);
        } catch (err) {
            console.error(err)
        }
    }
    
    useEffect(() => {
        getRecipes();
    }, [])

    const initializeRecipeRotation = () => {
        // display first recipe
        let currentIndex = 0
        setCurrentImage(recipes[currentIndex].photoUrl);
        setCurrentRecipeName(recipes[currentIndex].recipeName);
        setCurrentRecipeId(recipes[currentIndex]._id);

        // setup next recipes in rotation
        for (let i = 1; i < 10; i++) {
            setTimeout(() => {
                setCurrentImage(recipes[i].photoUrl);
                setCurrentRecipeName(recipes[i].recipeName);
                setCurrentRecipeId(recipes[i]._id);
            }, (500*i))
        }
    }

    const handlePush = () => {
        if (!disabled) {
            setDisabled(true)
            setPushed(true);
            setIsLoading(true);
            initializeRecipeRotation();
            setTimeout(() => {
                setIsLoading(false)
                setPushed(false);
                getRecipes();
                setDisabled(false)
            }, 5000)
        }
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