import React, { Component } from "react";
import "./LoginPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import checkJWT from "../shared/checkJWT";

class LoginPage extends Component {
  state = {};

  login = async (e) => {
    e.preventDefault();

    const credentials = `username=${e.target[0].value}&password=${e.target[1].value}`;

    try {
      window.localStorage.clear();

      const resp = await axios.post(
        process.env.REACT_APP_SERVER_PROTO +
          process.env.REACT_APP_SERVER_ADDR +
          "/auth/login",
        credentials,
        { withCredentials: true }
      );

      toast.success("Logged in Successfully");
      window.localStorage.setItem("access_token", resp.data.access_token);

      window.location = "/home";
    } catch (err) {
      toast.error("Login Failed");
    }
  };

  render() {
    return (
      <div className="background-image">
        <div className="container login-page-bg">
          <div className="form-input parent" data-testid="login-1">
            <form className="form-login" onSubmit={(e) => this.login(e)}>
              <h3>Welcome to Beans</h3>
              <label className="form-label lbl">Username: </label>
              <input type="text" className="input-margin" />
              <br />
              <label className="form-label lbl">Password: </label>
              <input type="password" className="input-margin" />
              <br />
              <br />
              <button className="btn btn-light">Login</button>
              <br />
              <br />
              <h6 style={{ textAlign: "center" }}>
                * Note: If you do not have an account, <br />
                contact an administrator.
              </h6>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
