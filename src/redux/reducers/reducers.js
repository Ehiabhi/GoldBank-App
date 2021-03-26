import * as actionTypes from "../actionTypes";

export default function updateClientDataReducer(
  state = {
    clientData: null,
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
