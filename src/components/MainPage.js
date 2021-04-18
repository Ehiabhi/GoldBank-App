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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  postLogin,
  postLogout,
  postTransferMoney,
  postSignUp,
  viewRegisteredUsers,
} from "../redux/actions/actions";

import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

function MainPage({
  login,
  sendMoney,
  loggedInClient,
  signup,
  logout,
  viewUserList,
  usersList,
}) {
  const handleLogOut = () => {
    logout();
    toast.success("You've been logged out successfully.");
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
      <div className="row">
        <Router>
          <Switch>
            <Route path="/login" component={() => <Login login={login} />} />
            <Route
              path="/signup"
              component={() => <Signup signup={signup} />}
            />
            <Route
              path="/sendMoney"
              component={() => (
                <SendMoney
                  sendMoney={sendMoney}
                  viewUsersList={viewUserList}
                  senderInfo={loggedInClient.clientData}
                  usersList={usersList}
                  logout={handleLogOut}
                />
              )}
            />

            <Route
              path="/accoutDashBoard"
              component={() => (
                <Dashboard
                  info={loggedInClient.clientData}
                  logout={handleLogOut}
                />
              )}
            />
            <Route path="/" exact component={() => <Login login={login} />} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(postLogin(data)),
  sendMoney: (info) => dispatch(postTransferMoney(info)),
  signup: (data) => dispatch(postSignUp(data)),
  logout: () => dispatch(postLogout()),
  viewUserList: () => dispatch(viewRegisteredUsers()),
});

function mapStateToProps(state) {
  return {
    loggedInClient: state.loggedInClient,
    usersList: state.updateClientListDataReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
