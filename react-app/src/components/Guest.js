import React from "react";
import { Navigation } from "./Navigation";
import { NavLink } from "react-router-dom";
const Guest = ({ children }) => {
  return (
    <>
        <Navigation>
      <NavLink className="navbar-brand" to={"/"}>
        Home
      </NavLink>
      <div className="collapse navbar-collapse">
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
      </div>
      </Navigation>

      <div className="auth-wrapper">
        {children}
      </div>
    </>
  );
};
export default Guest;
