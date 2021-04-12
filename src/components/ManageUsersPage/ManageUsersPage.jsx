import React, { Component } from "react";
import databaseRequest from "./fakeAPIRequest";
import UsersTable from "./UsersTable";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const token = window.localStorage.getItem('access_token');
const config = {
  headers: { Authorization: `Bearer ${token}` }
}

class ManageUsersPage extends Component {
  state = { usersData: [], farms: [] };

  

  async componentDidMount() {
    // this.setState({
      // usersData: axios.get("http://" + process.env.REACT_APP_server + "/api/farms/all",
      // // config
      // ),
    // });
    const resp = await axios.get("http://" + process.env.REACT_APP_server + "/api/users/all")
    console.log(resp)
    // console.log(this.state.usersData)
  }

  render() {
    const { usersData, farms } = this.state;

    return (
      <div>
        {/* <div className="go-back">
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
        </div> */}
      </div>
    );
  }
}

export default ManageUsersPage;
