import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { render } from "@testing-library/react";
import { User } from "./User";
import Home from "./components/Home.js";
import { Navigation } from "./components/Navigation";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/css/bootstrap.rtl.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

const api = axios.create({
  baseURL: `https://localhost:44371/api/`,
});
class App extends Component {
  constructor() {
    super();
    api.get("User/signup").then((res) => {
      console.log(res.data);
    }).catch(
      err=>{
        console.log(err);
      }
    );
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App container">
         <Navigation/>
          <div className="auth-wrapper">
            <div className="auth-inner">
            <Routes>
         <Route  path='/'  element={<Home/>}/>
         <Route  path='/login'  element={<Login/>}/>
         <Route  path='/register'  element={<Register/>}/>
         </Routes>
            </div>
          </div>
          {/* <Navigation/>
      <Routes>
        <Route path='/'  element={<Home/>} exact/>
        <Route path='/user'  element={<User/>}/>
      </Routes> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
