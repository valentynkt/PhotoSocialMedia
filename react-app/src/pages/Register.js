import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Guest from "../components/Guest";
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

  const handleChangeFunc = (event) => {
    const { name, value } = event.target

    setUser((prevValue) => ({
        ...prevValue,
        [name]: value,
    }))
}

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
          setError("This email is already taken");
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

          <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="Enter first name"
                        name="firstName"
                        required minLength="3"
                        onChange={handleChangeFunc}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Enter last name"
                        name="secondName"
                        required minLength="3"
                        onChange={handleChangeFunc}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="eMail">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="eMail"
                        placeholder="Enter email"
                        name="email"
                        required pattern="^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$"
                        onChange={handleChangeFunc}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Enter phone number"
                        name="phone"
                        required pattern="^[0-9\-\+]{9,15}$"
                        onChange={handleChangeFunc}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="about">About</label>
                      <textarea
                        className="form-control"
                        id="about"
                        placeholder="Write About Yourself"
                        name="about"
                        required minLength="6"
                        onChange={handleChangeFunc}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <select className="form-select  mb-3" name="gender"  onChange={handleChangeFunc}>
                        <option defaultValue value="male">
                          Male
                        </option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mt-3 mb-2 text-primary">Password</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="Password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="Password"
                        placeholder="Enter Password"
                        name="password"
                        required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                        onChange={handleChangeFunc}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="ConfirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="ConfirmPassword"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                        onChange={handleChangeFunc}
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
