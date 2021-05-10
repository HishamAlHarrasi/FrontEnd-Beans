import React from "react";
import FarmPrivileges from "./FarmPrivileges";
import "./SignupForm.css";

const SignupForm = (props) => {
  const {
    farms,
    errors,
    onSubmit,
    userPrivileges,
    onCreateNewUserPrivilege,
    onChangeFarmPrivileges,
    onEditFarm,
    onDeletePrivilege,
  } = props;

  return (
    <div className="main-container">
      <form
        className="form"
        onSubmit={(e) => onSubmit(e, userPrivileges)}
        noValidate
      >
        <h1 className="heading">Create User</h1>
        <div className="input-field-shell">
          <div className="form-input">
            <label className="form-label lbl">First Name: </label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter first name.."
              required
            />
            {errors.firstName && (
              <div className="alert alert-danger label-width">
                {errors.firstName}
              </div>
            )}
          </div>
          <div className="form-input">
            <label className="form-label lbl">Last Name: </label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter last name.."
              required
            />
            {errors.lastName && (
              <div className="alert alert-danger label-width">
                {errors.lastName}
              </div>
            )}
          </div>
          <div className="form-input">
            <label className="form-label lbl">Username: </label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter username.."
              required
            />
            {errors.username && (
              <div className="alert alert-danger label-width">
                {errors.username}
              </div>
            )}
          </div>
          <div className="form-input">
            <label className="form-label lbl">Email: </label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter email.."
              required
            />
            {errors.email && (
              <div className="alert alert-danger label-width">
                {errors.email}
              </div>
            )}
          </div>
          <div className="form-input">
            <label className="form-label lbl">Password: </label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter password.."
              required
            />
            {errors.password && (
              <div className="alert alert-danger label-width">
                {errors.password}
              </div>
            )}
          </div>
          <div className="form-input">
            <label className="form-label lbl">Confirm Password: </label>
            <input
              type="password"
              className="form-input"
              placeholder="Confirm password.."
              required
            />
            {errors.password2 && (
              <div className="alert alert-danger label-width">
                {errors.password2}
              </div>
            )}
          </div>
          <div className="form-input">
            <input
              type="radio"
              className="form-input"
              name="adminState"
              defaultChecked
            />
            <label className="form-label lbl">Standard User</label>
            <input
              type="radio"
              className="form-input"
              name="adminState"
              id="admin"
            />
            <label className="form-label lbl">Admin</label>
          </div>
        </div>
        <p style={{ color: "red", marginTop: "20px" }}>
          * Note: If user is an <b>admin</b> , they get control privileges to
          all farms by default.
        </p>{" "}
        <div className="farm-privileges-table">
          <FarmPrivileges
            farms={farms}
            userPrivileges={userPrivileges}
            onCreateNewUserPrivilege={onCreateNewUserPrivilege}
            onChangeFarmPrivileges={onChangeFarmPrivileges}
            onEditFarm={onEditFarm}
            onDeletePrivilege={onDeletePrivilege}
          />
        </div>
        {errors.farmPrivileges && (
          <div className="alert alert-danger label-width">
            {errors.farmPrivileges}
          </div>
        )}
        <button
          className="btn btn-primary"
          style={{ margin: "100px", marginBottom: "200px" }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
