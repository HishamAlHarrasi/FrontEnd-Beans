import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { Component } from "react";
import checkJWT from "../../shared/checkJWT";
import { toast } from "react-toastify";

let token = "";
let config = {};

class HomePage extends Component {
  state = {
    userData: {},
    resetPasswordClicked: false,
    passwordResetToken: "",
    errors: "",
  };

  async componentDidMount() {
    await checkJWT();
    token = window.localStorage.getItem("access_token");
    config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axios
      .get(process.env.REACT_APP_SERVER_PROTO + process.env.REACT_APP_SERVER_ADDR + "/api/users/me", config)
      .then((resp) => this.setState({ userData: resp.data }))
      .catch((err) => console.log(err));

    console.log(jwtDecode(token));
  }

  resetPassword = async (event) => {
    event.preventDefault();

    let errors = this.state.errors;

    let password = event.target[0].value;
    let password2 = event.target[1].value;

    if (password.trim() === "") {
      errors = "Password is required.";
      this.setState({ errors: errors });
      return;
    } else if (password.length <= 6) {
      errors = "Password must be at least 8 characters.";
      this.setState({ errors: errors });
      return;
    }
    if (password2.trim() === "") {
      errors = "Password confirmation is required.";
      this.setState({ errors: errors });
      return;
    } else if (password !== password2) {
      errors = "Passwords are not the same.";
      this.setState({ errors: errors });
      return;
    } else {
      errors = "";
      this.setState({ errors: errors });
    }

    await axios
      .get(
        process.env.REACT_APP_SERVER_PROTO + process.env.REACT_APP_SERVER_ADDR + "/api/users/password/reset",
        config
      )
      .then((resp) =>
        this.setState({ passwordResetToken: resp.data.reset_token })
      )
      .catch((err) => console.log(err));

    await axios
      .post(
        process.env.REACT_APP_SERVER_PROTO + process.env.REACT_APP_SERVER_ADDR + "/api/users/password",
        { token: this.state.passwordResetToken, password: password },
        config
      )
      .then((resp) => {
        toast.success("Password reset successfully.");
        this.setState({ resetPasswordClicked: false });
      })
      .catch((err) => toast.error("Password reset failed."));
  };

  render() {
    const { errors } = this.state;

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
                <form
                  onSubmit={(event) => {
                    this.resetPassword(event);
                  }}
                >
                  <br />
                  <label className="form-label lbl">New Password: </label>
                  <input
                    id="firstname"
                    type="password"
                    className="form-input-pw-reset"
                    placeholder=" New Password here.."
                  />
                  <br />
                  <br />
                  <label className="form-label lbl">
                    Confirm New Password:
                  </label>
                  <input
                    id="firstname"
                    type="password"
                    className="form-input-pw-reset"
                    placeholder=" Confirm password.."
                  />
                  <br />
                  <br />
                  {errors && (
                    <div className="alert alert-danger error-label-pw-reset">
                      {errors}
                    </div>
                  )}
                  <button
                    className="btn btn-primary btn-sm pw-reset-submit"
                    type="submit"
                  >
                    Change Password
                  </button>
                </form>
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
