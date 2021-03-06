import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import checkJWT from "../shared/checkJWT";

class NotFound extends Component {
  state = {};
  render() {
    checkJWT();
    return (
      <div className="not-found">
        <h1>Oops..</h1>
        <h3>
          The page you are looking for is not available.{" "}
          <FontAwesomeIcon icon={faExclamationCircle} />{" "}
        </h3>
      </div>
    );
  }
}

export default NotFound;
