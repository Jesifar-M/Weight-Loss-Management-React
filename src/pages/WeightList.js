import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function WeightList() {
  const [weights, setWeights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;

  const fetchWeights = async () => {
    try {
      setLoading(true);
      setError("");

      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError("Please login first.");
        setWeights([]);
        return;
      }

      const user = JSON.parse(storedUser);

      if (!user.id) {
        setError("User ID not found. Please login again.");
        setWeights([]);
        return;
      }

      // Fetch all records, then filter by logged-in user
      const response = await fetch("http://localhost:5000/weights");

      if (!response.ok) {
        throw new Error("Unable to fetch weight records.");
      }

      const data = await response.json();

      const userWeights = data
        .filter(
          (item) => String(item.userId) === String(user.id)
        )
        .sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

      setWeights(userWeights);
    } catch (err) {
      console.error("Error fetching weights:", err);
      setError(
        "Unable to load weight records. Please make sure JSON Server is running on port 5000."
      );
      setWeights([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeights();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this weight record?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/weights/${encodeURIComponent(id)}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Delete failed.");
      }

      alert("Weight record deleted successfully!");
      await fetchWeights();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Unable to delete the record.");
    }
  };

  const handleEdit = async (item) => {
    const newWeight = window.prompt(
      "Enter the new weight in kg:",
      item.weight
    );

    if (newWeight === null) return;

    const parsedWeight = Number(newWeight);

    if (
      newWeight.trim() === "" ||
      !Number.isFinite(parsedWeight) ||
      parsedWeight <= 0
    ) {
      alert("Please enter a valid weight.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/weights/${encodeURIComponent(item.id)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ weight: parsedWeight }),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed.");
      }

      alert("Weight updated successfully!");
      await fetchWeights();
    } catch (err) {
      console.error("Update error:", err);
      alert("Unable to update the weight.");
    }
  };

  const totalPages = Math.ceil(weights.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;

  const currentWeights = weights.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Weight List</h2>

        <Link to="/add-weight" className="btn btn-primary">
          + Add Weight
        </Link>
      </div>

      {loading && (
        <div className="alert alert-info">
          Loading weight records...
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
          <div className="mt-2">
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={fetchWeights}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {!loading && !error && weights.length === 0 && (
        <div className="alert alert-warning">
          No weight records found for your account.
        </div>
      )}

      {!loading && !error && weights.length > 0 && (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Sl. No.</th>
                  <th>Weight (kg)</th>
                  <th>Date</th>
                  <th>Added Time</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentWeights.map((item, index) => (
                  <tr key={item.id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{item.weight} kg</td>
                    <td>{item.date}</td>
                    <td>{item.time || "Not available"}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2 mb-1"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger mb-1"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <span>
              Showing {startIndex + 1}–
              {Math.min(startIndex + recordsPerPage, weights.length)} of{" "}
              {weights.length} records
            </span>

            <div>
              <button
                className="btn btn-outline-primary me-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
              >
                Previous
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                className="btn btn-outline-primary ms-2"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((page) => page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WeightList;
