import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddWeight from "./pages/AddWeight";
import WeightList from "./pages/WeightList";
import EditWeight from "./pages/EditWeight";
import FindWeightLoss from "./pages/FindWeightLoss";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Add Weight */}
        <Route
          path="/add-weight"
          element={
            <ProtectedRoute>
              <AddWeight />
            </ProtectedRoute>
          }
        />

        {/* Weight List */}
        <Route
          path="/weights"
          element={
            <ProtectedRoute>
              <WeightList />
            </ProtectedRoute>
          }
        />

        {/* Edit Weight */}
        <Route
          path="/edit-weight/:id"
          element={
            <ProtectedRoute>
              <EditWeight />
            </ProtectedRoute>
          }
        />

        {/* Find Weight Loss */}
        <Route
          path="/find-weight-loss"
          element={
            <ProtectedRoute>
              <FindWeightLoss />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;