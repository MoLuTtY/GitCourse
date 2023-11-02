import "./Error.css";
import error from "./images/error.jpg";
import React from "react";

const Error = () => {
  return (
    <>
      <div className="container">
        <div className="error-container">
          <h1 className="display-4">An Error Occurred</h1>
          <p className="lead">
            Sorry, we couldn't load this page at the moment
          </p>
          <img src={error} alt="Error Image" className="error" />
          <p className="mt-4">Please try again later</p>
        </div>
      </div>
    </>
  );
};

export default Error;
