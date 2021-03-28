import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { updateClientData } from "../redux/actions/actions";

function Login({ dispatch }) {
  const [loginFormData, setLoginFormData] = useState({
    accountNumber: "",
    password: "",
  });

  const [goToDashboard, setGoToDashboard] = useState(false);

  const logIn = async (e) => {
    e.preventDefault();
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(loginFormData),
    });
    if (response.ok) {
      const data = await response.json();
      setGoToDashboard(true);
      dispatch(updateClientData(data));
    } else {
      const message = response.text;
      console.log("An error occured " + response.text);
      throw new Error(message);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <>
      {goToDashboard && <Redirect to="/accoutDashBoard" />}
      <h1>Welcome</h1>
      <h2>Kindly input your login details to sign in</h2>
      <form onSubmit={logIn}>
        <div className="form-group">
          <input
            type="number"
            name="accountNumber"
            min="0"
            className="form-control"
            placeholder="Account/Phone Number"
            value={loginFormData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={loginFormData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
