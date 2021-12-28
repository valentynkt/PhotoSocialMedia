import React from "react";
import { Navigation } from "./Navigation";
import { NavLink } from "react-router-dom";
const Home = ({ children }) => {
  return (
    <>
      <NavLink className="navbar-brand" to={"/"}>
        Home
      </NavLink>
      <div className="collapse navbar-collapse">
      <Navigation>
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
        </Navigation>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <h2>{children}</h2>;
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
