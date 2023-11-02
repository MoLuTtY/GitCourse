import CustomerHeader from "./CustomerHeader";
import "./Transactions.css";
import transactions2 from "../images/transactions2.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import useTokenExpire from "../useTokenExpire";
import React from "react";

const Transactions = () => {
  const [enteredFromDate, setFromDate] = useState("");
  const [enteredToDate, setToDate] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showTransaction, setShowTransaction] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const token = localStorage.getItem("token");
  useTokenExpire();
  const customerId = localStorage.getItem("customerId");
  const accountNo = localStorage.getItem("accountNo");

  const dateFromHandler = (event) => {
    setFromDate(event.target.value);
  };

  const dateToHandler = (event) => {
    setToDate(event.target.value);
  };

  useEffect(() => {
    if (customerId != null) {
      axios
        .get(
          `http://localhost:8070/api/transactions/get-transactions/${customerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (Array.isArray(response.data)) {
            setTransactions(response.data);
          } else {
            setTransactions([response.data]);
          }
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
        });
    }
  }, [customerId]);

  const viewTransactionsHandler = (e) => {
    e.preventDefault();

    setShowTransaction(false);
    setFilteredTransactions([]);

    axios

      .get(
        `http://localhost:8070/api/transactions/get-transactions/${customerId}/${enteredFromDate}/${enteredToDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setFilteredTransactions(response.data);
        } else {
          setFilteredTransactions([response.data]);
        }
      })
      .catch((error) => {
        console.error("Error fetching filtered transactions:", error);
      });

    setShowFilter(true);
  };

  const containerStyle = {
    marginLeft: "60px",
    maxWidth: "910px",
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "90px",
    },
    content: {
      textAlign: "center",
    },
    text: {
      fontSize: "44px",
      color: "rgb(76, 124, 197)",
    },
  };

  return (
    <>
      <CustomerHeader></CustomerHeader>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 p-4 mt-5">
            <h2 className="table-container mb-5 t-heading">Transactions</h2>

            <div className="container mt-5 " style={containerStyle}>
              <form
                className="row align-items-center trans-form"
                onSubmit={viewTransactionsHandler}
              >
                <div className="col-md-3 div-mr">
                  <label>Account No</label>
                  <input
                    type="text"
                    className="form-control "
                    required
                    placeholder="Account Number"
                    value={accountNo}
                    disabled
                    style={{ color: "#999" }}
                  />
                </div>
                <div className="col-md-3">
                  <label>Date From</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    onChange={dateFromHandler}
                  />
                </div>
                <div className="col-md-3">
                  <label>Date To</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    onChange={dateToHandler}
                  />
                </div>
                <div className="col-md-3 mt-4">
                  <button className="btn btn-primary">View Transactions</button>
                </div>
              </form>
            </div>

            <div className="table-responsive table-container mt-5">
              <table className="table table-bordered text-center table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Source Account</th>
                    <th>Target Account</th>
                    <th>Withdraw</th>
                    <th>Transfer</th>
                    <th>Deposit</th>
                    <th>Closing Balance</th>
                  </tr>
                </thead>
                {showTransaction && (
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={index}>
                        <td>{transaction.transactionDate}</td>
                        <td>{transaction.sourceAccountType}</td>
                        <td>{transaction.targetAccountNo}</td>
                        <td>{transaction.withdrawalAmount}</td>
                        <td>{transaction.transferAmount}</td>
                        <td>{transaction.depositAmount}</td>
                        <td>&#x20B9;{transaction.closingBalance}</td>
                      </tr>
                    ))}
                  </tbody>
                )}

                {showFilter && (
                  <tbody>
                    {filteredTransactions.map((transaction, index) => (
                      <tr key={index}>
                        <td>{transaction.transactionDate}</td>
                        <td>{transaction.sourceAccountType}</td>
                        <td>{transaction.targetAccountNo}</td>
                        <td>{transaction.withdrawalAmount}</td>
                        <td>{transaction.transferAmount}</td>
                        <td>{transaction.depositAmount}</td>
                        <td>&#x20B9;{transaction.closingBalance}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>

          <div className="col-md-4 img-container mt-5">
            <div className="p-1">
              <img
                src={transactions2}
                alt="transactions"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
