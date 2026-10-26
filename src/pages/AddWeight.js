import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddWeight() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const getTodayDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const addWeight = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!user || !user.id) {
      setError("Please login first.");
      return;
    }

    const weightValue = Number(weight);

    if (!weight || !Number.isFinite(weightValue) || weightValue <= 0) {
      setError("Please enter a valid weight.");
      return;
    }

    setLoading(true);

    try {
      const currentDate = getTodayDate();

      // Fetch all weight records
      const response = await fetch("http://localhost:5000/weights");

      if (!response.ok) {
        throw new Error("Failed to fetch weight records");
      }

      const allWeights = await response.json();

      // Check whether this user has already added weight today
      const alreadyAddedToday = allWeights.some(
        (item) =>
          String(item.userId) === String(user.id) &&
          item.date === currentDate
      );

      if (alreadyAddedToday) {
        setError("You can add only one weight per day.");
        return;
      }

      const now = new Date();

      const addResponse = await fetch("http://localhost:5000/weights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: String(user.id),
          weight: weightValue,
          date: currentDate,
          time: now.toLocaleTimeString(),
        }),
      });

      if (!addResponse.ok) {
        throw new Error("Failed to save weight");
      }

      setSuccess("Weight added successfully!");
      setWeight("");

      setTimeout(() => {
        navigate("/weights");
      }, 1000);
    } catch (err) {
      console.error("Add Weight Error:", err);
      setError(
        "Unable to connect to the server. Please check JSON Server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Add Weight</h2>

              {error && (
                <div className="alert alert-danger">{error}</div>
              )}

              {success && (
                <div className="alert alert-success">{success}</div>
              )}

              <form onSubmit={addWeight}>
                <div className="mb-3">
                  <label className="form-label">Weight (kg)</label>

                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    className="form-control"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter weight in kg"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Current Date</label>

                  <input
                    type="date"
                    className="form-control"
                    value={getTodayDate()}
                    readOnly
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Add Weight"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddWeight;
