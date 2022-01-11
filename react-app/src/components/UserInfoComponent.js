import React from 'react';
import { useState,useEffect } from "react";
import axios from "axios";

const UserInfoComponent = (props) => {
    return (
        <div className="row profile">
        <div className="profile-usertitle">
          <h1 className="profile-usertitle-name">
            {props.user.firstName + " " + props.user.secondName}
          </h1>
        </div>
        <div className="about">
          <h5>About</h5>
          <p>{props.user.about}</p>
        </div>
        <h4>Profile Info</h4>
        <table className="table table-user-information">
          <tbody>
            <tr>
              <td>Date of Registration</td>
              <td>{props.user.registerDate}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{props.user.gender}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <a href={"mailto:" + props.user.email}>{props.user.email}</a>
              </td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>{props.user.phoneNumber}</td>
            </tr>
            <tr>
              <td>Role</td>
              <td>{props.user.role}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
};

export default UserInfoComponent;