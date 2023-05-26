import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_REVIEWS = "reviews/RECEIVE_REVIEWS";
const RECEIVE_USER_REVIEWS = "reviews/RECEIVE_USER_REVIEWS";
const RECEIVE_RECIPE_REVIEWS = "reviews/RECEIVE_RECIPE_REVIEWS";
const RECEIVE_NEW_REVIEW = "reviews/RECEIVE_NEW_REVIEW";
const RECEIVE_UPDATED_REVIEW = "reviews/RECEIVE_UPDATED_REVIEW";
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";
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

const receiveUpdatedReview = (review) => ({
  type: RECEIVE_UPDATED_REVIEW,
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

export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId,
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

export const composeReview = (data, images) => async (dispatch) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("text", data.text);
  formData.append("recipe", data.recipe);
  formData.append("wouldMakeAgain", data.wouldMakeAgain);
  formData.append("wouldRecommend", data.wouldRecommend);
  formData.append("starRating", data.starRating);

  Array.from(images).forEach((image) => {
    formData.append("images", image);
  });

  try {
    const res = await jwtFetch("/api/reviews/", {
      method: "POST",
      body: formData
    });
    const review = await res.json();
    dispatch(receiveNewReview(review));
  } catch (err) {
      if (err && err.json) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
          return dispatch(receiveErrors(resBody.errors));
        }
      } else {
        console.error(err);
      }
  }
};

export const updateReview = (data, images, reviewId) => async (dispatch) => {

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("text", data.text);
  formData.append("recipe", data.recipe);
  formData.append("wouldMakeAgain", data.wouldMakeAgain);
  formData.append("wouldRecommend", data.wouldRecommend);
  formData.append("starRating", data.starRating);
  formData.append("imageUrls", JSON.stringify(data.imageUrls));

  Array.from(images).forEach((image) => {
    formData.append("images", image);
  });

  try {
    const res = await jwtFetch(`/api/reviews/${reviewId}`, {
      method: "PUT",
      body: formData,
    });
    const review = await res.json();
    dispatch(receiveUpdatedReview(review));
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
  state = { all: {}, user: {}, recipe: {}, new: undefined },
  action
) => {
  switch (action.type) {
    case RECEIVE_REVIEWS:
      return { ...state, all: action.reviews, new: undefined };
    case RECEIVE_USER_REVIEWS:
      return { ...state, user: action.reviews, new: undefined };
    case RECEIVE_RECIPE_REVIEWS:
      return { ...state, recipe: action.reviews, new: undefined };
    case RECEIVE_NEW_REVIEW:
      return {
        ...state,
        new: action.review,
      };
    case RECEIVE_UPDATED_REVIEW:
      return {
        ...state,
        new: action.review,
      };
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: {}, new: undefined };
    case REMOVE_REVIEW:
      const newState = { ...state };
      delete newState.all[action.reviewId];
      delete newState.recipe[action.reviewId];
      delete newState.user[action.reviewId];
      return newState;

    default:
      return state;
  }
};

export default reviewsReducer;
