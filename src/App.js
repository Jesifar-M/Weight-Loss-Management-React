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
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/add-weight"
      element={
        <ProtectedRoute>
          <AddWeight />
        </ProtectedRoute>
      }
    />

    <Route
      path="/weights"
      element={
        <ProtectedRoute>
          <WeightList />
        </ProtectedRoute>
      }
    />

    <Route
      path="/edit-weight/:id"
      element={
        <ProtectedRoute>
          <EditWeight />
        </ProtectedRoute>
      }
    />

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
