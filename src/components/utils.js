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
    if (currentPath === "/accoutDashBoard" || currentPath === "/sendMoney") {
      if (window.location.origin === "http://localhost:3000") {
        history.push(currentPath);
      } else {
        window.location = window.location.origin + currentPath;
      }
    } else {
      if (window.location.origin === "http://localhost:3000") {
        history.push("/accoutDashBoard");
      } else {
        window.location = window.location.origin + "/accoutDashBoard";
      }
    }
  } else {
    if (window.location.origin === "http://localhost:3000") {
      history.push("/");
    } else {
      window.location = window.location.origin;
    }
  }
};

export const setAuthHeader = () => {
  const token = localStorage.getItem("user_token");
  return token;
};
