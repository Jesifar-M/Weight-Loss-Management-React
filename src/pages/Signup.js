import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanName || !cleanEmail || !cleanPassword) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/users?email=${encodeURIComponent(cleanEmail)}`
      );

      if (!response.ok) {
        throw new Error("Unable to check existing users");
      }

      const existingUsers = await response.json();

      if (existingUsers.length > 0) {
        alert("Email already exists. Please login.");
        return;
      }

      const signupResponse = await fetch(
        "http://localhost:5000/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            password: cleanPassword
          })
        }
      );

      if (!signupResponse.ok) {
        throw new Error("Signup failed");
      }

      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
      alert(
        "Unable to connect to the server. Check whether JSON Server is running on port 5000."
      );
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card mx-auto p-4 shadow"
        style={{ maxWidth: "450px" }}
      >
        <h2 className="text-center mb-4">
          Weight Loss Management
        </h2>

        <h4 className="text-center mb-4">Signup</h4>

        <form onSubmit={signup}>
          <div className="mb-3">
            <label htmlFor="signup-name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="signup-name"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="signup-email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="signup-email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="signup-password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="signup-password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Signup
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;