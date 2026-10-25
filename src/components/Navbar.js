import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = localStorage.getItem("loggedInUser");

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">

        <Link className="navbar-brand" to="/dashboard">
          Weight Loss Management
        </Link>

        {user && (
          <div>

            <Link
              className="btn btn-light me-2"
              to="/dashboard"
            >
              Dashboard
            </Link>

            <Link
              className="btn btn-light me-2"
              to="/add-weight"
            >
              Add Weight
            </Link>

            <Link
              className="btn btn-light me-2"
              to="/weights"
            >
              Weight List
            </Link>

            <Link
              className="btn btn-light me-2"
              to="/find-weight-loss"
            >
              Find Weight Loss
            </Link>

            <button
              className="btn btn-danger"
              onClick={logout}
            >
              Logout
            </button>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;