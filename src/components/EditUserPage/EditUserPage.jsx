import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
        <form>
          <div className="form-input">
            <label className="form-label lbl">Username: </label>
            <input
              type="text"
              className="form-input"
              value={user.username}
              disabled={disabled}
            />
          </div>

          <div className="form-input">
            <label className="form-label lbl">First Name: </label>
            <input
              type="text"
              className="form-input"
              value={user.firstName}
              disabled={disabled}
            />
          </div>

          <div className="form-input">
            <label className="form-label lbl">Last Name: </label>
            <input
              type="text"
              className="form-input"
              value={user.lastName}
              disabled={disabled}
            />
          </div>

          <div className="form-input">
            <label className="form-label lbl">Email: </label>
            <input
              type="text"
              className="form-input"
              value={user.email}
              disabled={disabled}
            />
          </div>
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={() => {
              setDisabled(false);
            }}
          >
            Edit User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserPage;
