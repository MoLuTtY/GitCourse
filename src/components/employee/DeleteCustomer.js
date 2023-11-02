import EmployeeHeader from "./EmployeeHeader";
import "./DeleteCustomer.css";
import ViewCustomerHeader from "./ViewCustomerHeader";
import deleteCustomer from "../images/deleteCustomer.jpg";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import SuccessAlert from "../SuccessAlert";
import axios from "axios";
import useTokenExpire from "../useTokenExpire";

const DeleteCustomer = () => {
  const navigate = useNavigate("");
  const location = useLocation();

  const accountNo = location.state && location.state.accountNo;
  const [successAlert, setSuccessAlert] = useState(false);
  const [customerId, setCustomerId] = useState("");

  const token = localStorage.getItem("token");
  useTokenExpire();

  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8090/api/accounts/get-customerId/${accountNo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setCustomerId(data);
      } catch (error) {
        console.error("Error fetching customerId:", error);
      }
    };

    fetchCustomerId();
  }, [accountNo]);

  const deleteCustomerSubmitHandler = async (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      "Are you sure you want to delete all accounts with this account number?"
    );

    if (isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:8080/api/customers/delete-customer/${customerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuccessAlert(true);
      } catch (error) {
        console.error("Error deleting accounts:", error);
      }
    }
  };

  const closeAlert = () => {
    setSuccessAlert(false);
    navigate("/view-customer");
  };

  return (
    <>
      <ViewCustomerHeader></ViewCustomerHeader>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 ">
            <img src={deleteCustomer} alt="Image 1" className="img-fluid" />
          </div>
          <div className="form-box form-delete col-md-4 mt-5">
            <div className="container mt-3">
              <h2 className="heading-delete">Delete Customer</h2>
              <form onSubmit={deleteCustomerSubmitHandler}>
                <div className="form-group mb-4">
                  <label>Account No</label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputB"
                    required
                    placeholder="Enter account no"
                    value={accountNo}
                    disabled
                    style={{ color: "#999" }}
                  />
                </div>

                <div className="form-group ">
                  <button
                    type="submit"
                    className="btn btn-primary button-space mt-3"
                  >
                    Delete
                  </button>
                  {successAlert && (
                    <SuccessAlert
                      message={"Customer deleted successfully!"}
                      onClose={closeAlert}
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCustomer;
