import React from "react";
import { Link, useNavigate } from "react-router-dom";
import createCustomer from "../images/createCustomer.jpg";
import viewCustomer from "../images/viewCustomer.jpg";
import useTokenExpire from "../useTokenExpire";
import "./EmployeeDashboard.css";

const CREATE_CUSTOMER_PATH = "/create-customer";
const VIEW_CUSTOMER_PATH = "/view-customer";

const EmployeeDashboard = () => {
  useTokenExpire();
  const navigate = useNavigate();

  const navigateToCreateCustomer = () => {
    navigate(CREATE_CUSTOMER_PATH);
  };

  const navigateToViewCustomer = () => {
    navigate(VIEW_CUSTOMER_PATH);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container">
          <a className="navbar-brand" href="#">
            ABCD BANK
          </a>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item active">
                <Link className="login-navigate" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container text-center emp-dash-cont">
        <div className="row">
          <div className="col-sm-4">
            <div className="border custom-border border-3 text-white p-3">
              <img
                className="img-fluid"
                src={createCustomer}
                alt="create customer image"
              />
              <button
                className="btn btn-primary w-100 mt-auto"
                onClick={navigateToCreateCustomer}
              >
                Create Customer
              </button>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="border custom-border border-3 text-white p-3">
              <img
                className="img-fluid"
                src={viewCustomer}
                alt="view customer image"
              />
              <button
                className="btn btn-primary w-100 mt-auto"
                onClick={navigateToViewCustomer}
              >
                View Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;
