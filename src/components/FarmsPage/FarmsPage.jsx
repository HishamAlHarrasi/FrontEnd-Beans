import React, { Component } from "react";
import FarmComponent from "./FarmComponent";

export default class FarmsPage extends Component {
  componentDidMount() {
    console.log("Test");
  }

  render() {
    return (
      <div className="container">
        <h1>Farms Page</h1>
        <FarmComponent />
        <FarmComponent />
        <FarmComponent />
      </div>
    );
  }
}
