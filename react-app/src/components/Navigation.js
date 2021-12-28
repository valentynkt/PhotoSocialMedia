import React from "react";
import { Component ,useContext,useState} from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export function Navigation ({children}) {
    return (
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <div className="container">
      {children}
        </div>
      </nav>
    );
}

