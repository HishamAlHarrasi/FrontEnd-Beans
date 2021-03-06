import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import jwtDecode from "jwt-decode";

class Navbar extends Component {
  state = {
    token: "",
    isAdmin: "",
  };

  componentDidMount() {
    let jwt = window.localStorage.getItem("access_token");
    let decoded = jwtDecode(jwt);
    this.setState({ token: jwt, isAdmin: decoded.admin });
  }

  render() {
    return (
      <div className="topnav">
        <nav>
          <ul>
            <li>
              {/*Using NavLink's provides ability of giving current route a certain color, in this case white  */}
              <NavLink exact to="/home" activeStyle={{ color: "#ffffff" }}>
                Home
              </NavLink>
            </li>
            {this.state.isAdmin ? ( // Renders only if user is an admin
              <li>
                <NavLink to="/admin" activeStyle={{ color: "#ffffff" }}>
                  Admin
                </NavLink>
              </li>
            ) : (
              <div></div>
            )}
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
                      let logout = axios.post(
                        process.env.REACT_APP_SERVER_PROTO +
                          process.env.REACT_APP_SERVER_ADDR +
                          "/auth/logout",
                        {},
                        { withCredentials: "include" }
                      );
                      console.log(logout);
                      window.localStorage.clear();
                      toast.success("Logged Out Successfully");
                    } catch (err) {
                      console.log(err);
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
  }
}

export default Navbar;
