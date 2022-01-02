import React, { Component, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Guest from "./Guest";
const Register = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    firstName: "",
    secondName: "",
    about: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
  });
  const [registered, setRegistered] = useState(false);

  const handleFirstName = (event) => {
    setUser({ ...user, firstName: event.target.value });
  };
  const handleSecondName = (event) => {
    setUser({ ...user, secondName: event.target.value });
  };
  const handleAbout = (event) => {
    setUser({ ...user, firstName: event.target.value });
  };
  const handleGender = (event) => {
    setUser({ ...user, secondName: event.target.value });
  };
  const handleEmail = (event) => {
    setUser({ ...user, firstName: event.target.value });
  };
  const handlePhone = (event) => {
    setUser({ ...user, secondName: event.target.value });
  };
  const handlePassword = (event) => {
    setUser({ ...user, secondName: event.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      FirstName: user.firstName,
      SecondName: user.lastName,
      About: user.about,
      Gender: user.gender,
      Email: user.email,
      Phone: user.phone,
      Password: user.password,
    };
    try {
      await axios.post("User/signup", data);
      setRegistered(true);
      setError(null);
    } catch (err) {
      if (err.response.status === 401 || err.response.status === 400) {
        setError(err.response.data.message);
      } else {
        setError("something went wrong. Please try again");
      }
      console.log("error >>>", err);
    }
  };
  if (registered) {
    return <Navigate to={"/login"} />;
  }
  return (
    <Guest>
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Register</h3>

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              onChange={(e) => (this.firstName = e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              onChange={(e) => (this.lastName = e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={(e) => (this.email = e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => (this.password = e.target.value)}
            />
          </div>
          <button className="btn btn-primary btn-block btn-lg">Sign Up</button>
        </form>
      </div>
    </Guest>
  );
};
export default Register;
