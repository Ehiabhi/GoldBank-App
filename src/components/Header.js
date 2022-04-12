import React from "react";
import { withRouter } from "react-router-dom";
// import Buttons from "./Buttons";

function Header({ handleLogOut, history }) {
  const logout = () => {
    handleLogOut();
    history.push("/");
  };
  return (
    <div id="dashBoard" className="col-xs-6 col-md-6">
      <h1>Gold Bank</h1>
      {/* <Buttons
        id="logoutButton"
        name="logout"
        value1="Log out"
        fetchAction={logout}
      /> */}
      {/* <BiPowerOff /> */}
      <button className="btn btn-danger" onClick={logout}>
        Log out
      </button>
    </div>
  );
}

export default withRouter(Header);
