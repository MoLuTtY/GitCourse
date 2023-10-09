// import "./Login.css";
// import { useNavigate } from "react-router-dom";
// import React, { useState } from "react";
// import login from "../components/images/login.jpeg";
// import axios from "axios";

// const Login = ({ onLogin }) => {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

// const loginRequest = {
//   username: username,
//   password: password,
// };

// const response = await axios.post(
//   "http://localhost:8084/login",
//   loginRequest
// );

//     if (response.data.role === "EMPLOYEE") {
//       navigate("/employee-dashboard");
//     } else if (response.data.role === "CUSTOMER") {
//       const customerId = response.data.userid;
//       console.log(customerId);
//       onLogin(customerId);
//       navigate("/customer-dashboard", { state: { customerId } });
//     } else {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-dark ">
//         <div className="container">
//           <a className="navbar-brand" href="#">
//             ABCD BANK
//           </a>
//         </div>
//       </nav>
//       <section className="vh-100">
//         <div className="container py-5 h-100">
//           <div className="row d-flex align-items-center justify-content-center h-100">
//             <div className="col-md-8 col-lg-7 col-xl-6">
//               <img className="img-fluid" src={login} alt="login" />
//             </div>
//             <div className="login-box col-md-7 col-lg-5 col-xl-5 offset-xl-1">
//               <form className="login-form">
//                 <div className="text-center">
//                   <h3 className="mb-5 login-heading">Login</h3>
//                 </div>
//                 <div className="form-outline mb-4">
//                   <input
//                     type="text"
//                     id="form1Example13"
//                     className="form-control form-control-lg"
//                     placeholder="Username"
//                     required
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                   />
//                   <label className="form-label" for="form1Example13">
//                     Username
//                   </label>
//                 </div>

//                 <div className="form-outline mb-4">
//                   <input
//                     type="password"
//                     id="form1Example23"
//                     className="form-control form-control-lg"
//                     placeholder="Password"
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />

//                   <label className="form-label" for="form1Example23">
//                     Password
//                   </label>
//                   {error && <p className="error">{error}</p>}
//                 </div>

//                 <div className="d-grid">
//                   <button
//                     className="btn btn-primary btn-lg text-uppercase "
//                     type="submit"
//                     onClick={handleLogin}
//                   >
//                     Login
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Login;

import "./Login.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import login from "../components/images/login.jpeg";
import axios from "axios";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginRequest = {
      username: username,
      password: password,
    };

    const response = await axios.post(
      "http://localhost:8084/login",
      loginRequest
    );
    if (response.data.role === "EMPLOYEE") {
      navigate("/employee-dashboard");
    } else if (response.data.role === "CUSTOMER") {
      // const customerData = [
      //   {
      //     accountNo: 1236603040001,
      //     name: "Amal Varma",
      //     dob: "3-4-1999",
      //     pan: "DGTRE2366P",
      //     address: "Abc house, Calicut, Kerala, 675453",
      //     accountType: "savings",
      //     currentBalance: 100,
      //   },
      //   {
      //     accountNo: 1236603040001,
      //     name: "Amal Varma",
      //     dob: "3-4-1999",
      //     pan: "DGTRE2366P",
      //     address: "Abc house, Calicut, Kerala, 675453",
      //     accountType: "current",
      //     currentBalance: 10000,
      //   },
      // ];

      // const transactionData = [
      //   {
      //     sourceAccountId: 1236603040001,
      //     sourceAccountType: "savings",
      //     targetAccountId: 1675504120002,
      //     amount: 100000,
      //     initiationDate: "2022-08-22",
      //   },
      //   {
      //     sourceAccountId: 236603040001,
      //     sourceAccountType: "savings",
      //     targetAccountId: 1358803100003,
      //     amount: 200000,
      //     initiationDate: "2023-06-12",
      //   },
      //   {
      //     sourceAccountId: 236603040001,
      //     sourceAccountType: "current",
      //     targetAccountId: 1675504120002,
      //     amount: 100000,
      //     initiationDate: "2022-07-22",
      //   },
      //   {
      //     sourceAccountId: 236603040001,
      //     sourceAccountType: "current",
      //     targetAccountId: 1358803100003,
      //     amount: 200000,
      //     initiationDate: "2023-04-12",
      //   },
      // ];

      // console.log("from login : ", customerData);
      // console.log("from login : ", transactionData);
      const customerId = response.data.userid;
      onLogin(customerId);
      console.log("from login", customerId);
      console.log("customer Login successful");
      navigate("/customer-dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
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
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form1Example13"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label className="form-label" for="form1Example13">
                    Username
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <label className="form-label" for="form1Example23">
                    Password
                  </label>
                  {error && <p className="error">{error}</p>}
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
    </div>
  );
};

export default Login;
