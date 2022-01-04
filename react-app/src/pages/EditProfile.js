import React, { useState } from "react";
import User from "../components/User";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function EditProfile() {
  let user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    firstName: user ? user.firstName : "",
    secondName: user ? user.secondName : "",
    about: user ? user.about : "",
    gender: user ? user.gender: "",
    email: user ? user.email: "",
    phone: user ? user.phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [redirect, setRedirect] = useState(null);
  const handleChangeFunc = (event) => {
    const { name, value } = event.target;

    setNewUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (user.password !== user.confirmPassword) {
      setError("Confirm password and password are different");
    } else {
      const data = {
        FirstName: newUser.firstName,
        SecondName: newUser.secondName,
        About: newUser.about,
        Gender: newUser.gender,
        Email: newUser.email,
        Password: newUser.password,
      };
      try {
        await axios.put("User", data);
        localStorage.clear();
        setRedirect("/login");
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

  const cancelledHandler = () => {
    setRedirect("/user/account");
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <User>
      <div className="auth-inner">
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <h5 className="user-name">
                      {user.firstName + " " + user.secondName}
                    </h5>
                    <h6 className="user-email">{user.email}</h6>
                  </div>
                  <div className="about">
                    <h5>About</h5>
                    <p>
                      I'm Yuki. Full Stack Designer I enjoy creating
                      user-centric, delightful and human experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="firstName">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="Enter first name"
                        name="firstName"
                        required
                        minLength="3"
                        onChange={handleChangeFunc}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="lastName">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Enter last name"
                        name="secondName"
                        required
                        minLength="3"
                        onChange={handleChangeFunc}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="about">About</label>
                      <textarea
                        className="form-control"
                        id="about"
                        placeholder="Write About Yourself"
                        name="about"
                        required
                        minLength="6"
                        onChange={handleChangeFunc}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="gender">Gender</label>
                      <select
                        className="form-select  mb-3"
                        name="gender"
                        onChange={handleChangeFunc}
                      >
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
                      <label for="Password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="Password"
                        placeholder="Enter Password"
                        name="password"
                        required
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                        onChange={handleChangeFunc}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="ConfirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="ConfirmPassword"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        required
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                        onChange={handleChangeFunc}
                      />
                    </div>
                  </div>
                </div>
                {error && <Alert severity="error">{error}</Alert>}
                <div className="row gutters d-flex justify-content-center">
                  <div className="d-flex justify-content-around updateBlockButtons">
                    <button
                      type="button"
                      id="submit"
                      name="submit"
                      className="btn btn-secondary btn-lg"
                      onClick={cancelledHandler}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      id="submit"
                      name="submit"
                      className="btn btn-primary btn-lg"
                      onClick={handleSubmit}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </User>
  );
}
export default EditProfile;
