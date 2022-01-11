import React from "react";
import { Navigation } from "./Navigation";
import { NavLink } from "react-router-dom";
import Stack from "@mui/material/Stack";

const Admin = ({ children }) => {
  const handleLogout = () => {
    localStorage.clear();
  };
  let user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Navigation>
        <NavLink className="navbar-brand" to={"/user"}>
          Home
        </NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Stack direction="row" spacing={2}>
                <NavLink className="nav-link" to={"/"} onClick={handleLogout}>
                  Logout
                </NavLink>
                <NavLink className="nav-link" to={"/admin/users"}>
                  Admin
                </NavLink>
              </Stack>
            </li>
          </ul>
        </div>
      </Navigation>
      <div className="auth-wrapper">
        <div>{children}</div>
      </div>
    </>
  );
};

export default Admin;