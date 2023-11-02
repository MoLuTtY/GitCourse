import Login from "./components/Login";
import Welcome from "./components/Welcome";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import Profile from "./components/customer/Profile";
import Transactions from "./components/customer/Transactions";
import Withdraw from "./components/customer/Withdraw";
import Transfer from "./components/customer/Transfer";
import CreateCustomer from "./components/employee/CreateCustomer";
import ViewCustomer from "./components/employee/ViewCustomer";
import Deposit from "./components/employee/Deposit";
import ServiceCharge from "./components/employee/ServiceCharge";
import DeleteCustomer from "./components/employee/DeleteCustomer";
import Error from "./components/Error";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Logout from "./components/Logout";

function App() {
  const [customerId, setCustomerId] = useState(null);
  const token = localStorage.getItem("token");

  const onLogin = (customerId) => {
    setCustomerId(customerId);
  };

  useEffect(() => {
    if (customerId !== null && token != null) {
      fetch(
        `http://localhost:8090/api/accounts/find-savings-accounts/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("accountNo", data.accountId.accountNo);
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
        });
    }
  }, [customerId]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/customer-profile" element={<Profile />} />
        <Route path="/customer-transactions" element={<Transactions />} />
        <Route path="/customer-withdraw" element={<Withdraw />} />
        <Route path="/customer-transfer" element={<Transfer />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/create-customer" element={<CreateCustomer />} />
        <Route path="/view-customer" element={<ViewCustomer />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/service-charge" element={<ServiceCharge />} />
        <Route path="/delete-customer" element={<DeleteCustomer />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
