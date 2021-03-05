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
export default class ManageFarmPage extends Component {
  render() {
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
    return (
      <div>
        <div className="go-back">
          <Link to="/farms">
            Go Back <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </div>
        <div className="container">
          <div>
            <h2>Sensor 1</h2>
            <div className="row-farm-page">
              <div className="column-farm-page">
                <div className="inside-row">
                  <div className="inside-column">
                    <span>Sensor Type:</span>
                    <span>SensorID:</span>
                    <span>Sensor Status:</span>
                    <br />
                    <span>Live Reading: </span>
                  </div>
                  <div className="inside-column data-class">
                    <span>Temperature</span>
                    <span>12345</span>
                    <span>
                      Live
                      <FontAwesomeIcon
                        icon={faCircle}
                        style={{ color: "1ec31e", marginLeft: "8px" }}
                      />
                    </span>
                    <br />
                    <span id="live-reading">25 °C</span>
                  </div>
                </div>
                <div className="graph-row">
                  <LineChart
                    width={730}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
