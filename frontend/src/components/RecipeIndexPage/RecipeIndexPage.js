import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import RecipeIndex from "./RecipeIndex";
import "./RecipeIndex.css";
import { useEffect, useState } from "react";
import { fetchRecipes } from "../../store/recipes.js";
import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { fetchSearchRecipes } from "../../store/recipes.js";

const RecipeIndexPage = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const recipes = useSelector((state) => Object.values(state.recipes));
  const [loading, setLoading] = useState(true);
  
  let search = location.search.substring(1);
  
  // search = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  // this search variable is decoded to create an object: {country: "United States"}
  
  const searchSplit = search.split('=');
  
  // useEffect(() => {
  //   if (searchSplit[0] === 'country') {
  //     dispatch(fetchRecipes(search));
  //     console.log(recipes, 'recipes use effect')
  //     setLoading(false);
  //   } 
  // }, [dispatch])

  useEffect(() => {
    const fetchData = async () => {
      if (searchSplit[0] === "country") {
        setLoading(true); // Set loading to true before fetching recipes
        await dispatch(fetchRecipes(search));
        setLoading(false); // Set loading to false after recipes have been fetched
      }
    };
  
    fetchData();
  }, [dispatch, search]);
  
  
  const queryParams = new URLSearchParams(location.search);
  const queryParam = queryParams.get("query");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/search?q=${queryParam}`);
        const data = await response.json();
        dispatch(fetchSearchRecipes(data))
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error(error);
      }
    };

    if (searchSplit[0] === 'query') {
      fetchData();
    }
    
  }, [dispatch, location]);

  return (
    <>
      <Header />
      <div className="below-header-container">
        <div className="side-region-text">
          <h1>{recipes[0]?.country}</h1>
        </div>
        <h1 className="recipe-index-title">FOLLOW ALONG RECIPES</h1>
        <RecipeIndex recipes={recipes} loading={loading} />
      </div>
    </>
  );
};
export default RecipeIndexPage;
