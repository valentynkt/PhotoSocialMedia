import React, { Component,useContext } from "react";
import axios from "axios";
import { UserContext } from "../utils/UserContext";
const Home = () => {
    const {user} = useContext(UserContext);
  if (user) {
    return <h2>Hi {user.email}</h2>;
  } else {
    return <h2>You are not logged in</h2>;
  }
};
export default Home;
