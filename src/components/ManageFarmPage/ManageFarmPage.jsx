import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default class ManageFarmPage extends Component {
  render() {
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
            <div className="row">
              <div className="column">test</div>
              <div className="column">test</div>
              <div className="column">test</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
