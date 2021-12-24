import React from "react";
import { Component ,useContext} from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Account from "./Account";
import { render } from "@testing-library/react";
import { UserContext } from "../utils/UserContext";
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

export function Navigation () {
  const {user,setUser} = useContext(UserContext);

   const handleLogout = () => {
    setUser(null);
    //this.props.history.push('/login');
   };
    let viewResult;
    if (user) {
      viewResult = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to={"/"}
              onClick={handleLogout}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      );
    } else {
      viewResult = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to={"/login"}>
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={"/register"}>
              Sign up
            </NavLink>
          </li>
        </ul>
      );
    }
    return (
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <div className="container">
          <NavLink className="navbar-brand" to={"/"}>
            Home
          </NavLink>
          <div className="collapse navbar-collapse">{viewResult}</div>
        </div>
      </nav>
    );
}

