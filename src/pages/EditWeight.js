import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditWeight() {
const { id } = useParams();
const navigate = useNavigate();

const [weight, setWeight] = useState("");
const [date, setDate] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const user = JSON.parse(localStorage.getItem("user"));

useEffect(() => {
const loadWeight = async () => {
try {
if (!user || !user.id) {
navigate("/login");
return;
}

    const response = await fetch(
      `http://localhost:5000/weights/${encodeURIComponent(id)}`
    );

    if (!response.ok) {
      throw new Error("Weight record not found");
    }

    const data = await response.json();

    if (String(data.userId) !== String(user.id)) {
      setError("You cannot edit another user's weight.");
      return;
    }

    setWeight(String(data.weight));
    setDate(data.date);
  } catch (err) {
    setError("Unable to load weight. Please check JSON Server.");
  }
};

loadWeight();

}, [id, navigate, user]);

const updateWeight = async (e) => {
e.preventDefault();
setError("");

const weightValue = Number(weight);

if (!weight.trim() || !Number.isFinite(weightValue) || weightValue <= 0) {
  setError("Please enter a valid weight greater than zero.");
  return;
}

if (!user || !user.id) {
  navigate("/login");
  return;
}

setLoading(true);

try {
  const response = await fetch(
    `http://localhost:5000/weights/${encodeURIComponent(id)}`
  );

  if (!response.ok) {
    throw new Error("Weight record not found");
  }

  const oldData = await response.json();

  if (String(oldData.userId) !== String(user.id)) {
    setError("You cannot edit another user's weight.");
    return;
  }

  const updateResponse = await fetch(
    `http://localhost:5000/weights/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        weight: weightValue
      })
    }
  );

  if (!updateResponse.ok) {
    throw new Error("Update failed");
  }

  navigate("/weights");
} catch (err) {
  setError("Unable to update weight. Please check JSON Server.");
} finally {
  setLoading(false);
}

};

return ( <div className="container mt-5"> <div className="row justify-content-center"> <div className="col-md-5"> <div className="card shadow"> <div className="card-body"> <h2 className="mb-4 text-center">Edit Weight</h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={updateWeight}>
            <div className="mb-3">
              <label htmlFor="weight" className="form-label">
                Weight (kg)
              </label>

              <input
                id="weight"
                type="number"
                step="0.1"
                min="0.1"
                className="form-control"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>

              <input
                id="date"
                type="text"
                className="form-control"
                value={date}
                readOnly
              />
            </div>

            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>

            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => navigate("/weights")}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

);
}

export default EditWeight;
