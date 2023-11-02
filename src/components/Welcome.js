import welcome from "../components/images/welcome.jpeg";
import "./Welcome.css";
import WelcomeHeader from "./WelcomeHeader";
import React from "react";

const Welcome = () => {
  return (
    <>
      <WelcomeHeader></WelcomeHeader>
      <div className="container2 mt-5">
        <div>
          <p className="welcome-text">
            Welcome to <strong>ABCD Bank</strong>
          </p>
          <p className="fingertips">Banking at your finger tips...!</p>
        </div>
        <img className="img-fluid" src={welcome} alt="Bank" />
      </div>
    </>
  );
};
export default Welcome;
