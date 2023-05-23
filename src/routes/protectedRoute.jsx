import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function ProtectedRoute({ component }) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return component;
  }

  return <Navigate to="/login" />;
}
