import CustomerHeader from "./CustomerHeader";
import "./Withdraw.css";
import withdrawatm from "../images/withdrawatm.jpg";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import SuccessAlert from "../SuccessAlert";
import axios from "axios";

const Withdraw = () => {
  const navigate = useNavigate("");

  const [enteredFromAccount, setFromAccount] = useState("SAVINGS");
  const [enteredAmount, setAmount] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [failureAlert, setFailureAlert] = useState(false);
  const [insufficientAlert, setInsufficientAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");

  const fromAccountHandler = (event) => {
    setFromAccount(event.target.value);
  };
  const amountHandler = (event) => {
    setAmount(event.target.value);
  };

  useEffect(() => {
    fetch(
      `http://localhost:8090/api/accounts/current-balance/1000001/${enteredFromAccount}`
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

      console.log(selectedAccountType);
      console.log(withdrawalAmount);

      // if (withdrawalAmount > currentBalance) {
      //   setErrorMessage("Withdrawal amount exceeds current balance");
      //   return;
      // }

      if (withdrawalAmount > currentBalance) {
        setInsufficientAlert(true);
      } else {
        try {
          await axios.post(
            `http://localhost:8090/api/accounts/withdraw/1000001/${selectedAccountType}/${withdrawalAmount}`
          );

          // setErrorMessage("");
          setSuccessAlert(true);
          console.log("Withdraw successful");
        } catch (error) {
          setFailureAlert(true);
          console.error("Withdrawal error:", error);
          console.log("Response data:", error.response.data);
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
                {/* {errorMessage && <p className="text-danger">{errorMessage}</p>} */}
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
