import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import User from "../components/User";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { FormGroup } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import UserInfoComponent from "../components/UserInfoComponent";
function Account() {
  let user = JSON.parse(localStorage.getItem("user"));
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const editRedirect = () => {
    let path = `edit`;
    navigate(path);
  };
  const photoAlbumRedirect = () => {
    let path = `photos`;
    navigate(path);
  };
  const uploadPhoto = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("formFile", file);
      const response = await axios.post("Images/" + user.email, data);
      photoAlbumRedirect();
    } catch (error) {
      console.log(error);
    }
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <User>
      <div className="auth-inner">
        <UserInfoComponent user={user} />
        <div className="accountFormGroupContainer">
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
              <Button
                component="label"
                variant="text"
                className="uploadedFileButton"
              >
                Upload File
                <input
                  type="file"
                  id="uploadedFile"
                  hidden
                  onChange={handleFile}
                />
              </Button>
              <Button onClick={uploadPhoto}>Send Photo</Button>
            </ButtonGroup>
          </FormGroup>
        </div>
      </div>
    </User>
  );
}
export default Account;
