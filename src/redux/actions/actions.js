import * as actionTypes from "../actionTypes";
import { setAuthHeader } from "../../components/utils";
import { initialClientState } from "../reducers/initialState";

export function updateClientData(data) {
  return { type: actionTypes.GET_CLIENT_INFO, payload: data };
}

export function updateClientList(data) {
  return { type: actionTypes.GET_CLIENT_LIST, payload: data };
}

export function removeClientList() {
  return { type: actionTypes.REMOVE_CLIENT_LIST };
}

export function getClientAccountName(data) {
  return { type: actionTypes.GET_CLIENT_FOR_TRANSACTION, payload: data };
}

export const getUserProfile = (acctNum) => (dispatch) => {
  return fetch("/acctNumInquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(acctNum),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        let error = new Error();
        error.message = {
          text: response.statusText,
          status: response.status,
        };
        throw error;
      }
    })
    .then((response) => response.json())
    .then((res) => {
      dispatch(
        getClientAccountName({
          fullName: res.fullName,
          accountNumber: res.accountNumber,
        })
      );
      return { success: true };
    })
    .catch((error) => {
      throw error;
    });
};

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
        let error = new Error();
        error.message = {
          text: response.statusText,
          status: response.status,
        };
        throw error;
      }
    })
    .then((response) => response.json())
    .then((res) => {
      localStorage.setItem("user_token", res.authToken);
      dispatch(updateClientData(res));
      return { success: true };
    })
    .catch((error) => {
      throw error;
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
      dispatch(removeClientList());
      dispatch(getClientAccountName({ fullName: null, accountNumber: null }));
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
        let error = new Error();
        error.message = {
          text: response.statusText,
          status: response.status,
        };
        throw error;
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const postLogout = () => (dispatch) => {
  return fetch("/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + setAuthHeader(),
    },
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
      localStorage.removeItem("user_token");
      dispatch(updateClientData(initialClientState));
      return { success: true };
    })
    .catch((error) => {
      var errmess = new Error(error.message);
      alert(errmess);
      return { success: false };
    });
};

export const initiateGetProfile = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("/getProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + setAuthHeader(),
        },
      });
      const profile = await response.json();
      dispatch(updateClientData(profile));
    } catch (error) {
      var errmess = new Error(error.message);
      alert(errmess);
    }
  };
};

export const viewRegisteredUsers = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("/viewRegisteredUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const usersList = await response.json();
      dispatch(updateClientList(usersList));
    } catch (error) {
      var errmess = new Error(error.message);
      alert(errmess);
    }
  };
};
