import * as actionTypes from "../actionTypes";
import initialState from "./initialState";

export default function updateClientDataReducer(
  state = {
    clientData: initialState,
  },
  action
) {
  switch (action.type) {
    case actionTypes.GET_CLIENT_INFO:
      return { ...state, clientData: action.payload };

    default:
      return state;
  }
}
