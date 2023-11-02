import EmployeeHeader from "./EmployeeHeader";
import "./ServiceCharge.css";
import ViewCustomerHeader from "./ViewCustomerHeader";
import serviceCharge2 from "../images/serviceCharge2.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import SuccessAlert from "../SuccessAlert";
import React, { useState } from "react";
import NoServiceChargeAlert from "../NoServiceChargeAlert";
import ServiceChargeAlreadyDeducted from "../ServiceChargeAlreadyDeducted";
import axios from "axios";
import useTokenExpire from "../useTokenExpire";

const ServiceCharge = ({ customerData }) => {
  const navigate = useNavigate("");
  const location = useLocation();

  const accountNo = location.state && location.state.accountNo;
  const accountType = location.state && location.state.accountType;

  const [successAlert, setSuccessAlert] = useState(false);
  const [noServiceChargeAlert, setNoServiceChargeAlert] = useState(false);
  const [deductedAlert, setDeductedAlert] = useState(false);

  const token = localStorage.getItem("token");
  useTokenExpire();

  const deductServiceChargeHandler = async (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      "Are you sure you want to deduct the service charge?"
    );

    if (isConfirmed) {
      try {
        const response = await axios.get(
          `http://localhost:8060/api/rules/service-charge/${accountNo}/${accountType}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const responseData = response.data;

          if (responseData.serviceCharge === 100) {
            setSuccessAlert(true);
          } else if (
            responseData.serviceCharge === 0 &&
            responseData.reference === "Already deducted"
          ) {
            setDeductedAlert(true);
          } else {
            setNoServiceChargeAlert(true);
          }
        } else {
          console.error("Server responded with an error:", response.status);
        }
      } catch (error) {
        console.error("Error while making the request:", error);
      }
    }
  };

  const closeAlert = () => {
    setSuccessAlert(false);
    setNoServiceChargeAlert(false);
    setDeductedAlert(false);
    navigate("/view-customer");
  };

  return (
    <>
      <ViewCustomerHeader></ViewCustomerHeader>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="p-4">
              <h2 className="mt-5 service-head mb-4">
                Service Charge Deduction
              </h2>
              <p className="mt-5 deduct-quote">
                Service charge will be deducted for not maintaining minimum
                balance
              </p>

              <form>
                <div>
                  <button
                    className="btn btn-primary text-center mt-3 "
                    onClick={deductServiceChargeHandler}
                  >
                    Deduct service charge
                  </button>
                  {successAlert && (
                    <SuccessAlert
                      message="Service charge Rs.100 deducted successfully!"
                      onClose={closeAlert}
                    />
                  )}
                  {noServiceChargeAlert && (
                    <NoServiceChargeAlert
                      message="Great News! No Service Charge Deduction Required "
                      onClose={closeAlert}
                    />
                  )}
                  {deductedAlert && (
                    <ServiceChargeAlreadyDeducted
                      message="Service charge already deducted for this Month ! "
                      onClose={closeAlert}
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <img
              src={serviceCharge2}
              alt="service charge"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCharge;
