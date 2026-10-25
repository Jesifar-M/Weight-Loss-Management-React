import React, { useEffect, useState } from "react";

function WeightList() {
  const [weights, setWeights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;

  // Get weights
  const fetchWeights = () => {
    fetch("http://localhost:5000/weights")
      .then((response) => response.json())
      .then((data) => setWeights(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchWeights();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this weight?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await fetch(`http://localhost:5000/weights/${id}`, {
        method: "DELETE",
      });

      fetchWeights();

      // If last item of a page is deleted
      if (
        currentPage > 1 &&
        (weights.length - 1) <= (currentPage - 1) * recordsPerPage
      ) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Edit
  const handleEdit = async (weight) => {
    const newWeight = prompt(
      "Enter new weight:",
      weight.weight
    );

    if (newWeight === null || newWeight.trim() === "") {
      return;
    }

    try {
      await fetch(`http://localhost:5000/weights/${weight.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weight: newWeight,
        }),
      });

      fetchWeights();
    } catch (error) {
      console.log(error);
    }
  };

  // Pagination
  const totalPages = Math.ceil(
    weights.length / recordsPerPage
  );

  const startIndex =
    (currentPage - 1) * recordsPerPage;

  const currentWeights = weights.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4">
        Weight List
      </h2>

      {currentWeights.length === 0 ? (
        <p className="text-center">
          No weight records found.
        </p>
      ) : (
        currentWeights.map((item, index) => (
          <div
            className="card mb-3 p-3"
            key={item.id}
          >
            <div className="row align-items-center">

              <div className="col-md-6">
                <h5>
                  {startIndex + index + 1}.{" "}
                  {item.weight} kg
                </h5>

                <p className="mb-1">
                  Date: {item.date}
                </p>

                <p className="mb-0">
                  Time: {item.time}
                </p>
              </div>

              <div className="col-md-6 text-md-end mt-3 mt-md-0">

                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))
      )}

      {/* Pagination */}

      {totalPages > 0 && (
        <div className="d-flex justify-content-center align-items-center gap-2 mt-4">

          <button
            className="btn btn-secondary"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => (
              <button
                key={index}
                className={
                  currentPage === index + 1
                    ? "btn btn-dark"
                    : "btn btn-primary"
                }
                onClick={() =>
                  setCurrentPage(index + 1)
                }
              >
                {index + 1}
              </button>
            )
          )}

          <button
            className="btn btn-secondary"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
}

export default WeightList;