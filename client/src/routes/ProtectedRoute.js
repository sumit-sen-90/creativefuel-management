import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ path, element }) => {
  const isLoggedIn = localStorage.getItem("isLoggedin") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
