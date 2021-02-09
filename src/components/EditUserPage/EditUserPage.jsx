import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBan } from "@fortawesome/free-solid-svg-icons";
import "./EditUserPage.css";

const EditUserPage = (props) => {
  const { user } = props.location.state;

  const [disabled, setDisabled] = useState(true);
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
          <form>
            <div className="flex-child">
              <div className="form-input">
                <label className="form-label lbl">First Name: </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={user.firstName}
                  disabled={disabled}
                />
                <br />

                <label className="form-label lbl">Last Name: </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={user.lastName}
                  contentEditable={true}
                  disabled={disabled}
                />
                <br />

                <label className="form-label lbl">Username: </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={user.username}
                  disabled={disabled}
                />
                <br />

                <label className="form-label lbl">Email: </label>
                <input
                  type="text"
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
                    setDisabled(false);
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
              <h5>USER ACTIVE</h5>
            )}
          </div>
          <div className="break"></div>
          <h1>TEST</h1>
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
