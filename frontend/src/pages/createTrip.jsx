import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./create-trip.css";
import { getUserFromToken, removeToken } from "../utils/auth"
import { API_BASE_URL } from "../config";
import defaultPreview from "./Add destination preview.png";

export default function CreateTrip() {
  const [currentUser, setCurrentUser] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const [trip, setTrip] = useState({
    title: "",
    destination: "",
    startDate: null,
    endDate: null,
    description: "",
    budget: "",
    maxMembers: "",
    category: "",
  });


  useEffect(() => {
    const user = getUserFromToken();
    if (user) {
      setCurrentUser(user);
    }
  }, []);


  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      removeToken();
      window.location.href = "/login";
    }
  };

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("You must be logged in to create a trip.");
      return;
    }

    const formData = new FormData();
    formData.append("title", trip.title);
    formData.append("destination", trip.destination);
    formData.append("startDate", trip.startDate);
    formData.append("endDate", trip.endDate);
    formData.append("description", trip.description);
    formData.append("budget", trip.budget);
    formData.append("maxMembers", trip.maxMembers);
    formData.append("category", trip.category);
    formData.append("createdBy", currentUser.userId);

  
    if (fileInputRef.current && fileInputRef.current.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    try {
      await fetch(`${API_BASE_URL}/api/trips`, {
        method: "POST",
        body: formData,
      });

      alert("Trip created successfully");
    } catch (err) {
      alert("Error creating trip");
    }
  };

  return (
    <div className="create-page">
      <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">Unplan</span>
        </div>

        <div className="nav-links">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/explore-trips">Trips</Link>
          <span className="nav-link">Create Trip</span>
          <Link className="nav-link signup-btn" to="/explore-trips">Join Trip</Link>
        </div>
      </div>
    </nav>

      <main className="main">
        <div className="main-inner">
          <h1 className="headline">
            Fill in the details below to create your adventure
          </h1>

          <div className="grid-layout">
            <div className="left-column">
              <section className="card">
                <h2 className="card-title blue"> Destination & Dates</h2>
                <p className="card-subtitle">Where are you heading?</p>

                <label className="label">Trip Title</label>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  placeholder="e.g., Summer Escape to Goa"
                  className="input"
                />

                <label className="label">Destination</label>
                <input
                  type="text"
                  name="destination"
                  onChange={handleChange}
                  placeholder="e.g., Goa, Bali, Indonesia"
                  className="input"
                />

                <div className="row">
                  <div>
                    <label className="label">Start Date</label>
                    <DatePicker
                      selected={trip.startDate}
                      onChange={(date) => setTrip({ ...trip, startDate: date })}
                      dateFormat="yyyy-MM-dd"
                      className="input"
                      placeholderText="Select start date"
                    />
                  </div>

                  <div>
                    <label className="label">End Date</label>
                    <DatePicker
                      selected={trip.endDate}
                      onChange={(date) => setTrip({ ...trip, endDate: date })}
                      dateFormat="yyyy-MM-dd"
                      className="input"
                      placeholderText="Select end date"
                    />
                  </div>
                </div>
              </section>

              <section className="card">
                <h2 className="card-title orange">Trip Details</h2>
                <p className="card-subtitle">Tell us more about it</p>

                <label className="label">Description</label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  placeholder="Describe your adventure…"
                  className="textarea"
                />

                <label className="label">Category</label>
                <select
                  name="category"
                  className="input"
                  value={trip.category}
                  onChange={handleChange}
                >
                  <option value="">Select category</option>
                  <option value="adventure">Adventure</option>
                  <option value="trekking">Trekking</option>
                  <option value="beach">Beach</option>
                  <option value="cultural">Cultural</option>
                  <option value="spiritual">Spiritual</option>
                  <option value="family">Family</option>
                </select>

                <div className="row">
                  <div>
                    <label className="label">Budget</label>
                    <input
                      type="number"
                      name="budget"
                      placeholder="e.g., 50000"
                      onChange={handleChange}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="label">Max Members</label>
                    <input
                      type="number"
                      name="maxMembers"
                      placeholder="e.g., 5"
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                </div>
              </section>
            </div>

            <aside className="card preview">
              <h2 className="card-title preview-title"> Trip Preview</h2>

              <div
                className="preview-banner"
                style={{
                  backgroundColor: "white",
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative"
                }}
                onClick={() => fileInputRef.current.click()}
              >
                <img
                  src={previewImage || defaultPreview}
                  alt="Destination Preview"
                  style={{
                    width: previewImage ? "100%" : "60%",
                    height: previewImage ? "100%" : "auto",
                    objectFit: previewImage ? "cover" : "contain",
                    transform: previewImage ? "none" : "scale(1.2)",
                    transition: "transform 0.3s ease"
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
              </div>
              ₹
              <div className="preview-info">
                <p><span>Title:</span> {trip.title || "Not set"}</p>
                <p><span>Destination:</span> {trip.destination || "Not set"}</p>
                <p>
                  <span>Duration:</span>
                  {trip.startDate && trip.endDate
                    ? `${trip.startDate.toDateString()} → ${trip.endDate.toDateString()}`
                    : "Select dates"}
                </p>
                <p><span>Budget:</span> {trip.budget || "Not set"}</p>
                <p><span>Category:</span> {trip.category || "Not set"}</p>
                <p><span>Max Members:</span> {trip.maxMembers || "Not set"}</p>
              </div>

              <div className="info-note">
                Publishing soon! Fill all details to publish your trip.
              </div>

              <button className="btn-draft">Save as Draft</button>
            </aside>
          </div>

          <div className="bottom-bar">
            <button onClick={handleSubmit} className="btn-primary">
              Publish Trip
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
