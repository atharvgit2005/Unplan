import React, { useState } from "react";
import { setToken } from "../utils/auth";
import "./Login.css";
import { API_BASE_URL } from "../config";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");


    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        alert(`Welcome back, ${data.user.name}!`);
        window.location.href = "/create-trip";
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <header className="auth-topbar">
        <div className="auth-topbar-inner">
          <div className="logo">Unplan</div>
        </div>
      </header>
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-card">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Login to continue your adventure</p>
            {error && <div className="error-box">{error}</div>}
            <form onSubmit={handleSubmit}>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="input"
                disabled={loading}
              />

              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input"
                disabled={loading}
              />

              <button
                type="submit"
                className="auth-button"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="auth-footer">
              Don't have an account?{" "}
              <a href="/signup" className="auth-link">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
