import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
let user = null;

try {
user = JSON.parse(localStorage.getItem("user"));
} catch (error) {
user = null;
}

return ( <div className="container mt-5"> <div className="card shadow p-4"> <div className="text-center"> <h1>Weight Loss Management</h1>

      <h3 className="mt-4">
        Welcome, {user?.name || "User"}!
      </h3>

      <p className="text-muted mt-3">
        Track your weight and monitor your progress.
      </p>
    </div>

    <div className="row mt-4 g-3 text-center">
      <div className="col-md-4">
        <div className="card h-100 p-3">
          <h5>Add Weight</h5>
          <p>Record your current weight.</p>
          <Link to="/add-weight" className="btn btn-primary">
            Add Weight
          </Link>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card h-100 p-3">
          <h5>Weight List</h5>
          <p>View, edit, and delete your records.</p>
          <Link to="/weights" className="btn btn-success">
            View Weights
          </Link>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card h-100 p-3">
          <h5>Find Weight Loss</h5>
          <p>Compare your weight between two dates.</p>
          <Link
            to="/find-weight-loss"
            className="btn btn-warning"
          >
            Find Weight Loss
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>

);
}

export default Dashboard;
