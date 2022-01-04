import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import User from "../components/User";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { FormGroup } from "@mui/material";
import axios from "axios";
import { useState } from "react";
function Account() {
  let user = JSON.parse(localStorage.getItem("user"));
  const [file,setFile] = useState(null);

  const navigate = useNavigate();

  const editRedirect = () => {
    let path = `edit`;
    navigate(path);
  };
  const photoAlbumRedirect = () => {
    let path = `photos`;
    navigate(path);
  };
  const uploadPhoto=async (e)=>{
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("formFile", file);
      const response= await axios.post("Images/"+user.email,data);
      photoAlbumRedirect();
    } catch (error) {
      console.log(error);
    }
  }
  const handleFile=(e)=>{
    setFile(e.target.files[0]);
  }
  return (
    <User>
      <div className="auth-inner">
        <div className="row profile">
          <div className="col-md-3">
            <div className="profile-sidebar">
              <div className="profile-usertitle">
                <h1 className="profile-usertitle-name">
                  {user.firstName + " " + user.secondName}
                </h1>
              </div>
              <div className="about">
                <h5>About</h5>
                <p>{user.about}</p>
              </div>
              <FormGroup className="accountFormGroup">
                <ButtonGroup
                  orientation="vertical"
                  aria-label="vertical contained button group"
                  variant="contained"
                >
                  <Button onClick={editRedirect}>Edit Profile</Button>
                  <Button onClick={photoAlbumRedirect}>My Photo Album</Button>
                </ButtonGroup>
                <ButtonGroup
                  orientation="vertical"
                  aria-label="vertical contained button group"
                  variant="contained"
                  className="uploadPhileButtonGroup"
                >
                  <Button component="label" variant="text" className="uploadedFileButton">
                    Upload File
                    <input type="file" id="uploadedFile" hidden onChange={handleFile}/>
                  </Button>
                  <Button onClick={uploadPhoto}>Send Photo</Button>
                </ButtonGroup>
              </FormGroup>
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
                    <td>{user.registerDate}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{user.gender}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>
                      <a href={"mailto:" + user.email}>{user.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td>{user.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td>Role</td>
                    <td>{user.role}</td>
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
