import CustomerHeader from "./CustomerHeader";
import "./Transfer.css";
import transfer2 from "../images/transfer2.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessAlert from "../SuccessAlert";
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useTokenExpire from "../useTokenExpire";
import React from "react";

const Transfer = () => {
  const navigate = useNavigate("");
  const [enteredFromAccount, setFromAccount] = useState("SAVINGS");
  const [enteredTargetAccount, setTargetAccount] = useState("");
  const [enteredAmount, setAmount] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [insufficientAlert, setInsufficientAlert] = useState(false);
  const [currentBalance, setCurrentBalance] = useState("");
  const [failureAlert, setFailureAlert] = useState(false);
  const [targetAccountExist, setTargetAccountexist] = useState(true);
  const [targetAccountNotExistAlert, setTargetAccountNotExistAlert] =
    useState(false);
  const accountNo = localStorage.getItem("accountNo");
  const token = localStorage.getItem("token");
  useTokenExpire();

  const fromAccountHandler = (event) => {
    setFromAccount(event.target.value);
  };
  const targetAccountHandler = (event) => {
    setTargetAccount(event.target.value);
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
  }, [enteredFromAccount]);

  useEffect(() => {
    const apiUrl = `http://localhost:8090/api/accounts/account-exist/${enteredTargetAccount}/SAVINGS`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setTargetAccountexist(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [enteredTargetAccount]);

  const transferSubmitHandler = async (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm("Are you sure you want to transfer?");

    if (isConfirmed) {
      const transferData = {
        fromAccount: enteredFromAccount,
        targetAccount: enteredTargetAccount,
        amount: enteredAmount,
      };

      if (transferData.amount > currentBalance) {
        setInsufficientAlert(true);
      } else if (targetAccountExist === false) {
        setTargetAccountNotExistAlert(true);
      } else {
        try {
          const response = await axios.post(
            `http://localhost:8070/api/transactions/transfer/${accountNo}/${transferData.fromAccount}/${transferData.targetAccount}/${transferData.amount}`,
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
    setInsufficientAlert(false);
    setFailureAlert(false);
    setTargetAccountNotExistAlert(false);
    navigate("/customer-dashboard");
  };

  const transferCancelHandler = () => {
    setFromAccount("SAVINGS");
    setTargetAccount("");
    setAmount("");
  };

  return (
    <>
      <CustomerHeader></CustomerHeader>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img src={transfer2} alt="transfer" className="img-fluid" />
          </div>

          <div className="form-box container-form2 col-md-4 mt-5">
            <div className="container mt-3">
              <h2 className="heading2">Transfer</h2>
              <form onSubmit={transferSubmitHandler}>
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
                  <label>Target Account</label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputB"
                    required
                    value={enteredTargetAccount}
                    placeholder="Enter target account"
                    onChange={targetAccountHandler}
                  />
                </div>

                <div className="form-group mb-4">
                  <label>Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputB"
                    required
                    value={enteredAmount}
                    placeholder="Enter amount"
                    onChange={amountHandler}
                  />
                </div>
                <div className="form-group ">
                  <button
                    type="submit"
                    className="btn btn-primary button-space"
                  >
                    Transfer
                  </button>
                  {successAlert && (
                    <SuccessAlert
                      message={"Transfer successful!"}
                      onClose={closeAlert}
                    />
                  )}
                  {insufficientAlert && (
                    <SuccessAlert
                      message={"Insufficient Fund!"}
                      onClose={closeAlert}
                    />
                  )}
                  {failureAlert && (
                    <SuccessAlert
                      message={
                        "Transfer not allowed due to Minimum Balance Rule!"
                      }
                      onClose={closeAlert}
                    />
                  )}

                  {targetAccountNotExistAlert && (
                    <SuccessAlert
                      message={"Target Account doesnt exist!"}
                      onClose={closeAlert}
                    />
                  )}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={transferCancelHandler}
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

export default Transfer;
