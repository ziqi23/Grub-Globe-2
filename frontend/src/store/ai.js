// import jwtFetch from "./jwt";

// const RECEIVE_AI_ANSWER = "ai/RECEIVE_AI_ANSWER";
// const CLEAR_AI_ANSWER = "ai/CLEAR_AI_ANSWER";

// const receiveAiAnswer = (aiAnswer) => ({
//   type: RECEIVE_AI_ANSWER,
//   aiAnswer,
// });

// export const clearAiAnswer = () => ({
//   type: CLEAR_AI_ANSWER,
// });

// export const signup = (user) => startSession(user, "api/users/register");
// export const login = (user) => startSession(user, "api/users/login");

// export const fetchAiAnswer = (prompt) => async (dispatch) => {
//   try {
//     const res = await jwtFetch("api/generate", {
//       method: "POST",
//       body: JSON.stringify(userInfo),
//     });
//     const { user, token } = await res.json();
//     localStorage.setItem("jwtToken", token);
//     return dispatch(receiveCurrentUser(user));
//   } catch (err) {
//     const res = await err.json();
//     if (res.statusCode === 400) {
//       return dispatch(receiveErrors(res.errors));
//     }
//   }
// };

// const initialState = {
//   user: undefined,
// };

// export const getCurrentUser = () => async (dispatch) => {
//   const res = await jwtFetch("/api/users/current");
//   const user = await res.json();
//   return dispatch(receiveCurrentUser(user));
// };

// const sessionReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case RECEIVE_CURRENT_USER:
//       return { user: action.currentUser };
//     case RECEIVE_USER_LOGOUT:
//       return initialState;
//     default:
//       return state;
//   }
// };

// export default sessionReducer;
