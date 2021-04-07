// import jwt_decode from "jwt-decode";
import { history } from "./MainPage";
import { initiateGetProfile } from "../redux/actions/actions";
import { store } from "../index";

export function greeting() {
  const currentHour = new Date().getHours();
  if (currentHour < 12 || currentHour === 0) {
    return "Good morning";
  } else if (currentHour < 16) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

export const maintainSession = () => {
  const user_token = localStorage.getItem("user_token");
  const currentPath = window.location.pathname;
  if (user_token) {
    store.dispatch(initiateGetProfile());
    if (currentPath !== "/accoutDashBoard" && currentPath !== "/sendMoney") {
      history.push("/");
    } else {
      history.push(currentPath);
    }
  } else {
    history.push("/");
  }
};

export const setAuthHeader = () => {
  const token = localStorage.getItem("user_token");
  return token;
};
