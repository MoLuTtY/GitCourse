import EmployeeHeader from "./EmployeeHeader";
import "./DeleteCustomer.css";
import ViewCustomerHeader from "./ViewCustomerHeader";
import deleteCustomer from "../images/deleteCustomer.jpg";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import SuccessAlert from "../SuccessAlert";
import axios from "axios";

const DeleteCustomer = () => {
  const navigate = useNavigate("");

  const location = useLocation();

  const accountNo = location.state && location.state.accountNo;
  const [successAlert, setSuccessAlert] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const token = localStorage.getItem("token");

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
      console.log(customerId);
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
    <div>
      <ViewCustomerHeader></ViewCustomerHeader>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-6 ">
            <img src={deleteCustomer} alt="Image 1" class="img-fluid" />
          </div>
          <div className="form-box form-delete col-md-4 mt-5">
            <div class="container mt-3">
              <h2 className="heading-delete">Delete Customer</h2>
              <form onSubmit={deleteCustomerSubmitHandler}>
                <div class="form-group mb-4">
                  <label for="inputB">Account No</label>
                  <input
                    type="number"
                    class="form-control"
                    id="inputB"
                    required
                    placeholder="Enter account no"
                    value={accountNo}
                    disabled
                    style={{ color: "#999" }}
                  />
                </div>

                <div class="form-group ">
                  <button
                    type="submit"
                    class="btn btn-primary button-space mt-3"
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
    </div>
  );
};

export default DeleteCustomer;
