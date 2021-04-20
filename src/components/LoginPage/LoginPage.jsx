import React, { Component } from "react";
import "./LoginPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

class LoginPage extends Component {
  state = {};

  // componentDidMount() {
  //   window.localStorage.clear()  // Prevents bugs on quick logout and login
  // }


  login = async (e) => {
    e.preventDefault();

    const credentials = `username=${e.target[0].value}&password=${e.target[1].value}`;

    try {
      window.localStorage.clear();

      const resp = await axios.post(
        "http://" + process.env.REACT_APP_server + "/auth/login",
        credentials,
        { withCredentials: true }
      );

      console.log(resp);
      toast.success("Logged in Successfully");
      window.localStorage.setItem('access_token', resp.data.access_token )
      console.log(window.localStorage.getItem('access_token'))

      window.location = "/home";
    } catch (err) {
      toast.error("Login Failed");
      console.log(err);
    }
  };

  render() {
    return (
      <div className="background-image">
        <div className="container login-page-bg">
          <div className="form-input parent">
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
              <h6>
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
