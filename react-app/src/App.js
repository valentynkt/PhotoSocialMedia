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
import AdminEditUser from "./pages/AdminEditUser";
import CreateUser from "./pages/CreateUser";
import AdminUserPhotos from "./pages/AdminUserPhotos";
import UserPhotoDetails from "./pages/UserPhotoDetail";
import AdminPhotoDetails from "./pages/AdminPhotoDetails";
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
          <Route path="/user/photos/:id" element={<UserPhotoDetails />} />
          <Route path="/admin/photos/:id" element={<AdminPhotoDetails />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/users/:id" element={<AdminUserInfo/>} />
          <Route path="/admin/users/:id/edit" element={<AdminEditUser/>} />
          <Route path="/admin/users/:id/photos" element={<AdminUserPhotos/>} />
          <Route path="/admin/users/create" element={<CreateUser/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
