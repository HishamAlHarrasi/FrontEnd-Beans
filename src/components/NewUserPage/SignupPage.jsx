import React, { Component } from "react";
import SignupForm from "./SignupForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class SignupPage extends Component {
  state = {
    farms: [
      // Data from API call
      {
        id: 1,
        name: "Algeria",
      },
      {
        id: 2,
        name: "Spain",
      },
      {
        id: 3,
        name: "Peru",
      },
      {
        id: 4,
        name: "Nepal",
      },
      {
        id: 5,
        name: "Russia",
      },
    ],
    userPrivileges: [],
  };

  handleCreateNewPrivilege = () => {
    // Probably should change this - View & Control by defenition includes view privilege
    const { userPrivileges } = this.state;

    let tempUserPrivileges = [...userPrivileges];

    let newPrivilege = {
      id: null, // The id of the farm
      canControl: false, // If control is true, privilege is control & view, if false privilege is only view
    };

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

    this.setState({ userPrivileges: tempUserPrivileges });
  };

  handleDeletePrivilege = (index) => {
    const { userPrivileges } = this.state;

    let tempUserPrivileges = [...userPrivileges];

    tempUserPrivileges.splice(index, 1);

    this.setState({ userPrivileges: tempUserPrivileges });
  };

  handleSubmit = (event, userPrivileges) => {
    event.preventDefault();

    const userRegisterForm = {
      firstName: event.target[0].value,
      lastName: event.target[1].value,
      username: event.target[2].value,
      email: event.target[3].value,
      password: event.target[4].value,
      isAdmin: event.target[7].checked,
      farmPrivileges: userPrivileges,
    };

    console.log(userRegisterForm);
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
            onSubmit={this.handleSubmit}
            farms={this.state.farms}
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
