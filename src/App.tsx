import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginContainer from "./containers/LoginContainer/LoginContainer";
import SignupContainer from "./containers/SignupContainer/SignupContainer";
import LazyLoadComponent from "./components/LazyLoadComponent";

const EventContainer = React.lazy(
  () => import("./containers/EventContainer/EventContainer")
);

function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginContainer />} />
      <Route path="signup" element={<SignupContainer />} />
      <Route
        path="/events/*"
        element={<LazyLoadComponent Component={EventContainer} />}
      />
    </Routes>
  );
}

export default App;
