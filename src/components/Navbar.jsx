import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    //<Router>
    <div className="topnav">
      <nav>
        <ul>
          <li>
            <NavLink exact to="/" activeStyle={{ color: "#ffffff" }}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" activeStyle={{ color: "#ffffff" }}>
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink to="/farms" activeStyle={{ color: "#ffffff" }}>
              Farms & Sensors
            </NavLink>
          </li>
          <li className="logout">
            <button className="btn btn-md btn-light">
              Logout
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ paddingLeft: "5px" }}
              />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
