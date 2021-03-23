import React from "react";
import Login from "./Login";
import Signup from "./SignUp";
import Home from "./Home";
import Dashboard from "./AccountDashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export default function MainPage() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/accoutDashBoard" exact component={Dashboard} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}
