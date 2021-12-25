import React, { Component,useContext } from "react";
import axios from "axios";
import { UserContext } from "../utils/UserContext";
const Home = () => {
    const msg = useContext(UserContext);
  // if (user) {
  //   return <h2>Hi {user.email}</h2>;
  // } else {
  //   return <h2>You are not logged in</h2>;
  // }
  return (
    <div>
       {msg}
    </div>
  )
};
export default Home;
