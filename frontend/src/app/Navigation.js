import React from "react";
import { NavLink } from "react-router-dom";

import { HOME_PATH, ADD_MODEL_PATH } from "../constants/constants";


export function BasicNav() {
  return (
    <div className="container-fluid d-flex justify-content-between align-items-center border-bottom">
      <a href={HOME_PATH} className="navbar-brand">
        <img src="ml-logo.png" alt="Logo" style={{ height: '50px' }} />
      </a>
      <ul className="nav">
        <li className="nav-item">
          <NavLink className={({ isActive }) => "nav-link bg-light border border-bottom-0" + (isActive ? " active bg-second-primary" : "")} to={HOME_PATH}>
            <h4 className="text-dark">View Models</h4>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive }) => "nav-link bg-light border border-bottom-0" + (isActive ? " active bg-second-primary " : "")} to={ADD_MODEL_PATH}>
            <h4 className="text-dark">Add Model</h4>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
