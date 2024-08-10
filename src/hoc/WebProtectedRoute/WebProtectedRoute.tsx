import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { isLoggedInFromStore } from "../../store/auth/authSlice";
import Navbar from "../../components/Navbar";

function WebProtectedRoute({
  children,
}: {
  children?: React.ReactElement | undefined;
}) {
  const location = useLocation();
  const isLoggedIn = useAppSelector(isLoggedInFromStore);
  if (!isLoggedIn)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return !children ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    children
  );
}

export default WebProtectedRoute;
