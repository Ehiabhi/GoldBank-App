import * as actionTypes from "../actionTypes";

export function updateClientData(data) {
  return { type: actionTypes.GET_CLIENT_INFO, payload: data };
}
