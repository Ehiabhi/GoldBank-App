import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { history } from "./MainPage";
import { initiateGetProfile } from "../redux/actions/actions";
import { store } from "../index";

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Gold Bank PLC
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
      history.push(currentPath);
    } else {
      history.push("/accoutDashBoard");
    }
  } else {
    history.push("/");
  }
};

export const setAuthHeader = () => {
  const token = localStorage.getItem("user_token");
  return token;
};
