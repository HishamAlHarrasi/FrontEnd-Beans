import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { Component } from "react";
import checkJWT from "../../shared/checkJWT";

let token = "";
let config = {};

class HomePage extends Component {
  state = { userData: {}, resetPasswordClicked: false };

  async componentDidMount() {
    await checkJWT();
    token = window.localStorage.getItem("access_token");
    config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axios
      .get("http://" + process.env.REACT_APP_server + "/api/users/me", config)
      .then((resp) => this.setState({ userData: resp.data }))
      .catch((err) => console.log(err));

    console.log(jwtDecode(token));
  }

  render() {
    return (
      <div className="container">
        <h3 style={{ marginTop: "20px" }}>Personal Information</h3>
        <div className="home-page-container">
          <div className="user-data-home">
            User ID: <span className="user-data">{this.state.userData.id}</span>
            <br />
            <br />
            Username:
            <span className="user-data">{this.state.userData.username}</span>
            <br />
            <br />
            First Name:
            <span className="user-data">{this.state.userData.firstname}</span>
            <br />
            <br />
            Last Name:
            <span className="user-data">{this.state.userData.lastname}</span>
            <br />
            <br />
            Email:
            <span className="user-data">{this.state.userData.email}</span>
            <br />
            <br />
          </div>
          <div className="user-data-home">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                this.setState({
                  resetPasswordClicked: !this.state.resetPasswordClicked,
                });
              }}
            >
              Reset Password
            </button>
            {this.state.resetPasswordClicked ? (
              <div className="home-page-pw-rst">
                <br />
                <label className="form-label lbl">First Name: </label>
                <input
                  id="firstname"
                  type="text"
                  className="form-input-pw-reset"
                  placeholder=" Password here.."
                />
                <br />
                <br />

                <label className="form-label lbl">First Name: </label>
                <input
                  id="firstname"
                  type="text"
                  className="form-input-pw-reset"
                  placeholder=" Confirm password.."
                />
                <br />
                <br />
                <button className="btn btn-primary btn-sm pw-reset-submit">
                  Change Password
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
