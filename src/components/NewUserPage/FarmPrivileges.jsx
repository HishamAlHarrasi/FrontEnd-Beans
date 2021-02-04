import React from "react";
import FarmDropdown from "./FarmDropdown";
import "./FarmPrivileges.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const FarmPrivileges = (props) => {
  const {
    farms,
    userPrivileges,
    onCreateNewUserPrivilege,
    onChangeFarmPrivileges,
    onEditFarm,
    onDeletePrivilege,
  } = props;

  console.log(userPrivileges.canControl);

  return (
    <div className="farmprivileges-container">
      <table class="table table-hover" style={{ width: "50%", margin: "auto" }}>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Farm</th>
            <th scope="col">Privileges</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {userPrivileges.map((userPrivilege, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <FarmDropdown
                    farms={farms}
                    userPrivilege={userPrivilege}
                    onEditFarm={onEditFarm}
                    index={index}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    name={index}
                    className="table-radio"
                    checked={!userPrivilege.canControl}
                    onClick={() => onChangeFarmPrivileges(index)} // Changes the access rights - View, or View & Control
                  />
                  <label htmlFor="View" className="table-radio-label">
                    View
                  </label>
                  <input
                    type="radio"
                    name={index}
                    className="table-radio"
                    onClick={() => onChangeFarmPrivileges(index)} // Changes the access rights - View, or View & Control
                  />
                  <label htmlFor="View" className="table-radio-label">
                    View & Control
                  </label>
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="font-awesome-trash"
                    onClick={() => onDeletePrivilege(index)}
                  />
                </td>
              </tr>
            );
          })}

          <tr>
            <td></td>
            <td>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => onCreateNewUserPrivilege()}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ paddingRight: "5px", fontSize: "20px" }}
                />
                Add Farm Privilege
              </button>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FarmPrivileges;
