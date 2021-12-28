import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Guest from "./Guest";
export default class Register extends Component {
  state = {};
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      FirstName: this.firstName,
      SecondName: this.lastName,
      Email: this.email,
      Password: this.password,
    };
    axios
      .post("User/signup", data)
      .then((res) => {
        console.log(res.data);
        this.setState({
          registered: true,
        });
      })
      .catch((err) => {
        console.log(err.data);
      });
    console.log(data);
  };
  render() {
    if (this.state.registered) {
      return <Navigate to={"/login"} />;
    }
    return (
      <Guest>
        <div className="auth-inner">
          <form onSubmit={this.handleSubmit}>
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
            <button className="btn btn-primary btn-block btn-lg">
              Sign Up
            </button>
          </form>
        </div>
      </Guest>
    );
  }
}
