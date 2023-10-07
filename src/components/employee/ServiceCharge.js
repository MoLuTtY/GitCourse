import EmployeeHeader from "./EmployeeHeader";
import "./ServiceCharge.css";
import ViewCustomerHeader from "./ViewCustomerHeader";
import serviceCharge2 from "../images/serviceCharge2.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import SuccessAlert from "../SuccessAlert";
import { useState } from "react";
import NoServiceChargeAlert from "../NoServiceChargeAlert";
import ServiceChargeAlreadyDeducted from "../ServiceChargeAlreadyDeducted";
import axios from "axios";

const ServiceCharge = ({ customerData }) => {
  const navigate = useNavigate("");
  const location = useLocation();

  const accountNo = location.state && location.state.accountNo;
  const accountType = location.state && location.state.accountType;
  console.log("from service charge");
  console.log(customerData);
  console.log(accountNo);
  console.log(accountType);

  const [successAlert, setSuccessAlert] = useState(false);
  const [noServiceChargeAlert, setNoServiceChargeAlert] = useState(false);
  const [deductedAlert, setDeductedAlert] = useState(false);

  const deductServiceChargeHandler = async (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      "Are you sure you want to deduct the service charge?"
    );

    if (isConfirmed) {
      console.log("Searching for customer...");

      try {
        const response = await axios.get(
          `http://localhost:8060/api/rules/service-charge/${accountNo}/${accountType}`
        );

        if (response.status === 200) {
          const responseData = response.data;
          console.log("Response from server:", responseData);

          if (responseData.serviceCharge === 100) {
            console.log("Service charge deducted: Rs.100");
            console.log("Account No", accountNo);
            setSuccessAlert(true);
          } else if (
            responseData.serviceCharge === 0 &&
            responseData.reference === "Already deducted"
          ) {
            console.log("service charge already deducted");
            setDeductedAlert(true);
          } else {
            console.log("No service charge");
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
    <div>
      <ViewCustomerHeader></ViewCustomerHeader>
      <div class="container mt-4">
        <div class="row">
          <div class="col-md-6">
            <div class="p-4">
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
          <div class="col-md-6">
            <img src={serviceCharge2} alt="service charge" class="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCharge;
