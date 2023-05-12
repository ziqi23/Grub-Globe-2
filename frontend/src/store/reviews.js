import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_REVIEWS = "reviews/RECEIVE_REVIEWS";
const RECEIVE_USER_REVIEWS = "reviews/RECEIVE_USER_REVIEWS";
const RECEIVE_RECIPE_REVIEWS = "reviews/RECEIVE_RECIPE_REVIEWS";
const RECEIVE_NEW_REVIEW = "reviews/RECEIVE_NEW_REVIEW";
const RECEIVE_REVIEW_ERRORS = "reviews/RECEIVE_REVIEW_ERRORS";
const CLEAR_REVIEW_ERRORS = "reviews/CLEAR_REVIEW_ERRORS";

const receiveReviews = (reviews) => ({
  type: RECEIVE_REVIEWS,
  reviews,
});

const receiveUserReviews = (reviews) => ({
  type: RECEIVE_USER_REVIEWS,
  reviews,
});

const receiveRecipeReviews = (reviews) => ({
  type: RECEIVE_RECIPE_REVIEWS,
  reviews,
});

const receiveNewReview = (review) => ({
  type: RECEIVE_NEW_REVIEW,
  review,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_REVIEW_ERRORS,
  errors,
});

export const clearReviewErrors = (errors) => ({
  type: CLEAR_REVIEW_ERRORS,
  errors,
});

export const fetchReviews = () => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/reviews");
    const reviews = await res.json();
    dispatch(receiveReviews(reviews));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUserReviews = (id) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/reviews/user/${id}`);
    const reviews = await res.json();
    dispatch(receiveUserReviews(reviews));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchRecipeReviews = (id) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/reviews/recipe/${id}`);
    const reviews = await res.json();
    dispatch(receiveRecipeReviews(reviews));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchReview = (id) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/reviews/${id}`);
    const review = await res.json();
    dispatch(receiveNewReview(review));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const composeReview = (data) => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/reviews/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const review = await res.json();
    dispatch(receiveNewReview(review));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await jwtFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  dispatch(removeReview(reviewId));
  return response;
};

const nullErrors = null;

export const reviewErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_REVIEW_ERRORS:
      return action.errors;
    case RECEIVE_NEW_REVIEW:
    case CLEAR_REVIEW_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const reviewsReducer = (
  state = { all: {}, user: {}, new: undefined },
  action
) => {
  switch (action.type) {
    case RECEIVE_REVIEWS:
      return { ...state, all: action.reviews, new: undefined };
    case RECEIVE_USER_REVIEWS:
      return { ...state, user: action.reviews, new: undefined };
    case RECEIVE_NEW_REVIEW:
      return { ...state, new: action.review };
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: {}, new: undefined };
    default:
      return state;
  }
};

export default reviewsReducer;
