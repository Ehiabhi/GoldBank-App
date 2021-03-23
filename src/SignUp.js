import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export default function SignUp() {
  const [signupFormData, setSignupFormData] = useState({
    fullName: "",
    contact: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [goToLogin, setGoToLogin] = useState(false);

  const signUp = (e) => {
    e.preventDefault();
    if (signupFormData.password !== signupFormData.confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(signupFormData),
    })
      .then((response) => {
        if (response.ok) {
          setGoToLogin(true);
        }
      })
      .catch((err) => {
        console.log("An error occured " + err);
      });
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSignupFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <>
      {goToLogin && <Redirect to="/login" />}
      <h1>Welcome</h1>
      <h2>Kindly sign up to own an account with us today.</h2>
      <form onSubmit={signUp}>
        <div className="form-group">
          <input
            type="text"
            name="fullName"
            className="form-control"
            placeholder="Full Name"
            value={signupFormData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="contact"
            className="form-control"
            placeholder="Phone Number"
            value={signupFormData.contact}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <select
            className="form-control"
            name="gender"
            value={signupFormData.gender}
            onChange={handleInputChange}
            required
          >
            {/* Used to create a placeholder for the select element. */}
            <option value="" hidden>
              Select a gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="undisclosed">Prefer not to say</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={signupFormData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            placeholder="Confirm Password"
            value={signupFormData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </>
  );
}
