import React from "react";
import { withRouter } from "react-router-dom";

function Header({ handleLogOut, history }) {
  const logout = () => {
    handleLogOut();
    history.push("/");
  };
  return (
    <div className="row">
      <div id="dashBoard" className="col-md-6">
        <h1>Gold Bank</h1>
      </div>
      <div className="offset-md-3 col-md-3">
        <button className="btn btn-danger" onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default withRouter(Header);
