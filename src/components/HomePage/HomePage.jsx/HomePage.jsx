import axios from "axios";
import React, { Component } from "react";
import checkJWT from "../../shared/checkJWT";

let token = "";
let config = {};

class HomePage extends Component {
  state = { userData: {} };

  async componentDidMount() {
    await checkJWT();
    token = window.localStorage.getItem('access_token');
    config = {
      headers: { Authorization: `Bearer ${token}` }
    }

      await axios.get("http://" + process.env.REACT_APP_server + "/api/users/me",
      config
      ).then(resp => this.setState({ userData: resp.data }) )
      .catch(err => console.log(err))
      
  }

  render() {
    return (
      <div className="container">
        <div className="home-page-container">
          <h3><b>Personal Information</b></h3>
            <div className="user-data-home">
            Username: <span className="user-data">{this.state.userData.username}</span><br/><br/>
            First Name: <span className="user-data">{this.state.userData.firstname}</span><br/><br/>
            Last Name: <span className="user-data">{this.state.userData.lastname}</span><br/><br/>
            Email: <span className="user-data">{this.state.userData.email}</span><br/><br/>
            </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
