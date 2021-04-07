import React from "react";
import Login from "./Login";
import Signup from "./SignUp";
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
import {
  postLogin,
  postLogout,
  postTransferMoney,
  postSignUp,
} from "../redux/actions/actions";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

function MainPage({ login, sendMoney, loggedInClient, signup, logout }) {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
      <Router>
        <Switch>
          <Route path="/login" component={() => <Login login={login} />} />
          <Route path="/signup" component={() => <Signup signup={signup} />} />
          <Route
            path="/sendMoney"
            component={() => (
              <SendMoney
                sendMoney={sendMoney}
                senderInfo={loggedInClient.clientData}
              />
            )}
          />

          <Route
            path="/accoutDashBoard"
            exact
            component={() => (
              <Dashboard info={loggedInClient.clientData} logout={logout} />
            )}
          />
          <Route path="/" exact component={() => <Login login={login} />} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(postLogin(data)),
  sendMoney: (info) => dispatch(postTransferMoney(info)),
  signup: (data) => dispatch(postSignUp(data)),
  logout: () => dispatch(postLogout()),
});

function mapStateToProps(state) {
  return {
    loggedInClient: state.loggedInClient,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
