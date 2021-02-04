import React, { Component } from "react";
import { Link } from "react-router-dom";
const AdminPage = () => {
  return (
    <div className="container">
      <div className="admin-container">
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
