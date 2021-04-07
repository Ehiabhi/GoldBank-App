import { combineReducers } from "redux";
import loggedInClient from "./clientreducers";
import updateClientListDataReducer from "./clientListReducer";

const rootReducer = combineReducers({
  loggedInClient,
  updateClientListDataReducer,
});

export default rootReducer;
