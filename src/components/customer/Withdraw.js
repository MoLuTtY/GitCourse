import CustomerHeader from "./CustomerHeader";
import "./Withdraw.css";
import withdrawatm from "../images/withdrawatm.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuccessAlert from "../SuccessAlert";
import axios from "axios";
import { useLocation } from "react-router-dom";
import useTokenExpire from "../useTokenExpire";
import React from "react";

const Withdraw = () => {
  const navigate = useNavigate("");

  const [enteredFromAccount, setFromAccount] = useState("SAVINGS");
  const [enteredAmount, setAmount] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [failureAlert, setFailureAlert] = useState(false);
  const [insufficientAlert, setInsufficientAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");

  const location = useLocation();
  const accountNo = location.state && location.state.accountNo;

  const token = localStorage.getItem("token");
  useTokenExpire();

  const fromAccountHandler = (event) => {
    setFromAccount(event.target.value);
  };
  const amountHandler = (event) => {
    setAmount(event.target.value);
  };

  useEffect(() => {
    fetch(
      `http://localhost:8090/api/accounts/current-balance/${accountNo}/${enteredFromAccount}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setCurrentBalance(data))
      .catch((error) => console.error("Error fetching data:", error));
  });

  const withdrawSubmitHandler = async (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm("Are you sure you want to withdraw?");

    if (isConfirmed) {
      const selectedAccountType = enteredFromAccount;
      const withdrawalAmount = enteredAmount;

      if (withdrawalAmount > currentBalance) {
        setInsufficientAlert(true);
      } else {
        try {
          await axios.post(
            `http://localhost:8090/api/accounts/withdraw/${accountNo}/${selectedAccountType}/${withdrawalAmount}`,
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setSuccessAlert(true);
        } catch (error) {
          setFailureAlert(true);
        }
      }
    }
  };

  const closeAlert = () => {
    setSuccessAlert(false);
    setFailureAlert(false);
    setInsufficientAlert(false);
    navigate("/customer-dashboard");
  };

  const withdrawCancelHandler = () => {
    setFromAccount("savings");
    setAmount("");
    setErrorMessage("");
  };
  return (
    <>
      <CustomerHeader></CustomerHeader>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img src={withdrawatm} alt="atm" className="img-fluid" />
          </div>

          <div className="form-box container-form-withdraw col-md-4 mt-5">
            <div className="container mt-3 ">
              <h2 className="heading-withdraw">Withdraw</h2>
              <form onSubmit={withdrawSubmitHandler}>
                <div className=" form-group mb-4">
                  <label>From Account</label>

                  <div className="input-group">
                    <select
                      className="form-select"
                      id="accountType"
                      name="accountType"
                      value={enteredFromAccount}
                      onChange={fromAccountHandler}
                    >
                      <option value="SAVINGS">SAVINGS</option>
                      <option value="CURRENT">CURRENT</option>
                    </select>
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label>Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputB"
                    placeholder="Enter amount"
                    required
                    value={enteredAmount}
                    onChange={amountHandler}
                  />
                </div>

                <div className="form-group ">
                  <button
                    type="submit"
                    className="btn btn-primary button-space"
                  >
                    Withdraw
                  </button>
                  {successAlert && (
                    <SuccessAlert
                      message={"Withdrawal successful!"}
                      onClose={closeAlert}
                    />
                  )}

                  {failureAlert && (
                    <SuccessAlert
                      message={
                        "Withdrawal not allowed due to Minimum Balance Rule!"
                      }
                      onClose={closeAlert}
                    />
                  )}

                  {insufficientAlert && (
                    <SuccessAlert
                      message={"Insufficient Fund!"}
                      onClose={closeAlert}
                    />
                  )}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={withdrawCancelHandler}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdraw;
