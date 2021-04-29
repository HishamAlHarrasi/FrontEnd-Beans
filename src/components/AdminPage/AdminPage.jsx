import React, { Component } from "react";
import { Link } from "react-router-dom";
import checkJWT from "../shared/checkJWT";

const AdminPage = () => {
  checkJWT();
  return (
    <div className="container">
      <div className="admin-container" data-testid="login-1">
        <h3>Welcome to the WIFS Administration Page:</h3>

        <div className="admin-main">
          <ul>
            <li>
              <Link to="/admin/addUser">Add New User</Link>
            </li>
            <li>
              <Link to="/admin/manageUsers">Manage Users</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
