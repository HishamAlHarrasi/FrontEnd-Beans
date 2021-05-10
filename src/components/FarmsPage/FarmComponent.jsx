import React, { Component } from "react";
import "./FarmComponent.css";
import { Link } from "react-router-dom";
import axios from "axios";

let token = "";
let config = {};

export default class FarmComponent extends Component {
  state = { tunnels: [], allTunnels: [], nodes: [] };

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
        let tunnels = []; // Format the tunnels in the state to make it easier to present only two in each row, and on takes the whole row if it is the remainder
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

    await axios
      .get(
        process.env.REACT_APP_SERVER_PROTO +
          process.env.REACT_APP_SERVER_ADDR +
          `/api/farms/${this.props.farm.id}/nodes`,
        config
      )
      .then((resp) => this.setState({ nodes: resp.data }))
      .catch((err) => console.log(err));
  }

  countNodesInTunnel = (tunnelID) => {
    // Function to cound the number of nodes in each tunnel
    let nodeCount = 0;

    for (let node of this.state.nodes) {
      if (node.tunnel_id == tunnelID) {
        nodeCount = nodeCount + 1;
      }
    }

    return nodeCount;
  };

  render() {
    const { farm, canControl } = this.props;
    const { tunnels, allTunnels, nodes } = this.state;
    console.log(nodes);
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
                </div>
              </div>
            </Link>
            {tunnels.map((tunnelFormat) => {
              if (tunnelFormat.length == 2) {
                // Formatting the organisation of the tunnels on the screen to render 2 per row, and if there is a remainder of one it will be in its own row
                return (
                  <div className="inner-row-heading" key={tunnelFormat}>
                    <div className="inner-column">
                      <h5 id="bold">Tunnel {tunnelFormat[0]}</h5>
                      <div className="general-row">
                        <div className="general-column">
                          <span id="bold">Sensors in Tunnel:</span>
                        </div>
                        <div className="general-column">
                          <span className="live-data">
                            {nodes.map((node) => {
                              if (tunnelFormat[0] == node.tunnel_id) {
                                return (
                                  <div>
                                    {node.sensors.map((sensor) => {
                                      return (
                                        <p>{`${
                                          sensor.name.charAt(0).toUpperCase() + // Capitalize sensor names
                                          sensor.name.slice(1)
                                        }`}</p>
                                      );
                                    })}
                                  </div>
                                );
                              }
                            })}
                          </span>
                        </div>
                        <div className="general-column">
                          <div className="general-row-inner">
                            <p>Node Count:</p>
                            <b style={{ marginLeft: "20px" }}>
                              {this.countNodesInTunnel(tunnelFormat[0])}
                            </b>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="inner-column">
                      <h5 id="bold">Tunnel {tunnelFormat[1]}</h5>
                      <div className="general-row">
                        <div className="general-column">
                          <span id="bold">Sensors in Tunnel:</span>
                        </div>
                        <div className="general-column">
                          <span className="live-data">
                            {nodes.map((node) => {
                              if (tunnelFormat[1] == node.tunnel_id) {
                                return (
                                  <div>
                                    {node.sensors.map((sensor) => {
                                      return (
                                        <p>{`${
                                          sensor.name.charAt(0).toUpperCase() + // Capitalize sensor names
                                          sensor.name.slice(1)
                                        }`}</p>
                                      );
                                    })}
                                  </div>
                                );
                              }
                            })}
                          </span>
                        </div>
                        <div className="general-column">
                          <div className="general-row-inner">
                            <p>Node Count:</p>
                            <b style={{ marginLeft: "20px" }}>
                              {this.countNodesInTunnel(tunnelFormat[1])}
                            </b>
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
                          <span id="bold">Sensors in Tunnel:</span>
                        </div>
                        <div className="general-column">
                          <span className="live-data">
                            {nodes.map((node) => {
                              if (tunnelFormat[0] == node.tunnel_id) {
                                return (
                                  <div>
                                    {node.sensors.map((sensor) => {
                                      return (
                                        <p>{`${
                                          sensor.name.charAt(0).toUpperCase() + // Capitalize sensor names
                                          sensor.name.slice(1)
                                        }`}</p>
                                      );
                                    })}
                                  </div>
                                );
                              }
                            })}
                          </span>
                        </div>
                        <div className="general-column">
                          <div className="general-row-inner">
                            <p>Node Count:</p>
                            <b style={{ marginLeft: "20px" }}>
                              {this.countNodesInTunnel(tunnelFormat[0])}
                            </b>
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
