import React, { Component } from "react";
import FarmComponent from "./FarmComponent";
import Sidebar from "./../Sidebar";

export default class FarmsPage extends Component {
  componentDidMount() {
    console.log("Test");
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
