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
  state = { farm: {}, tunnels: [], nodes: [], data: [], canControl: null };

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

    this.setState({
      tunnels: this.props.location.state.tunnels,
      farm: this.props.location.state.farm,
      canControl: this.props.location.state.canControl,
    });
  }

  render() {
    const { farm, tunnels, nodes } = this.state;
    const data = [
      {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ];
    console.log(nodes);
    return (
      <div>
        <div className="go-back">
          <Link to="/farms">
            Go Back <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </div>
        {tunnels.map((tunnel) => {
          return (
            <div className="container" style={{ marginBottom: "50px" }}>
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
                              <h3>Node {node.id} Live Data:</h3>
                              <div className="live-data-flex">
                                {node.sensors.map((sensor) => {
                                  return (
                                    <div className="live-data-flex-child">
                                      <p>
                                        Sensor:
                                        <b>
                                          {sensor.name.charAt(0).toUpperCase() +
                                            sensor.name.slice(1)}
                                        </b>
                                      </p>
                                      <p>
                                        Accepted Range:
                                        <b>
                                          {sensor.min_threshold} -
                                          {sensor.max_threshold}
                                        </b>
                                      </p>
                                      <p>
                                        Live Feed: <b>22</b>
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                    {/* <div className="graph-row">
                      <LineChart
                        width={830}
                        height={250}
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                      </div> */}
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
