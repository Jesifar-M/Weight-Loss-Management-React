import React from "react";

function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="container mt-5">

      <div className="text-center">

        <h1>
          Weight Loss Management
        </h1>

        <h3 className="mt-4">
          Welcome, {user?.name}
        </h3>

        <p className="text-muted">
          Track your weight and monitor your progress.
        </p>

      </div>

    </div>
  );
}

export default Dashboard;
