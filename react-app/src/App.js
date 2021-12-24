import React, { Component,useState,useMemo} from "react";
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
function App() {
  const [user, setUser] = useState(null)
  const providerUser=useMemo(() => ({user,setUser}), [user, setUser])
    return (
      <UserContext.Provider value={providerUser}>
      <BrowserRouter>
        <div className="App container">
         
           <Navigation />
           <div className="auth-wrapper">
            <div className="auth-inner">
            <Routes>
           
          <Route  path='/'  element={<Home />}/>
         <Route  path='/login'  element={<Login />}/>
         <Route  path='/register'  element={<Register/>}/>
         <Route  path='/account'  element={<Account/>}/>

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
      </UserContext.Provider>
    );
}

export default App;


