import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import CreateTrip from "./pages/createTrip";
import ExploreTrips from "./pages/exploreTrip";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { isAuthenticated } from "./utils/auth";

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/create-trip"
          element={
            <ProtectedRoute>
              <CreateTrip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore-trips"
          element={
            <ProtectedRoute>
              <ExploreTrips />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
