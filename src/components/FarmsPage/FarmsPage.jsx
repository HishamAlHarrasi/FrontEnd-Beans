import React, { Component } from "react";
import FarmComponent from "./FarmComponent";
import checkJWT from "../shared/checkJWT";
import axios from "axios";
import jwtDecode from "jwt-decode";

let token = "";
let config = {};

export default class FarmsPage extends Component {
  state = { farms: [], control_farms: [], view_farms: [] };

  async componentDidMount() {
    checkJWT();
    token = window.localStorage.getItem("access_token");
    config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    let isAdmin = jwtDecode(token).admin; // Admins have access to all farms, so wont need to request specific farms only

    await axios
      .get(
        process.env.REACT_APP_SERVER_PROTO +
          process.env.REACT_APP_SERVER_ADDR +
          "/api/farms/all",
        config
      )
      .then((resp) => {
        this.setState({ farms: resp.data });
      })
      .catch((err) => console.log(err));

    if (!isAdmin) {
      await axios
        .get(
          process.env.REACT_APP_SERVER_PROTO +
            process.env.REACT_APP_SERVER_ADDR +
            "/api/users/me",
          config
        )
        .then((resp) => {
          let view_farms = [];
          let control_farms = [];

          for (let farm of this.state.farms) {
            for (let userFarm of resp.data.view_farms) {
              if (farm.id === userFarm.id) {
                view_farms.push(farm);
              }
            }
          }

          for (let farm of this.state.farms) {
            for (let userFarm of resp.data.control_farms) {
              if (farm.id === userFarm.id) {
                control_farms.push(farm);
              }
            }
          }

          this.setState({
            view_farms: view_farms,
            control_farms: control_farms,
          });
        })
        .catch((err) => console.log(err));
    } else {
      let control_farms = [...this.state.farms]; // Admin can control all farms
      this.setState({ control_farms: control_farms });
    }
  }

  render() {
    const { control_farms, view_farms } = this.state;

    return (
      <div>
        <div className="container" style={{ marginBottom: "50px" }}>
          <h1>Farms Page</h1>

          {control_farms.map((farm) => {
            return (
              <FarmComponent key={farm.id} farm={farm} canControl={true} />
            );
          })}

          {view_farms.map((farm) => {
            return (
              <FarmComponent key={farm.id} farm={farm} canControl={false} />
            );
          })}
        </div>
      </div>
    );
  }
}
