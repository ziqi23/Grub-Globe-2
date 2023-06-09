import jwtFetch from "./jwt";

const RECEIVE_RECIPES = "recipes/RECEIVE_RECIPES";
const RECEIVE_RECIPE_ERRORS = "recipes/RECEIVE_RECIPE_ERRORS";
const RECEIVE_RECIPE = "recipes/RECEIVE_RECIPE";
const RECEIVE_RECOMMENDATION_RECIPES = "recipes/RECEIVE_RECOMMENDATION_RECIPES";

const receiveRecipes = (recipes) => ({
  type: RECEIVE_RECIPES,
  recipes,
});

const receiveRecipe = (recipe) => ({
  type: RECEIVE_RECIPE,
  recipe,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_RECIPE_ERRORS,
  errors,
});

const receiveRecommendationRecipes = (recipes) => ({
    type: RECEIVE_RECOMMENDATION_RECIPES,
    recipes,
});

export const fetchRecipes = (filters) => async (dispatch) => {
  const filterParams = new URLSearchParams(filters);
  try {
    const res = await jwtFetch(`/api/recipes?${filterParams}`);
    const recipes = await res.json();
    dispatch(receiveRecipes(recipes));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchRecipe = (recipeId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/recipes/${recipeId}`);
    const recipe = await res.json();
    return dispatch(receiveRecipe(recipe));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchSearchRecipes = (recipes) => async (dispatch) => {
  try {
    dispatch(receiveRecipes(recipes));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchRecipeRecommendations = (recipeIds) => async (dispatch) => {
    try {
      const recipePromises = recipeIds.map((recipeId) =>
        jwtFetch(`/api/recipes/${recipeId}`).then((res) => res.json())
      );
  
      const recipes = await Promise.all(recipePromises);
        dispatch(receiveRecommendationRecipes(recipes));
    } catch (err) {
      const resBody = await err;
      if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
      }
    }
  };
  

const RecipesReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_RECIPES:
      return { ...action.recipes };
    case RECEIVE_RECIPE:
      return { [action.recipe._id]: action.recipe };
    case RECEIVE_RECOMMENDATION_RECIPES:
        return { ['recipe recommendations']: action.recipes };
    default:
      return state;
  }
};


export default RecipesReducer;


