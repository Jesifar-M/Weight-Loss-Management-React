import React, { useState } from "react";

function FindWeightLoss() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setError("Please login first.");
      return;
    }

    let user;

    try {
      user = JSON.parse(storedUser);
    } catch {
      setError("Invalid login information. Please login again.");
      return;
    }

    if (!user?.id) {
      setError("User ID is missing. Please login again.");
      return;
    }

    setLoading(true);

    try {
      // Fetch all weight records from JSON Server
      const response = await fetch("http://localhost:5000/weights");

      if (!response.ok) {
        throw new Error("Unable to fetch weight records.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid weight data received.");
      }

      // Filter records for the logged-in user and selected dates
      const filteredWeights = data
        .filter((item) => {
          const sameUser =
            String(item.userId) === String(user.id);

          const validDate =
            typeof item.date === "string" &&
            item.date >= fromDate &&
            item.date <= toDate;

          return sameUser && validDate;
        })
        .sort((a, b) => a.date.localeCompare(b.date));

      console.log("Logged-in user:", user);
      console.log("Selected dates:", fromDate, toDate);
      console.log("Records returned by API:", data);
      console.log("Matching weight records:", filteredWeights);

      if (filteredWeights.length < 2) {
        setError(
          `Only ${filteredWeights.length} matching weight record(s) found. Please check the user ID and dates.`
        );
        return;
      }

      const startingWeight = Number(filteredWeights[0].weight);
      const currentWeight = Number(
        filteredWeights[filteredWeights.length - 1].weight
      );

      if (
        !Number.isFinite(startingWeight) ||
        !Number.isFinite(currentWeight)
      ) {
        setError("Invalid weight values found in the records.");
        return;
      }

      setResult({
        fromDate,
        toDate,
        startingWeight,
        currentWeight,
        weightDifference: startingWeight - currentWeight,
      });
    } catch (err) {
      console.error("Find Weight Loss Error:", err);
      setError(
        "Unable to calculate weight loss. Make sure JSON Server is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">
                Find Weight Loss
              </h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={findWeightLoss}>
                <div className="mb-3">
                  <label htmlFor="fromDate" className="form-label">
                    From Date
                  </label>

                  <input
                    id="fromDate"
                    type="date"
                    className="form-control"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="toDate" className="form-label">
                    To Date
                  </label>

                  <input
                    id="toDate"
                    type="date"
                    className="form-control"
                    value={toDate}
                    min={fromDate || undefined}
                    onChange={(e) => setToDate(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Calculating..." : "Find Weight Loss"}
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
