import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginContainer from "./containers/LoginContainer/LoginContainer";
import SignupContainer from "./containers/SignupContainer/SignupContainer";
import LazyLoadComponent from "./components/LazyLoadComponent";
import WebProtectedRoute from "./hoc/WebProtectedRoute";

const EventContainer = React.lazy(() => import("./containers/EventContainer"));
const EventDetails = React.lazy(
  () => import("./containers/EventDetailsContainer")
);

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
        {/* <Route
          path="/events/:id"
          element={<LazyLoadComponent Component={EventDetails} />}
        /> */}
      </Route>
    </Routes>
  );
}

export default App;
