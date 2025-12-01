import React, { useState } from "react";
import { setToken } from "../utils/auth";
import "./Login.css";
import { API_BASE_URL } from "../config";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    city: "",
    interests: "",
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

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        age: formData.age ? parseInt(formData.age) : undefined,
        gender: formData.gender || undefined,
        city: formData.city || undefined,
        interests: formData.interests
          ? formData.interests.split(",").map((item) => item.trim())
          : [],
      };

      // ... inside component ...
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        alert(`Welcome to Unplan, ${data.user.name}!`);
        window.location.href = "/create-trip";
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
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
        <div className="auth-container" style={{ maxWidth: "550px" }}>
          <div className="auth-card">
            <h1 className="auth-title">Join Unplan</h1>
            <p className="auth-subtitle">Create an account to start your adventure</p>
            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit}>
              <label className="label">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="input"
                disabled={loading}
              />
              <label className="label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="input"
                disabled={loading}
              />
              <label className="label">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="input"
                disabled={loading}
              />
              <label className="label">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="input"
                disabled={loading}
              />

              <div style={{ marginTop: "20px", marginBottom: "10px" }}>
                <p style={{ fontSize: "13px", color: "#6b7280", fontStyle: "italic" }}>
                  Optional: Tell us more about yourself
                </p>
              </div>

              <label className="label">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Your age"
                className="input"
                disabled={loading}
              />

              <label className="label">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input"
                disabled={loading}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>

              <label className="label">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Your city"
                className="input"
                disabled={loading}
              />

              <label className="label">Interests (comma-separated)</label>
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="e.g., hiking, photography, food"
                className="input"
                disabled={loading}
              />

              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            <p className="auth-footer">
              Already have an account?{" "}
              <a href="/login" className="auth-link">
                Login here
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
