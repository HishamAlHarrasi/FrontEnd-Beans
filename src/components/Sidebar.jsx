import React, { Component } from "react";
import styled from "styled-components";
import { Route, Link } from "react-router-dom";

const StyledSidebar = styled.div`
  position: fixed; /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
  height: 100%;
  width: 150px; /* Set the width of the sidebar */
  margin-top: 20px;
  z-index: 1; /* Stay on top of everything */
  top: 3.4em; /* Stay at the top */
  background-color: #222; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 10px;
  background-color: #0275d8;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
`; // Adapted from https://github.com/Shmoji/react-sidebar/blob/master/src/components/Sidebar.js

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <StyledSidebar>
          <ul>
            <div className="sidebar-item">
              <li className="sidebar-option" id="sidebar-top">
                Farm View
              </li>
            </div>
            <div className="sidebar-item">
              <li className="sidebar-option">Tunnel View</li>
            </div>
            <div className="sidebar-item">
              <li className="sidebar-option">Graphical</li>
            </div>
          </ul>
        </StyledSidebar>
      </div>
    );
  }
}
