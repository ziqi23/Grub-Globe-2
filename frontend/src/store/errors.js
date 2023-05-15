import { combineReducers } from "redux";
import { sessionErrorsReducer } from "./session";
import { reviewErrorsReducer } from "./reviews";

export default combineReducers({
  session: sessionErrorsReducer,
  reviews: reviewErrorsReducer,
});
