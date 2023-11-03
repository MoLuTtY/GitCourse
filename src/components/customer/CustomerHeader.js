import "./CustomerHeader.css";
import { Link } from "react-router-dom";
import React from "react";

const CustomerHeader = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container">
          <a className="navbar-brand" href="#">
            ABCD BANK
          </a>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item active ">
                <Link className="login-navigate" to="/customer-dashboard">
                  Home
                </Link>
              </li>
              <li className="nav-item active custom-margin">
                <Link className="login-navigate" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default CustomerHeader;
