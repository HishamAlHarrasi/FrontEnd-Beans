import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBan } from "@fortawesome/free-solid-svg-icons";
import "./EditUserPage.css";
import databaseRequestFARMS from "./fakeAPIRequestFARMS";
import FarmPrivileges from "./../NewUserPage/FarmPrivileges";
import { Redirect } from "react-router-dom";

class EditUserPage extends Component {
  state = {
    user: {},
    disabled: true,
    farms: [],
    userPrivileges: [],
    originalUserPrivileges: [],
  };

  componentDidMount() {
    this.setState({
      user: this.props.location.state.user,
      farms: databaseRequestFARMS(),
      userPrivileges: this.props.location.state.user.userPrivileges,
      originalUserPrivileges: this.props.location.state.user.userPrivileges,
    });
  }

  checkChanged = (event, userPrivileges) => {
    event.preventDefault();
    let changedValues = {};

    if (document.getElementById("firstname").value !== "") {
      changedValues.firstName = document.getElementById("firstname").value;
    }
    if (document.getElementById("lastname").value !== "") {
      changedValues.lastName = document.getElementById("lastname").value;
    }
    if (document.getElementById("username").value !== "") {
      changedValues.username = document.getElementById("username").value;
    }
    if (document.getElementById("email").value !== "") {
      changedValues.email = document.getElementById("email").value;
    }
    if (userPrivileges !== this.state.originalUserPrivileges) {
      changedValues.userPrivileges = userPrivileges;
    }

    console.log(changedValues);
    <Link to="/admin/manageUsers" />;
  };

  handleEnable = () => {
    this.setState({ disabled: false });
  };

  handleCreateNewPrivilege = () => {
    // Probably should change this - View & Control by defenition includes view privilege
    const { userPrivileges } = this.state;

    let tempUserPrivileges = [...userPrivileges];

    let newPrivilege = {
      id: null, // The id of the farm
      name: null, // The name of the farm
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

  render() {
    const { user, disabled, farms, userPrivileges } = this.state;

    return (
      <div>
        <div className="go-back">
          <Link to="/admin/manageUsers">
            Go Back <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </div>
        <div className="container">
          <h2>Edit User Page</h2>
          <div className="flex-container">
            <form id="main-form">
              <div className="flex-child">
                <div className="form-input">
                  <p className="text-red">
                    * Only fill in the fields that you wish to change
                  </p>
                  <label className="form-label lbl">User ID: </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder={user.userID}
                    disabled
                  />
                  <br />
                  <label className="form-label lbl">First Name: </label>
                  <input
                    id="firstname"
                    type="text"
                    className="form-input"
                    placeholder={user.firstName}
                    disabled={disabled}
                  />
                  <br />

                  <label className="form-label lbl">Last Name: </label>
                  <input
                    id="lastname"
                    type="text"
                    className="form-input"
                    placeholder={user.lastName}
                    contentEditable={true}
                    disabled={disabled}
                  />
                  <br />

                  <label className="form-label lbl">Username: </label>
                  <input
                    id="username"
                    type="text"
                    className="form-input"
                    placeholder={user.username}
                    disabled={disabled}
                  />
                  <br />

                  <label className="form-label lbl">Email: </label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder={user.email}
                    contentEditable={true}
                    disabled={disabled}
                  />
                  <br />
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      this.handleEnable();
                    }}
                  >
                    Click to Edit User
                  </button>
                </div>
              </div>
            </form>
            <div
              className={
                user.failedLoginAttempts >= 5
                  ? "flex-child flex-child-blocked"
                  : "flex-child flex-child-active"
              }
            >
              {user.failedLoginAttempts >= 5 ? (
                <div>
                  <h4 className="align-center">
                    User BLOCKED <FontAwesomeIcon icon={faBan} />
                  </h4>
                  <h6 className="align-left">
                    Cause: Too many failed login attempts
                  </h6>
                  <p className="align-left">
                    Always be careful when unblocking user accounts. Investigate
                    and check the cause for which the account was blocked in the
                    first place.
                  </p>
                  <button className="btn btn-md btn-secondary">
                    Unblock User
                  </button>
                </div>
              ) : (
                <div>
                  <h5>USER ACTIVE</h5>
                  <button className="btn btn-md btn-danger">Block User</button>
                </div>
              )}
            </div>
            <div className="break">
              <hr />
            </div>
            <div className="flex-child flex-child-table">
              <FarmPrivileges
                farms={farms}
                userPrivileges={userPrivileges}
                onCreateNewUserPrivilege={this.handleCreateNewPrivilege}
                onChangeFarmPrivileges={this.handleChangeFarmPrivileges}
                onEditFarm={this.handleEditFarm}
                onDeletePrivilege={this.handleDeletePrivilege}
              />
            </div>
            <div className="break"></div>
            <div className="apply-changes-button">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                form="main-form"
                onClick={(event) => {
                  this.checkChanged(event, userPrivileges);
                }}
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditUserPage;
