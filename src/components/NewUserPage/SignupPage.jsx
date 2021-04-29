import React, { Component } from "react";
import SignupForm from "./SignupForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import axios from "axios";
import checkJWT from "../shared/checkJWT";

let token = "";
let config = {};

class SignupPage extends Component {
  state = {
    farms: [],
    userPrivileges: [],
    errors: {},
    passwordResetToken: "",
  };

  async componentDidMount() {
    await checkJWT();
    token = window.localStorage.getItem("access_token");
    config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get("http://" + process.env.REACT_APP_server + "/api/farms/all", config)
      .then((resp) => this.setState({ farms: resp.data }))
      .catch((err) => console.log(err));
  }

  handleCreateNewPrivilege = () => {
    // Probably should change this - View & Control by defenition includes view privilege
    const { userPrivileges } = this.state;

    let tempUserPrivileges = [...userPrivileges];

    let newPrivilege = {
      id: null, // The id of the farm
      name: null, // The name of the farm
      canControl: false, // If control is true, privilege is control & view, if false privilege is only view
    };
    console.log(window.localStorage.getItem("access_token"));

    tempUserPrivileges.push(newPrivilege);

    this.setState({ userPrivileges: tempUserPrivileges });
  };

  handleChangeFarmPrivileges = (index) => {
    const { userPrivileges } = this.state;

    let tempUserPrivileges = [...userPrivileges];

    tempUserPrivileges[index].canControl = !tempUserPrivileges[index]
      .canControl;

    this.setState({ userPrivileges: tempUserPrivileges });
  };

  handleEditFarm = (newFarmID, index) => {
    const { userPrivileges } = this.state;

    let tempUserPrivileges = [...userPrivileges];

    tempUserPrivileges[index].id = newFarmID;

    for (const farm of this.state.farms) {
      if (farm.id === newFarmID) {
        tempUserPrivileges[index].name = farm.name;
      }
    }

    this.setState({ userPrivileges: tempUserPrivileges });
  };

  handleDeletePrivilege = (userPrivilege) => {
    const { userPrivileges } = this.state;

    let tempUserPrivileges = [...userPrivileges];

    tempUserPrivileges = tempUserPrivileges.filter(
      (filtered) => filtered !== userPrivilege
    );

    this.setState({ userPrivileges: tempUserPrivileges });
  };

  handleChooseAdmin = (isAdmin) => {};

  validate = (event, userPrivileges) => {
    const errors = {};

    const firstName = event.target[0].value;
    const lastName = event.target[1].value;
    const username = event.target[2].value;
    const email = event.target[3].value;
    const password = event.target[4].value;
    const password2 = event.target[5].value;
    const isAdmin = event.target[7].checked;
    const farmPrivileges = userPrivileges;

    if (firstName.trim() === "") errors.firstName = "First name is required.";
    if (lastName.trim() === "") errors.lastName = "Last name is required.";
    if (username.trim() === "") errors.username = "Username is required.";
    if (email.trim() === "") errors.email = "Email is required.";
    if (password.trim() === "") {
      errors.password = "Password is required.";
    } else if (password.length <= 6) {
      errors.password = "Password must be at least 8 characters.";
    }
    if (password2.trim() === "") {
      errors.password2 = "Password confirmation is required.";
    } else if (password !== password2) {
      errors.password2 = "Passwords are not the same.";
    }

    for (const index in farmPrivileges) {
      if (farmPrivileges[index].id === null) {
        errors.farmPrivileges = "Choose a farm.";
      } else {
        for (const index_2 in farmPrivileges) {
          if (
            index !== index_2 &&
            farmPrivileges[index].id === farmPrivileges[index_2].id
          ) {
            errors.farmPrivileges = "You have a repeated farm.";
          }
        }
      }
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = async (event, userPrivileges) => {
    event.preventDefault();

    let view_farms = [];
    let control_farms = [];

    for (let farm of userPrivileges) {
      if (farm.canControl === false) {
        view_farms.push(farm.id);
      } else {
        control_farms.push(farm.id);
      }
    }

    let userRegisterForm = {};

    if (!event.target[7].checked) {
      userRegisterForm = {
        firstname: event.target[0].value,
        lastname: event.target[1].value,
        username: event.target[2].value,
        email: event.target[3].value,
        admin: event.target[7].checked,
        view_farms: view_farms,
        control_farms: control_farms,
      };
    } else {
      userRegisterForm = {
        firstname: event.target[0].value,
        lastname: event.target[1].value,
        username: event.target[2].value,
        email: event.target[3].value,
        admin: event.target[7].checked,
        view_farms: [],
        control_farms: [],
      };
    }

    let password = event.target[4].value;

    const errors = this.validate(event, userPrivileges);
    this.setState({ errors: errors || {} });

    if (errors) return;

    let request1 = false;
    let request2 = false;
    console.log(userRegisterForm);
    request1 = await axios
      .post(
        "http://" + process.env.REACT_APP_server + "/api/users/create",
        userRegisterForm,
        config
      )
      .then((resp) => {
        this.setState({ passwordResetToken: resp.data.token });
        return true;
      })
      .catch((err) => {
        toast.error("Error. User creation failed.");
        return false;
      });

    console.log(this.state.passwordResetToken, password);

    if (request1) {
      axios
        .post(
          "http://" + process.env.REACT_APP_server + "/api/users/password",
          {
            token: this.state.passwordResetToken,
            password: password,
          },
          config
        )
        .then((resp) => {
          console.log(resp);
          window.location = "/admin/manageUsers";
          toast.success("User account created successfully!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <div>
        <div className="go-back">
          <Link to="/admin">
            Go Back <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </div>
        <div className="main-container">
          <SignupForm
            farms={this.state.farms}
            errors={this.state.errors}
            onSubmit={this.handleSubmit}
            userPrivileges={this.state.userPrivileges}
            onCreateNewUserPrivilege={this.handleCreateNewPrivilege} // Adds new privilege with no farm choice set
            onChangeFarmPrivileges={this.handleChangeFarmPrivileges} // Changes whether privilege is View, or Control & View
            onEditFarm={this.handleEditFarm} // Changes which farm is chosen
            onDeletePrivilege={this.handleDeletePrivilege}
          />
        </div>
      </div>
    );
  }
}

export default SignupPage;
