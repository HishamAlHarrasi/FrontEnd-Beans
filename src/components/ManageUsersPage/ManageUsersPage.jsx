import React, { Component } from "react";
import UsersTable from "./UsersTable";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import checkJWT from "../shared/checkJWT";

let token = "";
let config = {};

class ManageUsersPage extends Component {
  state = { usersData: [] };

  

  async componentDidMount() {
    await checkJWT();
    token = window.localStorage.getItem('access_token');
    config = {
      headers: { Authorization: `Bearer ${token}` }
    }

      await axios.get("http://" + process.env.REACT_APP_server + "/api/users/all",
      config
      ).then(resp => this.setState({ usersData: resp.data }) )
      .catch(err => console.log(err))
      
  }

  render() {
    const { usersData } = this.state;
    return (
      <div>
        <div className="go-back">
          <Link to="/admin">
            Go Back <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </div>
        <div className="container">
          <div className="manage-users">
            <h2>Manage Users</h2>
            <span>Total number of users: {usersData.length}</span>
            <span>Click on the username to manage each user individually.</span>
            <UsersTable usersData={usersData} />
          </div>
        </div>
      </div>
    );
  }
}

export default ManageUsersPage;
