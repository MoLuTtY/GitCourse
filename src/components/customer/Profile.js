import CustomerHeader from "./CustomerHeader";
import "./Profile.css";
import React, { useState } from "react";

const Profile = ({ customerData }) => {
  return (
    <div>
      <CustomerHeader></CustomerHeader>
      <div class="container mt-5">
        <h2 className="heading-text">Profile </h2>

        <table class="table table-bordered table-striped text-center">
          <thead class="thead-dark">
            <tr>
              <th>Account No</th>
              <th>Name</th>
              <th>DOB</th>
              <th>PAN</th>
              <th>Address</th>
              <th>Account Type</th>
              <th>Current Balance</th>
            </tr>
          </thead>

          <tbody>
            {customerData.map((customer) => (
              <tr key={customer.accountNo}>
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
    </div>
  );
};

export default Profile;
