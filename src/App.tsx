import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LazyLoadComponent from "./components/LazyLoadComponent";
import WebProtectedRoute from "./hoc/WebProtectedRoute";
import LoginContainer from "./containers/LoginContainer";
import SignUpContainer from "./containers/SignUpContainer";

const EventContainer = React.lazy(() => import("./containers/EventContainer"));

function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginContainer />} />
      <Route path="signup" element={<SignUpContainer />} />
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
