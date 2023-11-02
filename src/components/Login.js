import "./Login.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import login from "../components/images/login.jpeg";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginRequest = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8084/login",
        loginRequest
      );
      if (response.data != null) {
        localStorage.setItem("token", response.data.authToken);
      }

      if (response.data.role === "EMPLOYEE") {
        navigate("/employee-dashboard");
      } else if (response.data.role === "CUSTOMER") {
        localStorage.setItem("customerId", response.data.userid);
        navigate("/customer-dashboard");
      }
    } catch (error) {
      setErrorMessage("Incorrect credentials. Please try again.");
      setUsername("");
      setPassword("");
    }
  };

  const handleInputChange = () => {
    setErrorMessage("");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container">
          <a className="navbar-brand" href="#">
            ABCD BANK
          </a>
        </div>
      </nav>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img className="img-fluid" src={login} alt="login" />
            </div>
            <div className="login-box col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form className="login-form">
                <div className="text-center">
                  <h3 className="mb-5 login-heading">Login</h3>
                </div>
                {errorMessage && (
                  <p className="text-danger mt-3">{errorMessage}</p>
                )}
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form1Example13"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      handleInputChange();
                    }}
                  />
                  <label className="form-label">Username</label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      handleInputChange();
                    }}
                  />

                  <label className="form-label">Password</label>
                </div>

                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-lg text-uppercase "
                    type="submit"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
