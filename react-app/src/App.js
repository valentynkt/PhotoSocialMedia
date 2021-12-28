import React, { Component,useState,useMemo,useEffect} from "react";
import "./App.css";
import axios from "axios";
import Home from "./components/Home.js";
import { Navigation } from "./components/Navigation";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import { UserContext } from "./utils/UserContext";
import UserMain from "./components/UserMain";
import GuestMain from "./components/GuestMain";
function App() {
    return (
      <BrowserRouter>
        <div className="App container">
            <Routes>
           
          <Route  path='/'  element={<GuestMain />}/>
          <Route  path='/user'  element={<UserMain />}/>
         <Route  path='/login'  element={<Login />}/>
         <Route  path='/register'  element={<Register/>}/>
         <Route  path='/user/account'  element={<Account/>}/>

         </Routes>
        </div>
      </BrowserRouter>
    );
}

export default App;


