import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import checkJWT from "../shared/checkJWT";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Label,
} from "recharts";

let token = "";
let config = {};

export default class ManageSensorPage extends Component {
  state = { data: [] };
  interval = null;

  liveUpdate = async () => {
    await axios
      .get(
        process.env.REACT_APP_SERVER_PROTO +
          process.env.REACT_APP_SERVER_ADDR +
          `/api/nodes/${this.props.location.state.node.id}/sensors/${this.props.location.state.sensor.id}/data`,
        config
      )
      .then((resp) => this.setState({ data: resp.data }))
      .catch((err) => console.log(err));
  };

  async componentDidMount() {
    checkJWT();
    token = window.localStorage.getItem("access_token");
    config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    this.liveUpdate();

    this.interval = setInterval(async () => {
      this.liveUpdate();
    }, 6000); // Get live data every 6 seconds
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      farm,
      tunnel,
      node,
      sensor,
      canControl,
    } = this.props.location.state;
    const { data } = this.state;

    return (
      <div>
        <div
          className="go-back"
          onClick={() => {
            window.history.back();
          }}
        >
          Go Back <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div className="container">
          {this.state.data.length == 0 ? (
            <h3>No data available</h3>
          ) : (
            <div className="sensor-main">
              <div className="graph">
                <LineChart
                  width={1000}
                  height={350}
                  data={this.state.data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp">
                    <Label value="Time" dy={10} position="centerBottom" />
                  </XAxis>
                  <YAxis dataKey="value">
                    <Label
                      value={sensor.name}
                      dy={120}
                      position="insideTopLeft"
                      angle={-90}
                    />
                  </YAxis>
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </div>
              <div className="sensor-table data-table-sensors">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Time</th>
                      <th scope="col">Reading</th>
                    </tr>
                  </thead>
                  {data.map((datapoint) => {
                    return (
                      <tbody key={datapoint.timestamp}>
                        <tr>
                          <th scope="row">{datapoint.timestamp}</th>
                          <td>{datapoint.value}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
