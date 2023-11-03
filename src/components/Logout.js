import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("accountNo");
    localStorage.removeItem("customerId");
    localStorage.removeItem("authenticated");
    navigate("/login");
  }, [navigate]);
};

export default Logout;
