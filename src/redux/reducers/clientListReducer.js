import * as actionTypes from "../actionTypes";
import { initialClientList } from "./initialState";

export default function updateClientListDataReducer(
  state = initialClientList,
  action
) {
  switch (action.type) {
    case actionTypes.GET_CLIENT_LIST:
      return [...action.payload];

    case actionTypes.REMOVE_CLIENT_LIST:
      return initialClientList;

    default:
      return state;
  }
}
