import React from "react";
import { Navigation } from "./Navigation";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const User = ({ children }) => {
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
                <NavLink className="nav-link" to={"/user/account"}>
                  <Avatar
                    {...stringAvatar(user.firstName + " " + user.secondName)}
                  />
                </NavLink>
              </Stack>
            </li>
          </ul>
        </div>
      </Navigation>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default User;

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
