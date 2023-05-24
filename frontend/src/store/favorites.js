import jwtFetch from "./jwt";

const SET_FAVORITES = "favorites/setFavorites";
const ADD_FAVORITE = "favorites/addFavorite";
const REMOVE_FAVORITE = "favorites/removeFavorite";
const RECEIVE_FAVORITE_ERRORS = "favorites/RECEIVE_FAVORITE_ERRORS";
const RESET_FAVORITES = 'favorites/RESET_FAVORITES';

export const resetFavorites = () => ({
  type: RESET_FAVORITES,
});

const setFavorites = (favorites) => ({
  type: SET_FAVORITES,
  favorites,
});

export const addFavorite = (favorite) => ({
  type: ADD_FAVORITE,
  favorite,
});

export const removeFavorite = (favoriteId) => ({
  type: REMOVE_FAVORITE,
  favoriteId,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_FAVORITE_ERRORS,
  errors,
});

export const fetchFavorites = () => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/favorites");
    const favorites = await res.json();
    dispatch(setFavorites(favorites));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const createFavorite = (data) => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/favorites/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const favorite = await res.json();
    dispatch(addFavorite(favorite));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const deleteFavorite = (favoriteId) => async (dispatch) => {
  const response = await jwtFetch(`/api/favorites/${favoriteId}`, {
    method: "DELETE",
  });
  dispatch(removeFavorite(favoriteId));
  return response;
};

function favoritesReducer(state = {}, action) {
  switch (action.type) {
    case SET_FAVORITES:
      return { ...action.favorites };
    case ADD_FAVORITE:
      return { ...state, [action.favorite._id]: action.favorite };
    case REMOVE_FAVORITE:
      const newState = { ...state };
      delete newState[action.favoriteId];
      return newState;
    case RESET_FAVORITES:
      return {};
    default:
      return state;
  }
}

export default favoritesReducer;
