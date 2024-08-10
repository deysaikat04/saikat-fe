import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginContainer from "./containers/LoginContainer/LoginContainer";
import SignupContainer from "./containers/SignupContainer/SignupContainer";
import LazyLoadComponent from "./components/LazyLoadComponent";
import WebProtectedRoute from "./hoc/WebProtectedRoute";

const EventContainer = React.lazy(() => import("./containers/EventContainer"));

function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginContainer />} />
      <Route path="signup" element={<SignupContainer />} />
      <Route element={<WebProtectedRoute />}>
        <Route
          path="/events/*"
          element={<LazyLoadComponent Component={EventContainer} />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
