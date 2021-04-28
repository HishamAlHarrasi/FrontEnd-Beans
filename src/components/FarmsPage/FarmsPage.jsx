import React, { Component } from "react";
import FarmComponent from "./FarmComponent";
import Sidebar from "./../Sidebar";
import checkJWT from "../shared/checkJWT";

export default class FarmsPage extends Component {
  componentDidMount() {
    checkJWT()
  }

  render() {
    return (
      <div>
        {/* <Sidebar /> */}
        <div className="container">
          <h1>Farms Page</h1>
          <FarmComponent />
          <FarmComponent />
          <FarmComponent />
        </div>
      </div>
    );
  }
}
