import React from "react";
import FarmPrivileges from "./FarmPrivileges";
import "./SignupForm.css";

const SignupForm = (props) => {
  const {
    onSubmit,
    farms,
    userPrivileges,
    onCreateNewUserPrivilege,
    onChangeFarmPrivileges,
    onEditFarm,
    onDeletePrivilege,
  } = props;

  return (
    <div className="main-container">
      <form className="form" onSubmit={(e) => onSubmit(e, userPrivileges)}>
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
          </div>
          <div className="form-input">
            <label className="form-label lbl">Last Name: </label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter last name.."
              required
            />
          </div>
          <div className="form-input">
            <label className="form-label lbl">Username: </label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter username.."
              required
            />
          </div>
          <div className="form-input">
            <label className="form-label lbl">Email: </label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter email.."
              required
            />
          </div>
          <div className="form-input">
            <label className="form-label lbl">Password: </label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter password.."
              required
            />
          </div>
          <div className="form-input">
            <label className="form-label lbl">Confirm Password: </label>
            <input
              type="password"
              className="form-input"
              placeholder="Confirm password.."
              required
            />
          </div>
          <div className="form-input">
            <input
              type="radio"
              className="form-input"
              name="adminState"
              defaultChecked
            />
            <label className="form-label lbl">Standard User</label>
            <input type="radio" className="form-input" name="adminState" />
            <label className="form-label lbl">Admin</label>
          </div>
        </div>
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
