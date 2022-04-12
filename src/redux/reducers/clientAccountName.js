import * as actionTypes from "../actionTypes";
import { initialClientAccountInfo } from "./initialState";

export default function updateInitialClientAccountNameReducer(
  state = {
    receiverInfo: initialClientAccountInfo,
  },
  action
) {
  switch (action.type) {
    case actionTypes.GET_CLIENT_FOR_TRANSACTION:
      return { receiverInfo: action.payload };

    default:
      return state;
  }
}
