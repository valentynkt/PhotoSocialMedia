import React, { Component } from "react";
import axios from "axios";
import User from "./User";
function Account() {
  let user = JSON.parse(localStorage.getItem("user"));
  return (
    <User>
      <div className="auth-inner">
      <div className="row profile">
        <div className="col-md-3">
          <div className="profile-sidebar">
            <div className="profile-usertitle">
              <div className="profile-usertitle-name">Sfgdsfsd SDfsdfs</div>
              <div className="profile-usertitle-job">Developer</div>
            </div>

            <div className="profile-userbuttons">
              <a className="btn btn-success btn-sm">Edit my profile</a>
            </div>

            <div className="profile-usermenu">
              <ul className="nav">
                <li className="active">
                  <a href="profile.html">
                    <i className="glyphicon glyphicon-home"></i>
                    Overview{" "}
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="glyphicon glyphicon-user"></i>
                    Account Settings{" "}
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank">
                    <i className="glyphicon glyphicon-ok"></i>
                    Tasks{" "}
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="glyphicon glyphicon-flag"></i>
                    Help{" "}
                  </a>
                </li>
              </ul>
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
                  <td>Department:</td>
                  <td>Programming</td>
                </tr>
                <tr>
                  <td>Hire date:</td>
                  <td>06/23/2013</td>
                </tr>
                <tr>
                  <td>Date of Birth</td>
                  <td>01/24/1988</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>Male</td>
                </tr>
                <tr>
                  <td>Home Address</td>
                  <td>Yaoundé,Cameroub</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    <a href="mailto:info@yuscards.com">info@yuscarsd.com</a>
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
