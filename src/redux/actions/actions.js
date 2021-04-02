import * as actionTypes from "../actionTypes";

export function updateClientData(data) {
  return { type: actionTypes.GET_CLIENT_INFO, payload: data };
}

export const postLogin = (formData) => (dispatch) => {
  return fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        console.log("An error occured " + response.text);
        let error = new Error("Error: " + response.statusText);
        throw error;
      }
    })
    .then((response) => response.json())
    .then((res) => {
      dispatch(updateClientData(res));
      return { success: true };
    })
    .catch((error) => {
      var errmess = new Error(error.message);
      alert(errmess);
      return { success: false };
    });
};

export const postTransferMoney = (transferdata) => (dispatch) => {
  return fetch("/transfer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(transferdata),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        console.log("An error occured " + response.text);
        let error = new Error(
          "Error " + response.status + ": " + response.statusText
        );
        error.response = response;
        throw error;
      }
    })
    .then((response) => response.json())
    .then((data) => {
      dispatch(updateClientData(data));
      return true;
    })
    .catch((error) => {
      var errmess = new Error(error.message);
      throw errmess;
    });
};

export const postSignUp = (formData) => (dispatch) => {
  return fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        return true;
      } else {
        console.log("An error occured " + response.text);
        let error = new Error("Error: " + response.statusText);
        throw error;
      }
    })
    .catch((err) => {
      var errmess = new Error(err.message);
      throw errmess;
    });
};
