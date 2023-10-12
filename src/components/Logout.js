import React from "react";
import Login from "./Login";

const Logout = () => {
  localStorage.removeItem("token");
  return <Login />;
};

export default Logout;
