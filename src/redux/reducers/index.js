import { combineReducers } from "redux";
import loggedInClient from "./clientreducers";
import updateClientListDataReducer from "./clientListReducer";
import updateInitialClientAccountNameReducer from "./clientAccountName";

const rootReducer = combineReducers({
  loggedInClient,
  updateClientListDataReducer,
  updateInitialClientAccountNameReducer,
});

export default rootReducer;
