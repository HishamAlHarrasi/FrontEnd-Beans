import React, { useState } from "react";

const FarmDropdown = (props) => {
  const { farms, userPrivilege, index, onEditFarm } = props;

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {userPrivilege.id === null ? "Choose Remote Farm" : userPrivilege.name}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {farms.map((farm) => {
          return (
            <a
              className="dropdown-item"
              onClick={() => {
                onEditFarm(farm.id, index);
              }}
            >
              {farm.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default FarmDropdown;
