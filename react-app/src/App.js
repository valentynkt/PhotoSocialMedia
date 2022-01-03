import React, { Component, useState, useMemo, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Guest from "./components/Guest";
import { Navigation } from "./components/Navigation";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import UserMain from "./components/UserMain";
import GuestMain from "./components/GuestMain";
import Main from "./components/Main";
import EditProfile from "./components/EditProfile";
import UserPhotos from "./components/UserPhotos";
function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/user" element={<UserMain />} />
          <Route path="/guest" element={<GuestMain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/account" element={<Account />} />
          <Route path="/user/account/photos" element={<UserPhotos />} />
          <Route path="/user/account/edit" element={<EditProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
