const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("customerId");
  localStorage.removeItem("accountNo");
  window.location.href = "/login";
};

export default Logout;
