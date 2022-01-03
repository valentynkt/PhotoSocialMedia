import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import User from "./User";
import Button from "@mui/material/Button";
function Account() {
  let user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const routeChange = () => {
    let path = `edit`;
    navigate(path);
  };

  return (
    <User>
      <div className="auth-inner">
        <div className="row profile">
          <div className="col-md-3">
            <div className="profile-sidebar">
              <div className="profile-usertitle">
                <h1 className="profile-usertitle-name">{user.firstName + " " + user.secondName}</h1>
              </div>
              <div class="about">
                <h5>About</h5>
                <p>
                  {user.about}
                </p>
              </div>
              <div className="profile-userbuttons">
                <Button onClick={routeChange} variant="contained">
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="profile-content">
              <div className="row">
                <div className="col-md-12">
                  <h4>Your Profile</h4>
                  <br />
                </div>
              </div>
              <table className="table table-user-information">
                <tbody>
                  <tr>
                    <td>Date of Registration</td>
                    <td>01/24/1988</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>Male</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>
                      <a href={"mailto:" + user.email}>{user.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td>237-4567-890(Landline)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </User>
  );
}
export default Account;
