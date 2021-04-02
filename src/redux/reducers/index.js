import { combineReducers } from "redux";
import loggedInClient from "./clientreducers";

const rootReducer = combineReducers({
  loggedInClient,
});

export default rootReducer;
