import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Home from "./components/Home.js";
import { Navigation } from "./components/Navigation";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/css/bootstrap.rtl.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";


class App extends Component {
  componentDidMount=()=>
  {
    let user=localStorage.getItem('user');
    console.log(user);
    this.setUser(user);
  }
  state = {};
      setUser = user =>{
        this.setState({
          user: user
        });
      };
  render() {
    return (
      <BrowserRouter>
        <div className="App container">
         <Navigation user={this.state.user} setUser={this.setUser}/>
          <div className="auth-wrapper">
            <div className="auth-inner">
            <Routes>
         <Route  path='/'  element={<Home user={this.state.user}/>}/>
         <Route  path='/login'  element={<Login setUser={this.setUser}/>}/>
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
