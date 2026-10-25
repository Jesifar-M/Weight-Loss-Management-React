import React, { useState } from "react";

function FindWeightLoss() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const findWeightLoss = async (e) => {
    e.preventDefault();

    setError("");
    setResult(null);

    if (!fromDate || !toDate) {
      setError("Please select both dates.");
      return;
    }

    if (fromDate > toDate) {
      setError("From date cannot be greater than To date.");
      return;
    }

    try {
      // Get logged-in user using the same key as Login.js
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError("Please login first.");
        return;
      }

      const user = JSON.parse(storedUser);

      const response = await fetch(
        "http://localhost:5000/weights"
      );

      if (!response.ok) {
        throw new Error("Unable to fetch weight records.");
      }

      const allWeights = await response.json();

      // Get only the logged-in user's weight records
      const myWeights = allWeights.filter(
        (item) =>
          String(item.userId) === String(user.id)
      );

      // Filter records between selected dates
      const filteredWeights = myWeights
        .filter(
          (item) =>
            item.date >= fromDate &&
            item.date <= toDate
        )
        .sort(
          (a, b) =>
            new Date(a.date) - new Date(b.date)
        );

      if (filteredWeights.length < 2) {
        setError(
          "At least two weight records are required between the selected dates."
        );
        return;
      }

      const startingWeight = Number(
        filteredWeights[0].weight
      );

      const currentWeight = Number(
        filteredWeights[filteredWeights.length - 1].weight
      );

      const weightDifference =
        startingWeight - currentWeight;

      setResult({
        fromDate,
        toDate,
        startingWeight,
        currentWeight,
        weightDifference
      });
    } catch (err) {
      console.error("Find Weight Loss Error:", err);

      setError(
        "Unable to calculate weight loss. Please check whether JSON Server is running on port 5000."
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">
                Find Weight Loss
              </h2>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={findWeightLoss}>
                <div className="mb-3">
                  <label
                    htmlFor="fromDate"
                    className="form-label"
                  >
                    From Date
                  </label>

                  <input
                    id="fromDate"
                    type="date"
                    className="form-control"
                    value={fromDate}
                    onChange={(e) =>
                      setFromDate(e.target.value)
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="toDate"
                    className="form-label"
                  >
                    To Date
                  </label>

                  <input
                    id="toDate"
                    type="date"
                    className="form-control"
                    value={toDate}
                    onChange={(e) =>
                      setToDate(e.target.value)
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Find Weight Loss
                </button>
              </form>

              {result && (
                <div className="alert alert-success mt-4">
                  <h5>Weight Loss Result</h5>

                  <p>
                    From: <strong>{result.fromDate}</strong>
                  </p>

                  <p>
                    To: <strong>{result.toDate}</strong>
                  </p>

                  <p>
                    Starting Weight:{" "}
                    <strong>{result.startingWeight} kg</strong>
                  </p>

                  <p>
                    Current Weight:{" "}
                    <strong>{result.currentWeight} kg</strong>
                  </p>

                  <p>
                    {result.weightDifference > 0
                      ? "Weight Loss"
                      : result.weightDifference < 0
                      ? "Weight Gain"
                      : "No Weight Change"}
                    :{" "}
                    <strong>
                      {Math.abs(result.weightDifference)} kg
                    </strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindWeightLoss;
