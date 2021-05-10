import React, { useState } from "react";

const FarmDropdown = (props) => {
  const { farms, userPrivilege, index, onEditFarm } = props;

  return (
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {userPrivilege.id === null
          ? "Choose Remote Farm"
          : farms[farms.findIndex((x) => x.id === userPrivilege.id)].name + // Set it up so that when user chooses a farm, their choice is now the one that is presented as the dropdown title - Good for UX
            ", " +
            farms[farms.findIndex((x) => x.id === userPrivilege.id)].location}
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {farms.map((farm) => {
          return (
            <a
              class="dropdown-item"
              onClick={() => {
                onEditFarm(farm.id, index);
              }}
            >
              {farm.name + ", " + farm.location}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default FarmDropdown;
