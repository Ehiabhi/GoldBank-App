import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function Login() {
  const [loginFormData, setLoginFormData] = useState({
    accountNumber: "",
    password: "",
  });

  const [goToDashboard, setGoToDashboard] = useState(false);

  const logIn = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(loginFormData),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response.json(response));
          setGoToDashboard(true);
        }
      })
      .catch((err) => {
        console.log("An error occured " + err);
      });
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
