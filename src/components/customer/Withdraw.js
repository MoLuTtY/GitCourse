import CustomerHeader from "./CustomerHeader";
import "./Withdraw.css";
import withdrawatm from "../images/withdrawatm.jpg";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import SuccessAlert from "../SuccessAlert";
import axios from "axios";
import { useLocation } from "react-router-dom";

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

  const fromAccountHandler = (event) => {
    setFromAccount(event.target.value);
  };
  const amountHandler = (event) => {
    setAmount(event.target.value);
  };

  useEffect(() => {
    fetch(
      `http://localhost:8090/api/accounts/current-balance/${accountNo}/${enteredFromAccount}`
    )
      .then((response) => response.json())
      .then((data) => setCurrentBalance(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
            `http://localhost:8090/api/accounts/withdraw/${accountNo}/${selectedAccountType}/${withdrawalAmount}`
          );

          setSuccessAlert(true);
          console.log("Withdraw successful");
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
    <div>
      <CustomerHeader></CustomerHeader>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-6">
            <img src={withdrawatm} alt="atm" class="img-fluid" />
          </div>

          <div class="form-box container-form-withdraw col-md-4 mt-5">
            <div class="container mt-3 ">
              <h2 className="heading-withdraw">Withdraw</h2>
              <form onSubmit={withdrawSubmitHandler}>
                <div class=" form-group mb-4">
                  <label for="selectA">From Account</label>

                  <div class="input-group">
                    <select
                      class="form-select"
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

                <div class="form-group mb-4">
                  <label for="inputB">Amount</label>
                  <input
                    type="number"
                    class="form-control"
                    id="inputB"
                    placeholder="Enter amount"
                    required
                    value={enteredAmount}
                    onChange={amountHandler}
                  />
                </div>

                <div class="form-group ">
                  <button type="submit" class="btn btn-primary button-space">
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
                    class="btn btn-secondary"
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
    </div>
  );
};

export default Withdraw;
