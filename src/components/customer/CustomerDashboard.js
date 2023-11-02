import "./CustomerDashboard.css";
import { Link, useNavigate } from "react-router-dom";
import profile2 from "../images/profile2.jpg";
import transactions from "../images/transactions.jpg";
import transfer from "../images/transfer.jpg";
import withdraw from "../images/withdraw.jpg";
import useTokenExpire from "../useTokenExpire";
import React from "react";

const CustomerDashboard = ({ customerId, accountNo }) => {
  const navigate = useNavigate();
  useTokenExpire();

  const navigateToProfile = () => {
    navigate("/customer-profile", { state: { customerId } });
  };
  const navigateToTransactions = () => {
    navigate("/customer-transactions", { state: { customerId, accountNo } });
  };

  const navigateToWithdraw = () => {
    navigate("/customer-withdraw", { state: { accountNo } });
  };
  const navigateToTransfer = () => {
    navigate("/customer-transfer", { state: { accountNo } });
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

      <div className="container mt-5">
        <div className="text-container">
          <div className="jumbotron text-center">
            <h6 className="display-4 text-primary">
              Empowering Your Financial Journey, One Click at a Time.
            </h6>
            <p>
              Explore your accounts, manage transactions, and take control of
              your financial future with confidence.
            </p>
          </div>
        </div>
      </div>

      <div className="box-container">
        <div className="row">
          <div className="col-md-3">
            <div className="each-box p-3 d-flex flex-column p-3 border-2 ">
              <img className="img-fluid" src={profile2} alt="profile" />
              <button
                className="btn btn-primary w-100 mt-auto"
                onClick={navigateToProfile}
              >
                Profile
              </button>
            </div>
          </div>

          <div className="col-md-3">
            <div className="each-box p-3 d-flex flex-column p-3 border-2">
              <img
                className="img-fluid"
                src={transactions}
                alt="transactions"
              />
              <button
                className="btn btn-primary w-100 mt-auto"
                onClick={navigateToTransactions}
              >
                Transactions
              </button>
            </div>
          </div>

          <div className="col-md-3">
            <div className="each-box p-3 d-flex flex-column p-3 border-2">
              <img className="img-fluid" src={withdraw} alt="withdraw" />
              <button
                className="btn btn-primary w-100 mt-auto"
                onClick={navigateToWithdraw}
              >
                Withdraw
              </button>
            </div>
          </div>

          <div className="col-md-3">
            <div className="each-box p-3 d-flex flex-column p-3 border-2">
              <img className="img-fluid" src={transfer} alt="transfer" />
              <button
                className="btn btn-primary w-100 mt-auto"
                onClick={navigateToTransfer}
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
