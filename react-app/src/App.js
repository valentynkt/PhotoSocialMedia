import React, { Component, useState, useMemo, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Guest from "./components/Guest";
import { Navigation } from "./components/Navigation";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import UserMain from "./pages/UserMain";
import GuestMain from "./pages/GuestMain";
import Main from "./pages/Main";
import EditProfile from "./pages/EditProfile";
import UserPhotos from "./pages/UserPhotos";
import UserManagement from "./pages/UserManagement";
import AdminMain from "./pages/AdminMain";
import AdminUserInfo from "./pages/AdminUserInfo";
function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/user" element={<UserMain />} />
          <Route path="/guest" element={<GuestMain />} />
          <Route path="/admin" element={<AdminMain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/account" element={<Account />} />
          <Route path="/user/account/photos" element={<UserPhotos />} />
          <Route path="/user/account/edit" element={<EditProfile />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/users/:id" element={<AdminUserInfo/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
