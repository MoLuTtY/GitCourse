import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function useTokenExpire() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp <= Date.now() / 1000) {
        const isConfirmed = window.confirm("Session expired! Login again");
        if (isConfirmed) {
          navigate("/Login");
        }
      }
    }
  }, []);

  return null;
}

export default useTokenExpire;
