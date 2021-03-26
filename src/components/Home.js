import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Welcome To Gold Bank</h1>
      <NavLink className="btn btn-primary mt-4" id="navLink" to="/login">
        Login
      </NavLink>
      <NavLink className="btn btn-primary mt-4" id="navLink" to="/signup">
        Open an Account
      </NavLink>
    </>
  );
}

export default Home;
