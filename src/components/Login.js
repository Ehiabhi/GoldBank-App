import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login({ login, history }) {
  const [loginFormData, setLoginFormData] = useState({
    accountNumber: "",
    password: "",
  });

  const logIn = async (e) => {
    e.preventDefault();
    login(loginFormData)
      .then((status) => {
        if (status.success) {
          history.push("/accoutDashBoard");
          toast.success("Login successful.");
        }
      })
      .catch((err) => {
        let mes = new Error();
        mes.message = err.text;
        alert(err);
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
      <h1>Welcome To Gold Bank.</h1>
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
        <div className="action-items">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <Link className="btn btn-outline-primary" to={"/signup"}>
            Sign Up
          </Link>
        </div>
      </form>
    </>
  );
}

export default withRouter(Login);
