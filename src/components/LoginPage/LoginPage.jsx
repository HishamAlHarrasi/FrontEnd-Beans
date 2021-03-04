import React, { Component } from "react";
import "./LoginPage.css";
import axios from "axios";
import { toast } from "react-toastify";

let token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlY2MzMzM1Zi1kNmZlLTQ1ODQtODg0NS0wZjdjY2RjYjNlZDMiLCJpYXQiOjE2MTQ3NzUwNzksIm5iZiI6MTYxNDc3NTA3OSwiZnJlc2giOmZhbHNlLCJzdWIiOiJhZG1pbiIsInR5cGUiOiJhY2Nlc3MiLCJleHAiOjE2MTQ3NzUzNzl9.55Yl7WPmVDzyh6s7RXdfPBVK91J0eb1J-_da3SxTBbk";

let headers = {
  headers: {
    Authorization: "Bearer " + token,
  },
};

class LoginPage extends Component {
  state = {};

  login = async (e) => {
    e.preventDefault();

    const credentials = `username=${e.target[0].value}&password=${e.target[1].value}`;

    try {
      const resp = await axios.post(
        "http://" + process.env.REACT_APP_server + "/auth/login",
        credentials
      );
      console.log(resp);
      toast.success("Logged in Successfully");
      //window.location = "/home";
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
