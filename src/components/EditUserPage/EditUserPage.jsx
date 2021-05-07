import React, { Component, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBan } from "@fortawesome/free-solid-svg-icons";
import "./EditUserPage.css";
import FarmPrivileges from "./../NewUserPage/FarmPrivileges";
import axios from "axios";
import { toast } from "react-toastify";
import checkJWT from "../shared/checkJWT";
import { Divider } from "@material-ui/core";

const token = window.localStorage.getItem("access_token");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

class EditUserPage extends Component {
  state = {
    user: {},
    disabled: true,
    farms: [],
    userPrivileges: [],
    originalUserPrivileges: [],
    currentAdminID: null,
  };

  async componentDidMount() {
    checkJWT();
    this.setState({
      user: this.props.location.state.user,
    });

    await axios
      .get(
        process.env.REACT_APP_SERVER_PROTO +
          process.env.REACT_APP_SERVER_ADDR +
          "/api/users/me",
        config
      )
      .then((resp) => {
        this.setState({ currentAdminID: resp.data.id });
      })
      .catch((err) => console.log(err));

    await axios
      .get(
        process.env.REACT_APP_SERVER_PROTO +
          process.env.REACT_APP_SERVER_ADDR +
          "/api/farms/all",
        config
      )
      .then((resp) => this.setState({ farms: resp.data }))
      .catch((err) => console.log(err));

    for (let farm of this.state.user.view_farms) {
      let userPrivilegesClone = [...this.state.userPrivileges];
      userPrivilegesClone.push({
        id: farm.id,
        canControl: false,
      });

      this.setState({ userPrivileges: userPrivilegesClone });
    }

    for (let farm of this.state.user.control_farms) {
      let userPrivilegesClone = [...this.state.userPrivileges];
      userPrivilegesClone.push({
        id: farm.id,
        canControl: true,
      });

      this.setState({ userPrivileges: userPrivilegesClone });
    }

    this.setState({ originalUserPrivileges: this.state.userPrivileges });
  }

