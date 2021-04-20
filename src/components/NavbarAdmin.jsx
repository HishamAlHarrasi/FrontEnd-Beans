import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  return (
    //<Router>
    <div className="topnav">
      <nav>
        <ul>
          <li>
            <NavLink exact to="/home" activeStyle={{ color: "#ffffff" }}>
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
            <Link to="/login">
              <button
                className="btn btn-md btn-light"
                onClick={() => {
                  try {
                    let logout = axios.post("http://" + process.env.REACT_APP_server + "/auth/logout", {}, { withCredentials: "include" })
                    console.log(logout)
                    window.localStorage.clear();
                    toast.success("Logged Out Successfully");
                  } catch (err) {
                    console.log(err)
                  }
                }}
              >
                Logout
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  style={{ paddingLeft: "5px" }}
                />
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;