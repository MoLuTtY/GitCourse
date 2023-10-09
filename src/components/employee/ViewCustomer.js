import EmployeeHeader from "./EmployeeHeader";
import "./ViewCustomer.css";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faTrash,
  faMinusSquare,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";

const ViewCustomer = () => {
  const navigate = useNavigate();
  const [enteredAccountNo, setAccountNo] = useState("");
  const [enteredAccountType, setAccountType] = useState("SAVINGS");
  const [searchResults, setSearchResults] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isServiceChargeHovered, setIsServiceChargeHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);

  const [customersDetailsSavings, setCustomersDetailsSavings] = useState([]);
  const [customerDetailsTable, setCustomerDetailsTable] = useState(false);
  const [searchCustomerTable, setSearchCustomerTable] = useState(false);
  const [notExist, setnotExist] = useState(false);

  useEffect(() => {
    fetch(
      "http://localhost:8080/api/customers/allCustomers-with-savings-account"
    )
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCustomersDetailsSavings(data);
          setCustomerDetailsTable(true);
        } else {
          setCustomerDetailsTable(true);
          console.error("Fetched data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, []);

  const sortedTransactions = customersDetailsSavings.sort(
    (a, b) => b.accountNo - a.accountNo
  );

  const searchCustomerHandler = async (e) => {
    e.preventDefault();
    setCustomerDetailsTable(false);
    setnotExist(false);

    try {
      const apiUrl = `http://localhost:8080/api/customers/search-customer/${enteredAccountNo}/${enteredAccountType}`;
      const response = await axios.get(apiUrl);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = response.data;

      if (Array.isArray(responseData)) {
        setSearchResults(responseData);
        setSearchCustomerTable(true);
      } else if (typeof responseData === "object") {
        setSearchResults([responseData]);
        setSearchCustomerTable(true);
      } else {
        console.error("API response is not an array or object:", responseData);
      }
    } catch (error) {
      setCustomerDetailsTable(false);
      setSearchCustomerTable(false);
      setnotExist(true);
      console.error("Error:", error);
    }
  };

  const depositHandler = (accountNo, accountType) => {
    // navigate("/deposit", { state: { accountNo, accountType } });
    navigate("/deposit", {
      state: { accountNo, accountType },
    });
    console.log(accountNo + " " + accountType);
  };

  const servicechargeHandler = (accountNo, accountType) => {
    navigate("/service-charge", {
      state: { accountNo, accountType },
    });
    console.log(accountNo + " " + accountType);
  };

  const deleteCustomerHandler = (accountNo) => {
    navigate("/delete-customer", { state: { accountNo } });
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "130px",
    },
    content: {
      textAlign: "center",
    },
    text: {
      fontSize: "44px",
      color: "rgb(76, 124, 197)",
    },

    formBackground: {
      backgroundColor: "rgba(3, 98, 252, 0.275)",
      paddingTop: "25px",
      paddingBottom: "25px",
      paddingLeft: "130px",
      borderRadius: "0.5em",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.09)",
    },
  };
  return (
    <div>
      <EmployeeHeader></EmployeeHeader>
      <div>
        <h2 className="view-cus-head mt-4 ">View Customer</h2>

        <div class="container col-sm-7 mt-5">
          <form
            class="row"
            style={styles.formBackground}
            onSubmit={searchCustomerHandler}
          >
            <div class="col-sm-4 form-group ">
              <label for="accountNo">Account No:</label>
              <input
                type="text"
                class="form-control"
                id="accountNo"
                name="accountNo"
                placeholder="Enter Account No"
                required
                onChange={(e) => setAccountNo(e.target.value)}
              />
            </div>
            <div class="col-sm-4 form-group">
              <label for="accountType">Account Type:</label>
              <div class="input-group">
                <select
                  class="form-select"
                  id="accountType"
                  name="accountType"
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  <option value="SAVINGS">SAVINGS</option>
                  <option value="CURRENT">CURRENT</option>
                </select>
              </div>
            </div>
            <div class="col-sm-4 mt-4">
              <button type="submit" class="btn btn-primary">
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="table-service-container">
          <div class="container mt-5 ">
            {customerDetailsTable && (
              <table class="table table-bordered table-striped text-center">
                <thead class="thead-dark">
                  <tr>
                    <th>Account No</th>
                    <th>Name</th>
                    <th>DOB</th>
                    <th>PAN</th>
                    <th>Address</th>
                    <th>Account type</th>
                    <th>Current Balance</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {sortedTransactions.map((customer) => (
                    <tr key={customer.id}>
                      <td className="align-middle">{customer.accountNo}</td>
                      <td className="align-middle">{customer.customerName}</td>
                      <td className="align-middle">{customer.dateOfBirth}</td>
                      <td className="align-middle">{customer.pan}</td>
                      <td className="align-middle">{customer.address}</td>
                      <td className="align-middle">{customer.accountType}</td>
                      <td className="align-middle">
                        &#x20B9;{customer.currentBalance}
                      </td>
                      <td>
                        <div className="custom-list-container">
                          <ul className="custom-list">
                            <li
                              className="icon-container"
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
                            >
                              <span
                                className="icon"
                                onClick={() =>
                                  depositHandler(
                                    customer.accountNo,
                                    customer.accountType
                                  )
                                }
                              >
                                <FontAwesomeIcon
                                  className="cursor"
                                  icon={faPlusSquare}
                                />
                                {isHovered && (
                                  <span className="text">Deposit</span>
                                )}
                              </span>
                            </li>

                            <li
                              className="icon-container"
                              onMouseEnter={() =>
                                setIsServiceChargeHovered(true)
                              }
                              onMouseLeave={() =>
                                setIsServiceChargeHovered(false)
                              }
                            >
                              <span
                                className={`icon ${
                                  isServiceChargeHovered ? "hovered" : ""
                                }`}
                                onClick={() =>
                                  servicechargeHandler(
                                    customer.accountNo,
                                    customer.accountType
                                  )
                                }
                              >
                                <FontAwesomeIcon
                                  icon={faMinusSquare}
                                  className="cursor"
                                />
                                {isServiceChargeHovered && (
                                  <span className="text">Service Charge</span>
                                )}
                              </span>
                            </li>

                            <li
                              className="icon-container"
                              onMouseEnter={() => setIsDeleteHovered(true)}
                              onMouseLeave={() => setIsDeleteHovered(false)}
                            >
                              <span
                                className={`icon ${
                                  isDeleteHovered ? "hovered" : ""
                                }`}
                                onClick={() =>
                                  deleteCustomerHandler(customer.accountNo)
                                }
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="cursor"
                                />
                                {isDeleteHovered && (
                                  <span className="text">Delete customer</span>
                                )}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/*  */}

        <div className="table-service-container">
          <div class="container mt-5 ">
            {searchCustomerTable && (
              <table class="table table-bordered table-striped text-center">
                <thead class="thead-dark">
                  <tr>
                    <th>Account No</th>
                    <th>Name</th>
                    <th>DOB</th>
                    <th>PAN</th>
                    <th>Address</th>
                    <th>Account type</th>
                    <th>Current Balance</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {searchResults.map((responseData) => (
                    <tr key={responseData.accountNo}>
                      <td className="align-middle">{responseData.accountNo}</td>
                      <td className="align-middle">
                        {responseData.customerName}
                      </td>
                      <td className="align-middle">
                        {responseData.dateOfBirth}
                      </td>
                      <td className="align-middle">{responseData.pan}</td>
                      <td className="align-middle">{responseData.address}</td>
                      <td className="align-middle">
                        {responseData.accountType}
                      </td>
                      <td className="align-middle">
                        &#x20B9;{responseData.currentBalance}
                      </td>
                      <td>
                        <div className="custom-list-container">
                          <ul className="custom-list">
                            <li
                              className="icon-container"
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
                            >
                              <span
                                className="icon"
                                onClick={() =>
                                  depositHandler(
                                    responseData.accountNo,
                                    responseData.accountType
                                  )
                                }
                              >
                                <FontAwesomeIcon
                                  className="cursor"
                                  icon={faPlusSquare}
                                />
                                {isHovered && (
                                  <span className="text">Deposit</span>
                                )}
                              </span>
                            </li>

                            <li
                              className="icon-container"
                              onMouseEnter={() =>
                                setIsServiceChargeHovered(true)
                              }
                              onMouseLeave={() =>
                                setIsServiceChargeHovered(false)
                              }
                            >
                              <span
                                className={`icon ${
                                  isServiceChargeHovered ? "hovered" : ""
                                }`}
                                onClick={() =>
                                  servicechargeHandler(
                                    responseData.accountNo,
                                    responseData.accountType
                                  )
                                }
                              >
                                <FontAwesomeIcon
                                  icon={faMinusSquare}
                                  className="cursor"
                                />
                                {isServiceChargeHovered && (
                                  <span className="text">Service Charge</span>
                                )}
                              </span>
                            </li>

                            <li
                              className="icon-container"
                              onMouseEnter={() => setIsDeleteHovered(true)}
                              onMouseLeave={() => setIsDeleteHovered(false)}
                            >
                              <span
                                className={`icon ${
                                  isDeleteHovered ? "hovered" : ""
                                }`}
                                onClick={() =>
                                  deleteCustomerHandler(responseData.accountNo)
                                }
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="cursor"
                                />
                                {isDeleteHovered && (
                                  <span className="text">Delete customer</span>
                                )}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/*  */}
        {notExist && (
          <div style={styles.container}>
            <div style={styles.content}>
              <h1 style={styles.text}>Customer Does Not Exist</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCustomer;
