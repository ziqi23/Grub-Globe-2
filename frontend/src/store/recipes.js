import jwtFetch from './jwt';

// SELECTORS

// CONSTANTS
const RECEIVE_RECIPES = "recipes/RECEIVE_RECIPES";
const RECEIVE_RECIPE_ERRORS = "recipes/RECEIVE_RECIPE_ERRORS";
const RECEIVE_RECIPE = "recipes/RECEIVE_RECIPE";

// ACTION CREATORS
const receiveRecipes = recipes => ({
    type: RECEIVE_RECIPES,
    recipes
});

const receiveRecipe = recipe => ({
    type: RECEIVE_RECIPE,
    recipe
})

const receiveErrors = errors => ({
    type: RECEIVE_RECIPE_ERRORS,
    errors
})
// THUNK ACTION CREATORS
export const fetchRecipes = (filters) => async dispatch => {
    const filterParams = new URLSearchParams(filters)
    try {
        const res = await jwtFetch(`/api/recipes?${filterParams}`)
        const recipes = await res.json();
        console.log(recipes)
        dispatch(receiveRecipes(recipes));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors))
        }
    }
}

export const fetchRecipe = recipeId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/recipes/${recipeId}`);
        const recipe = await res.json();
        dispatch(receiveRecipe(recipe));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors))
        }
    }
}

// REDUCER
const RecipesReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_RECIPES:
            return { ...action.recipes };
        case RECEIVE_RECIPE:
            return { ...action.recipe }
        default: 
            return state;
    };
};

export default RecipesReducer;