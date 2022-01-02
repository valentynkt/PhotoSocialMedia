import React, { Component, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Guest from "./Guest";
import { Alert } from "react-bootstrap";
const Register = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    firstName: "",
    secondName: "",
    about: "",
    gender: "male",
    email: "",
    phone: "",
    password: "",
    confirmPassword:""
  });
  const [registered, setRegistered] = useState(false);

  const handleFirstName = (event) => {
    setUser({ ...user, firstName: event.target.value });
  };
  const handleSecondName = (event) => {
    setUser({ ...user, secondName: event.target.value });
  };
  const handleAbout = (event) => {
    setUser({ ...user, about: event.target.value });
  };
  const handleGender = (event) => {
    var value=event.target.options[event.target.selectedIndex].value;
    setUser({ ...user, gender: value});
  };
  const handleEmail = (event) => {
    setUser({ ...user, email: event.target.value });
  };
  const handlePhone = (event) => {
    setUser({ ...user, phone: event.target.value });
  };
  const handlePassword = (event) => {
    setUser({ ...user, password: event.target.value });
  };
  const handleConfirmPassword = (event) => {
    setUser({ ...user, confirmPassword: event.target.value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (user.password!==user.confirmPassword) {
      setError("Confirm password and password are different")
    }
    else{
      const data = {
        FirstName: user.firstName,
        SecondName: user.secondName,
        About: user.about,
        Gender: user.gender,
        Email: user.email,
        PhoneNumber: user.phone,
        Password: user.password,
      };
      try {
        await axios.post("User/signup", data);
        setRegistered(true);
      } catch (err) {
        if (err.response.status === 401 || err.response.status === 400) {
          setError(err.response.data.message);
        } else {
          setError("something went wrong. Please try again");
        }
        console.log("error >>>", err);
      }
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

          <div class="card-body">
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="firstName">First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="firstName"
                        placeholder="Enter first name"
                        required minlength="3"
                        onChange={handleFirstName}
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="lastName">Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="lastName"
                        placeholder="Enter last name"
                        required minlength="3"
                        onChange={handleSecondName}
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="eMail">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="eMail"
                        placeholder="Enter email"
                        required pattern="^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$"
                        onChange={handleEmail}
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="phone">Phone</label>
                      <input
                        type="text"
                        class="form-control"
                        id="phone"
                        placeholder="Enter phone number"
                        required pattern="^[0-9\-\+]{9,15}$"
                        onChange={handlePhone}
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="about">About</label>
                      <textarea
                        class="form-control"
                        id="about"
                        placeholder="Write About Yourself"
                        required minLength="6"
                        onChange={handleAbout}
                      ></textarea>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="gender">Gender</label>
                      <select class="form-select  mb-3"  onChange={handleGender}>
                        <option defaultValue value="male">
                          Male
                        </option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mt-3 mb-2 text-primary">Password</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="Password">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="Password"
                        placeholder="Enter Password"
                        required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                        onChange={handlePassword}
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="ConfirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="ConfirmPassword"
                        placeholder="Confirm Password"
                        required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                        onChange={handleConfirmPassword}
                      />
                    </div>
                  </div>
                </div>
                {error && <Alert severity="error">{error}</Alert>}
          </div>
          <button className="btn btn-primary btn-block btn-lg">Sign Up</button>
        </form>
      </div>
    </Guest>
  );
};
export default Register;
