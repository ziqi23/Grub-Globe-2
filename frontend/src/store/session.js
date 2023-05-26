import jwtFetch from './jwt';

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";

const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
});

let API_BASE_URL;
process.env.NODE_ENV === "production" ? API_BASE_URL = "https://grubglobe.herokuapp.com" : API_BASE_URL = "http://localhost:3000"


export const signup = user => startSession(user, `${API_BASE_URL}/api/users/register`);
export const login = user => startSession(user, `${API_BASE_URL}/api/users/login`);

const startSession = (userInfo, route) => async dispatch => {
  try {
    const res = await jwtFetch(route, {
      method: "POST",
      body: JSON.stringify(userInfo)
    });
    const { user, token } = await res.json();
    localStorage.setItem('jwtToken', token);
    return dispatch(receiveCurrentUser(user));
  } catch (err) {
    const res = await err.json();
    if (res.statusCode === 400) {
      return dispatch(receiveErrors(res.errors));
    }
  }
};

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(logoutUser());
  };

  const initialState = {
    user: undefined
  };

export const getCurrentUser = () => async dispatch => {
  const res = await jwtFetch('/api/users/current');
  const user = await res.json();
  return dispatch(receiveCurrentUser(user));
};

export const uploadImage = image => async dispatch => {
  const res = await jwtFetch('/api/users/upload', {
    method: "POST",
    body: image
  });
  const user = await res.json();
  return dispatch(receiveCurrentUser(user))
}

export const addCompletedRecipe = (recipe) => async dispatch => {
  const res = await jwtFetch('/api/users/completeRecipe', {
    method: "PATCH",
    body: JSON.stringify(recipe)
  });

  if (!res.ok) {
    throw Error(res.statusText);
  }

  const user = await res.json();
  return dispatch(receiveCurrentUser(user))
}

const sessionReducer = (state = initialState, action) => {
switch (action.type) {
    case RECEIVE_CURRENT_USER:
    return { user: action.currentUser };
    case RECEIVE_USER_LOGOUT:
    return initialState;
    default:
    return state;
}
};

const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
    case CLEAR_SESSION_ERRORS:
      return nullErrors;
    default:
      return state;
  }
}

export default sessionReducer;
