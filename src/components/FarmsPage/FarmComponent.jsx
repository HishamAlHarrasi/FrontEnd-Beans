import React, { Component } from "react";
import "./FarmComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const FarmComponent = (props) => {
  return (
    <div>
      <div className="row">
        <div className="column">
          <div className="inner-row">
            <div className="farm-heading">
              <div className="heading-column">
                Farm Name: <b>exampleText</b>
              </div>
              <div className="heading-column">
                Location: <b>exampleText</b>
              </div>
              <div className="heading-column">
                Status: <b>exampleText</b>{" "}
                <FontAwesomeIcon icon={faCircle} style={{ color: "red" }} />
              </div>
            </div>
          </div>
          <div className="inner-row-heading">
            <div className="inner-column">
              <h5>Tunnel 1</h5>
            </div>
            <div className="inner-column">
              <h5>Tunnel 2</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmComponent;
