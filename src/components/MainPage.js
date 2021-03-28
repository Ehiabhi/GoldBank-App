import React from "react";
import Login from "./Login";
import Signup from "./SignUp";
import Home from "./Home";
import Dashboard from "./AccountDashboard";
import SendMoney from "./SendMoney";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainPage({ dispatch, loggedInClient }) {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
      <Router>
        <Switch>
          <Route
            path="/login"
            component={() => <Login dispatch={dispatch} />}
          />
          <Route path="/signup" component={Signup} />
          <Route
            path="/sendMoney"
            component={() => (
              <SendMoney
                dispatch={dispatch}
                senderInfo={loggedInClient.clientData}
              />
            )}
          />

          <Route
            path="/accoutDashBoard"
            exact
            component={() => <Dashboard info={loggedInClient.clientData} />}
          />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

function mapStateToProps(state) {
  return {
    loggedInClient: state.loggedInClient,
  };
}

export default connect(mapStateToProps)(MainPage);
