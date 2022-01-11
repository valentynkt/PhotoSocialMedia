import React from 'react';
import Admin from "../components/Admin";
import { useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useNavigate,Navigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
const EditUserComponent = (props) => {
    const [loading, setLoading] = useState(true);
    const [error,setError]=useState("");
    const [newUser, setNewUser] = useState({
        firstName: props.user ? props.user.firstName : "",
        secondName: props.user ? props.user.secondName : "",
        about: props.user ? props.user.about : "",
        gender: props.user ? props.user.gender: "",
        email: props.user ? props.user.email: "",
        phone: props.user ? props.user.phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
      const navigate = useNavigate();
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
        if (props.user.password !== props.user.confirmPassword) {
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
            setRedirect("/admin/users");
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
      if (redirect) {
        return <Navigate to={redirect} />;
      }
    return (
        <div className="row gutters">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="account-settings">
                <div className="user-profile">
                  <h5 className="user-name">
                    {props.user.firstName + " " + props.user.secondName}
                  </h5>
                  <h6 className="user-email">{props.user.email}</h6>
                </div>
                <div className="about">
                  <h5>About</h5>
                  <p>
                   {props.user.about}
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
                <Link color="primary" to={`/admin/users`}>
                  <button
                    type="button"
                    id="submit"
                    name="submit"
                    className="btn btn-secondary btn-lg"
                    // onClick={cancelledHandler}
                  >
                    Cancel
                  </button>
                  </Link>
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
    );
};

export default EditUserComponent;