  checkChangedAndSubmit = async (event, userPrivileges) => {
    event.preventDefault();
    let changedValues = {};

    if (document.getElementById("firstname").value !== "") {
      changedValues.firstname = document.getElementById("firstname").value;
    }
    if (document.getElementById("lastname").value !== "") {
      changedValues.lastname = document.getElementById("lastname").value;
    }
    if (document.getElementById("username").value !== "") {
      changedValues.username = document.getElementById("username").value;
    }
    if (document.getElementById("email").value !== "") {
      changedValues.email = document.getElementById("email").value;
    }
    if (userPrivileges !== this.state.originalUserPrivileges) {
      changedValues.view_farms = [];
      changedValues.control_farms = [];
      for (let farm of userPrivileges) {
        if (farm.canControl === false) {
          changedValues.view_farms.push(farm.id);
        } else {
          changedValues.control_farms.push(farm.id);
        }
      }
    }

    if (Object.keys(changedValues).length !== 0) {
      changedValues.id = this.state.user.id;
      await axios
        .post(
          process.env.REACT_APP_SERVER_PROTO +
            process.env.REACT_APP_SERVER_ADDR +
            "/api/users/update",
          changedValues,
          config
        )
        .then((resp) => {
          if (
            this.state.user.id === this.state.currentAdminID &&
            changedValues.username
          ) {
            axios.post(
              process.env.REACT_APP_SERVER_PROTO +
                process.env.REACT_APP_SERVER_ADDR +
                "/auth/logout",
              {},
              { withCredentials: "include" }
            );
            window.localStorage.removeItem("access_token");
            window.location = "/login";
            toast.success("User updated successfully.");
          } else {
            window.location = "/admin/manageUsers";
            toast.success("User updated successfully.");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("User update failed.");
        });
    } else {
      toast.error("You have not made any changes.");
    }
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

  handleChange = (e) => {
    const user = { ...this.state.user };
    user[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ user });
  };

  render() {
    const {
      user,
      disabled,
      farms,
      userPrivileges,
      currentAdminID,
    } = this.state;

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
                <p className="text-red">
                  * Only fill in the fields that you wish to change
                </p>
                <div className="form-group">
                  <label for="userID" className="form-label lbl">
                    User ID:
                  </label>
                  <input
                    id="userID"
                    type="text"
                    className="form-input"
                    placeholder={user.id}
                    disabled
                  />
                  <br />

                  <label for="admin" className="form-label lbl">
                    Admin:
                  </label>
                  <input
                    id="admin"
                    type="text"
                    className="form-input"
                    placeholder={user.admin ? "True" : "False"}
                    disabled
                  />
                  <br />

                  <label className="form-label lbl">First Name: </label>
                  <input
                    id="firstname"
                    type="text"
                    className="form-input"
                    placeholder={user.firstname}
                    onChange={this.handleChange}
                    disabled={disabled}
                  />
                  <br />

                  <label className="form-label lbl">Last Name: </label>
                  <input
                    id="lastname"
                    type="text"
                    className="form-input"
                    placeholder={user.lastname}
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
                  {user.admin === false || user.id === currentAdminID ? (
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        this.handleEnable();
                      }}
                    >
                      Click to Edit User
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </form>
            <div
              className={
                user.user_disabled
                  ? "flex-child flex-child-blocked"
                  : "flex-child flex-child-active"
              }
            >
              {user.user_disabled ? (
                <div>
                  <h4 className="align-center">
                    User BLOCKED <FontAwesomeIcon icon={faBan} />
                  </h4>
                  <p className="align-left">
                    Always be careful when unblocking user accounts. Investigate
                    and check the cause for which the account was blocked in the
                    first place.
                  </p>
                  {user.admin == false ? (
                    <button
                      className="btn btn-md btn-secondary"
                      onClick={async () => {
                        await axios
                          .post(
                            process.env.REACT_APP_SERVER_PROTO +
                              process.env.REACT_APP_SERVER_ADDR +
                              `/api/users/${user.id}/unblock`,
                            {},
                            config
                          )
                          .then((resp) => {
                            window.location = "/admin/manageUsers";
                            toast.success("User unblocked successfully.");
                          })
                          .catch((err) => toast.error("User unblock failed."));
                      }}
                    >
                      Unblock User
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : (
                <div>
                  <h5>USER ACTIVE</h5>
                  {user.admin == false ? (
                    <button
                      className="btn btn-md btn-danger"
                      onClick={async () => {
                        await axios
                          .post(
                            process.env.REACT_APP_SERVER_PROTO +
                              process.env.REACT_APP_SERVER_ADDR +
                              `/api/users/${user.id}/block`,
                            {},
                            config
                          )
                          .then((resp) => {
                            window.location = "/admin/manageUsers";
                            toast.success("User blocked successfully.");
                          })
                          .catch((err) => toast.error("User block failed."));
                      }}
                    >
                      Block User
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              )}
            </div>
            {user.admin === false ? (
              <div className="flex-child flex-child-table">
                <div className="break">
                  <hr />
                </div>
                <FarmPrivileges
                  farms={farms}
                  userPrivileges={userPrivileges}
                  onCreateNewUserPrivilege={this.handleCreateNewPrivilege}
                  onChangeFarmPrivileges={this.handleChangeFarmPrivileges}
                  onEditFarm={this.handleEditFarm}
                  onDeletePrivilege={this.handleDeletePrivilege}
                />
              </div>
            ) : (
              <div></div>
            )}
            <div className="break"></div>
            <div className="flex-child apply-changes-button">
              {user.admin === false || user.id === currentAdminID ? (
                <div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    form="main-form"
                    onClick={(event) => {
                      this.checkChangedAndSubmit(event, userPrivileges);
                    }}
                  >
                    Save & Apply Changes
                  </button>
                  {user.id === currentAdminID ? (
                    <h5 style={{ marginTop: "30px" }}>
                      <b> Note:</b> Changing your own username will cause a
                      force logout.
                    </h5>
                  ) : (
                    <div></div>
                  )}
                  <div className="break"></div>
                  <div className="break"></div>

                  {user.admin === false ? (
                    <div className="delete-user">
                      <h3 className="danger-zone-text">
                        <b>DANGER ZONE</b>
                      </h3>
                      <button
                        className="btn btn-danger btn-lg"
                        onClick={async () => {
                          await axios
                            .post(
                              process.env.REACT_APP_SERVER_PROTO +
                                process.env.REACT_APP_SERVER_ADDR +
                                `/api/users/${user.id}/delete`,
                              {},
                              config
                            )
                            .then((resp) => {
                              window.location = "/admin/manageUsers";
                              toast.success("User unblocked successfully.");
                            })
                            .catch((err) => toast.error("User delete failed."));
                        }}
                      >
                        Delete User
                      </button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : (
                <div>
                  <h4>
                    Managing another administators account is not allowed.
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditUserPage;
