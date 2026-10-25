import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditWeight() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWeight = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/weights/${id}`
        );

        const data = await response.json();

        setWeight(data.weight);
        setDate(data.date);
      } catch (error) {
        setError("Unable to load weight");
      }
    };

    loadWeight();
  }, [id]);

  const updateWeight = async (e) => {
    e.preventDefault();

    setError("");

    if (!weight) {
      setError("Please enter weight");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/weights/${id}`
      );

      const oldData = await response.json();

      await fetch(
        `http://localhost:5000/weights/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: oldData.userId,
            weight: Number(weight),
            date: date,
            time: oldData.time
          })
        }
      );

      navigate("/weights");

    } catch (error) {
      setError("Unable to update weight");
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow">

            <div className="card-body">

              <h2 className="mb-4">
                Edit Weight
              </h2>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={updateWeight}>

                <div className="mb-3">

                  <label className="form-label">
                    Weight (kg)
                  </label>

                  <input
                    type="number"
                    step="0.1"
                    className="form-control"
                    value={weight}
                    onChange={(e) =>
                      setWeight(e.target.value)
                    }
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Date
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={date}
                    readOnly
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Update
                </button>

                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() =>
                    navigate("/weights")
                  }
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