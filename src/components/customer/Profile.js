import CustomerHeader from "./CustomerHeader";
import "./Profile.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useTokenExpire from "../useTokenExpire";

const Profile = () => {
  const [customerData, setCustomerData] = useState([]);
  const customerId = localStorage.getItem("customerId");
  const token = localStorage.getItem("token");
  useTokenExpire();

  useEffect(() => {
    if (token && customerId) {
      fetch(`http://localhost:8080/api/customers/view-customer/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setCustomerData(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, []);

  return (
    <>
      <CustomerHeader></CustomerHeader>
      <div className="container mt-5">
        <h2 className="heading-text">Profile </h2>

        <table className="table table-bordered table-striped text-center">
          <thead className="thead-dark">
            <tr>
              <th>Account No</th>
              <th>Name</th>
              <th>Date Of Birth</th>
              <th>PAN</th>
              <th>Address</th>
              <th>Account Type</th>
              <th>Current Balance</th>
            </tr>
          </thead>

          <tbody>
            {customerData.map((customer) => (
              <tr key={customer.accountType}>
                <td className="align-middle">{customer.accountNo}</td>
                <td className="align-middle">{customer.name}</td>
                <td className="align-middle">{customer.dob}</td>
                <td className="align-middle">{customer.pan}</td>
                <td className="align-middle">{customer.address}</td>
                <td className="align-middle">{customer.accountType}</td>
                <td className="align-middle">
                  &#x20B9;{customer.currentBalance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Profile;
