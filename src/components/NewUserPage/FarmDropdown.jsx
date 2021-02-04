import React, { useState } from "react";

const FarmDropdown = (props) => {
  const { farms, userPrivilege, index, onEditFarm } = props;

  const [currentFarm, setCurrentFarm] = useState(null); // For presentation purposes only - Shows what farm is currently chosen, while the onEditFarm method actually handles moving the data up to the main state

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
        {userPrivilege.id === null ? "Choose Remote Farm" : currentFarm}
      </button>
      <div
        class="dropdown-menu"
        aria-labelledby="dropdownMenuButton"
        onClick={(event) => setCurrentFarm(event.target.textContent)}
      >
        {farms.map((farm) => {
          return (
            <a
              class="dropdown-item"
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
