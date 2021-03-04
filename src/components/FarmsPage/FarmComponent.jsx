import React, { Component } from "react";
import "./FarmComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const FarmComponent = (props) => {
  return (
    <div className="farm-container">
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
                Status: <b>exampleText</b>
                <FontAwesomeIcon
                  icon={faCircle}
                  style={{ color: "red", marginLeft: "10px" }}
                />
              </div>
            </div>
          </div>
          <div className="inner-row-heading">
            <div className="inner-column">
              <h5 id="bold">Tunnel 1</h5>
              <div className="general-row">
                <div className="general-column">
                  <span id="bold">Live Feed:</span>
                  <span>Temperature (°C):</span>
                  <span>Humidity (%):</span>
                  <span>Motion:</span>
                </div>
                <div className="general-column">
                  <span className="live-data">_</span>
                  <span className="live-data">A</span>
                  <span className="live-data">B</span>
                  <span className="live-data">No Motion</span>
                </div>
                <div className="general-column">
                  <div className="general-row-inner">
                    Tunnel Status:
                    <FontAwesomeIcon
                      icon={faCircle}
                      style={{
                        color: "green",
                        marginTop: "3px",
                        marginLeft: "5px",
                      }}
                    />
                  </div>
                  <div className="general-row-inner">
                    <button className="btn btn-primary">Manage</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="inner-column">
              <h5 id="bold">Tunnel 2</h5>
              <div className="general-row">
                <div className="general-column">
                  <span id="bold">Live Feed:</span>
                  <span>Temperature (°C):</span>
                  <span>Humidity (%):</span>
                  <span>Motion:</span>
                </div>
                <div className="general-column">
                  <span className="live-data">_</span>
                  <span className="live-data">A</span>
                  <span className="live-data">B</span>
                  <span className="live-data">No Motion</span>
                </div>
                <div className="general-column">
                  <div className="general-row-inner">
                    Tunnel Status:
                    <FontAwesomeIcon
                      icon={faCircle}
                      style={{
                        color: "orange",
                        marginTop: "3px",
                        marginLeft: "5px",
                      }}
                    />
                  </div>
                  <div className="general-row-inner">
                    <button className="btn btn-primary">Manage</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmComponent;
