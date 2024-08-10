import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginContainer from "./containers/LoginContainer/LoginContainer";
import SignupContainer from "./containers/SignupContainer/SignupContainer";
import LazyLoadComponent from "./components/LazyLoadComponent";
import WebProtectedRoute from "./hoc/WebProtectedRoute";

const EventContainer = React.lazy(
  () => import("./containers/EventContainer/EventContainer")
);
const EventDeatils = React.lazy(
  () => import("./containers/EventDetails/EventDeatils")
);

function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginContainer />} />
      <Route path="signup" element={<SignupContainer />} />
      <Route element={<WebProtectedRoute />}>
        {/* <Route
          path="/events/*"
          element={<LazyLoadComponent Component={EventContainer} />}
        /> */}
        <Route
          path="/events/*"
          element={<LazyLoadComponent Component={EventDeatils} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
