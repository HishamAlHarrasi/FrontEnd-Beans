import React, { Component } from "react";
import "./FarmComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

let token = "";
let config = {};

export default class FarmComponent extends Component {
  state = { tunnels: [], allTunnels: [] };

  async componentDidMount() {
    token = window.localStorage.getItem("access_token");
    config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axios
      .get(
        process.env.REACT_APP_SERVER_PROTO +
          process.env.REACT_APP_SERVER_ADDR +
          `/api/farms/${this.props.farm.id}/tunnels`,
        config
      )
      .then((resp) => {
        let tunnels = [];
        for (let index in resp.data) {
          if (index % 2 == 0 && index == resp.data.length - 1) {
            tunnels.push([resp.data[index]]);
          } else if (index % 2 == 1) {
            tunnels.push([resp.data[index - 1], resp.data[index]]);
          }
        }
        this.setState({ tunnels: tunnels });
        this.setState({ allTunnels: resp.data });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { farm, canControl } = this.props;
    const { tunnels, allTunnels } = this.state;
    console.log(farm);
    return (
      <div className="farm-container">
        <div className="row">
          <div className="column">
            <Link
              to={{
                pathname: `/farms/${farm.id}`,
                state: {
                  farm: farm,
                  tunnels: allTunnels,
                  canControl: canControl,
                },
              }}
            >
              <div className="inner-row">
                <div className="farm-heading">
                  <div className="heading-column">
                    Farm Name: <b>{farm.name}</b>
                  </div>
                  <div className="heading-column">
                    Location: <b>{farm.location}</b>
                  </div>
                  <div className="heading-column">
                    Tunnels: <b>{allTunnels.length}</b>
                  </div>
                  <div className="heading-column">
                    Status: <b>Live</b>
                    <FontAwesomeIcon
                      icon={faCircle}
                      style={{ color: "#1ec31e", marginLeft: "10px" }}
                    />
                  </div>
                </div>
              </div>
            </Link>
            {tunnels.map((tunnelFormat) => {
              if (tunnelFormat.length == 2) {
                return (
                  <div className="inner-row-heading" key={tunnelFormat}>
                    <div className="inner-column">
                      <h5 id="bold">Tunnel {tunnelFormat[0]}</h5>
                      <div className="general-row">
                        <div className="general-column">
                          <span id="bold">Live Feed:</span>
                          <span>Light (Lux):</span>
                          <span>Motion:</span>
                        </div>
                        <div className="general-column">
                          <span className="live-data">_</span>
                          <span className="live-data">A</span>
                          <span className="live-data">No Motion</span>
                        </div>
                        <div className="general-column">
                          <div className="general-row-inner">
                            Tunnel Status:
                            <FontAwesomeIcon
                              icon={faCircle}
                              style={{
                                color: "#1ec31e",
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
                      <h5 id="bold">Tunnel {tunnelFormat[1]}</h5>
                      <div className="general-row">
                        <div className="general-column">
                          <span id="bold">Live Feed:</span>
                          <span>Light (Lux):</span>
                          <span>Motion:</span>
                        </div>
                        <div className="general-column">
                          <span className="live-data">_</span>
                          <span className="live-data">A</span>
                          <span className="live-data">No Motion</span>
                        </div>
                        <div className="general-column">
                          <div className="general-row-inner">
                            Tunnel Status:
                            <FontAwesomeIcon
                              icon={faCircle}
                              style={{
                                color: "#1ec31e",
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
                );
              } else if (tunnelFormat.length == 1) {
                return (
                  <div className="inner-row-heading" key={tunnelFormat}>
                    <div className="inner-column">
                      <h5 id="bold">Tunnel {tunnelFormat[0]}</h5>
                      <div className="general-row">
                        <div className="general-column">
                          <span id="bold">Live Feed:</span>
                          <span>Light (Lux):</span>
                          <span>Motion:</span>
                        </div>
                        <div className="general-column">
                          <span className="live-data">_</span>
                          <span className="live-data">A</span>
                          <span className="live-data">No Motion</span>
                        </div>
                        <div className="general-column">
                          <div className="general-row-inner">
                            Tunnel Status:
                            <FontAwesomeIcon
                              icon={faCircle}
                              style={{
                                color: "#1ec31e",
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
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}
