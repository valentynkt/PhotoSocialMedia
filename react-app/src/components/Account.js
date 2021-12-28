import React, { Component } from "react";
import axios from "axios";
import User from "./User";
function Account() {
  let user = JSON.parse(localStorage.getItem("user"));
  return (
    <User>
      <div class="row profile">
        <div class="col-md-3">
          <div class="profile-sidebar">
            <div class="profile-usertitle">
              <div class="profile-usertitle-name">Sfgdsfsd SDfsdfs</div>
              <div class="profile-usertitle-job">Developer</div>
            </div>

            <div class="profile-userbuttons">
              <a class="btn btn-success btn-sm">Edit my profile</a>
            </div>

            <div class="profile-usermenu">
              <ul class="nav">
                <li class="active">
                  <a href="profile.html">
                    <i class="glyphicon glyphicon-home"></i>
                    Overview{" "}
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="glyphicon glyphicon-user"></i>
                    Account Settings{" "}
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank">
                    <i class="glyphicon glyphicon-ok"></i>
                    Tasks{" "}
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="glyphicon glyphicon-flag"></i>
                    Help{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="profile-content">
            <div class="row">
              <div class="col-md-12">
                <h4>Your Profile</h4>
                <br />
              </div>
            </div>
            <table class="table table-user-information">
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
    </User>
  );
}
export default Account;
