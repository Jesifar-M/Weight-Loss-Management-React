import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      const response = await fetch(
        "http://localhost:5000/users?email=" +
          encodeURIComponent(cleanEmail)
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const users = await response.json();

      const loggedInUser = users.find(
        (user) => user.password === cleanPassword
      );

      if (!loggedInUser) {
        setError("Invalid email or password");
        return;
      }

      localStorage.setItem("user", JSON.stringify(loggedInUser));

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Cannot connect to server. Please check JSON Server.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">
              Weight Loss Management
            </h2>

            <h4 className="text-center mb-4">Login</h4>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="login-email" className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  id="login-email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="login-password" className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  id="login-password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Login
              </button>
            </form>

            <p className="text-center mt-3">
              Don't have an account?{" "}
              <Link to="/signup">Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;