import CustomerHeader from "./CustomerHeader";
import "./Transactions.css";
import transactions2 from "../images/transactions2.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Transactions = () => {
  const [enteredFromDate, setFromDate] = useState("");
  const [enteredToDate, setToDate] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showTransaction, setShowTransaction] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  const location = useLocation();
  const customerId = location.state && location.state.customerId;
  const accountNo = location.state && location.state.accountNo;
  console.log("from trans", customerId);
  // console.log(typeof customerId);

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
          `http://localhost:8070/api/transactions/get-transactions/${customerId}`
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
  console.log("transactions", transactions);

  const viewTransactionsHandler = (e) => {
    e.preventDefault();

    setShowTransaction(false);
    setFilteredTransactions([]);

    axios

      .get(
        `http://localhost:8070/api/transactions/get-transactions/${customerId}/${enteredFromDate}/${enteredToDate}`
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

    console.log("filtered ", filteredTransactions);

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
    <div>
      <CustomerHeader></CustomerHeader>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8 p-4 mt-5">
            <h2 className="table-container mb-5 t-heading">Transactions</h2>

            <div class="container mt-5 " style={containerStyle}>
              <form
                class="row align-items-center trans-form"
                onSubmit={viewTransactionsHandler}
              >
                <div class="col-md-3 div-mr">
                  <label>Account No</label>
                  <input
                    type="text"
                    class="form-control "
                    required
                    placeholder="Account Number"
                    value={accountNo}
                    disabled
                    style={{ color: "#999" }}
                  />
                </div>
                <div class="col-md-3">
                  <label>Date From</label>
                  <input
                    type="date"
                    class="form-control"
                    required
                    onChange={dateFromHandler}
                  />
                </div>
                <div class="col-md-3">
                  <label>Date To</label>
                  <input
                    type="date"
                    class="form-control"
                    required
                    onChange={dateToHandler}
                  />
                </div>
                <div class="col-md-3 mt-4">
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

          <div class="col-md-4 img-container mt-5">
            <div class="p-1">
              <img src={transactions2} alt="transactions" class="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
