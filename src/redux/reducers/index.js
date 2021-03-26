import { combineReducers } from "redux";
import loggedInClient from "./reducers";

const rootReducer = combineReducers({
  loggedInClient,
});

export default rootReducer;
