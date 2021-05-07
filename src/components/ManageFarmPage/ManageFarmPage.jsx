import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircle } from "@fortawesome/free-solid-svg-icons";
import "./ManageFarmPage.css";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
} from "recharts";
import checkJWT from "../shared/checkJWT";
import axios from "axios";

let token = "";
let config = {};

export default class ManageFarmPage extends Component {
  state = { farm: {}, tunnels: [], nodes: [], live_data: {}, canControl: null };

  liveUpdate = async () => {
    for (let node of this.state.nodes) {
      await axios
        .get(
          process.env.REACT_APP_SERVER_PROTO +
            process.env.REACT_APP_SERVER_ADDR +
            `/api/nodes/${node.id}/latest`,
          config
        )
        .then((resp) => {
          let live_data_clone = this.state.live_data;
          live_data_clone[node.id] = resp.data;
          this.setState({ live_data: live_data_clone });
        })
        .catch((err) => console.log(err));
    }
  };

  async componentDidMount() {
    checkJWT();
    token = window.localStorage.getItem("access_token");
    config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axios
      .get(
        process.env.REACT_APP_SERVER_PROTO +
          process.env.REACT_APP_SERVER_ADDR +
          `/api/farms/${this.props.location.state.farm.id}/nodes`,
        config
      )
      .then((resp) => this.setState({ nodes: resp.data }))
      .catch((err) => console.log(err));

    let live_data = {};
    for (let node of this.state.nodes) {
      live_data[node.id] = [];
    }

    this.setState({
      tunnels: this.props.location.state.tunnels,
      farm: this.props.location.state.farm,
      canControl: this.props.location.state.canControl,
      live_data: live_data,
    });

    this.liveUpdate();

    this.interval = setInterval(async () => {
      this.liveUpdate();
    }, 6000); // Get live data every 6 seconds
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { farm, tunnels, nodes, live_data, canControl } = this.state;

    return (
      <div>
        <div className="go-back">
          <Link to="/farms">
            Go Back <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </div>
        <div>
          <div className="container farm-heading-manage-farms">
            <h3>
              Farm Name: <b>{farm.name}</b>
            </h3>
            <h3>
              Farm Location: <b>{farm.location}</b>
            </h3>
          </div>
        </div>
        {tunnels.map((tunnel) => {
          return (
            <div className="container" style={{ marginBottom: "20px" }}>
              <div key={tunnel}>
                <h2>Tunnel {tunnel}</h2>
                <div className="row-farm-page">
                  <div className="column-farm-page">
                    {nodes.map((node, index) => {
                      if (node.tunnel_id == tunnel) {
                        return (
                          <div className="node-parent">
                            <div className="inside-row">
                              <div>
                                <span>Node ID: </span>
                                <span>
                                  <b>{node.id}</b>
                                </span>
                              </div>
                              <div>
                                <span>Sensors: </span>
                                <span>
                                  <b>
                                    {node.sensors.map((sensor, index) => {
                                      if (index == node.sensors.length - 1) {
                                        return `${
                                          sensor.name.charAt(0).toUpperCase() +
                                          sensor.name.slice(1)
                                        }`;
                                      } else {
                                        return `${
                                          sensor.name.charAt(0).toUpperCase() +
                                          sensor.name.slice(1)
                                        } & `;
                                      }
                                    })}
                                  </b>
                                </span>
                              </div>
                              <div>
                                <span>Node Status: </span>
                                <span>
                                  <b>Live</b>
                                  <FontAwesomeIcon
                                    icon={faCircle}
                                    style={{
                                      color: "#1ec31e",
                                      marginLeft: "8px",
                                    }}
                                  />
                                </span>
                              </div>
                            </div>
                            <div className="live-data-graphs">
                              <h3>
                                <b> Node {node.id} </b> Live Data:
                              </h3>
                              <div className="live-data-flex">
                                {node.sensors.map((sensor) => {
                                  return (
                                    <div className="link-sensors-page">
                                      <Link
                                        to={{
                                          pathname: `/farms/${farm.id}/${node.id}/${sensor.id}`,
                                          state: {
                                            farm: farm,
                                            tunnel: tunnel,
                                            node: node,
                                            sensor: sensor,
                                            canControl: canControl,
                                          },
                                        }}
                                      >
                                        <div className="live-data-flex-child">
                                          <div className="live-data-flex-childs-child">
                                            <p>Sensor:</p>
                                            {sensor.name != "motion" ? (
                                              <p>Accepted Range:</p>
                                            ) : (
                                              <div></div>
                                            )}
                                            <p>Live Feed:</p>
                                          </div>
                                          <div className="live-data-flex-childs-child live-align-center">
                                            <p>
                                              <b>
                                                {sensor.name
                                                  .charAt(0)
                                                  .toUpperCase() +
                                                  sensor.name.slice(1)}
                                              </b>
                                            </p>
                                            {sensor.name != "motion" ? (
                                              <p>
                                                <b>
                                                  {sensor.max_threshold} -{" "}
                                                  {sensor.min_threshold}
                                                </b>
                                              </p>
                                            ) : (
                                              <div></div>
                                            )}
                                            <p>
                                              <b>
                                                {live_data[node.id][sensor.id]}
                                              </b>
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
