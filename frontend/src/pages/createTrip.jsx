import React, { useState,useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./create-trip.css";
import {getUserFromToken , removeToken } from "../utils/auth"

export default function CreateTrip() {
  const [currentUser, setCurrentUser] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...trip,
      createdBy: "66343b56abc12345", // replace with logged-in ID
    };

    try {
      await fetch("http://localhost:5000/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      alert("Trip created successfully");
    } catch (err) {
      alert("Error creating trip");
    }
  };

  return (
    <div className="create-page">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="logo">Unplan</div>
          <nav>
            <a className="nav-link primary">+ Create Trip</a>
            <a className="nav-link danger">Logout</a>
          </nav>
        </div>
      </header>

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

              <div className="preview-banner">Destination Preview</div>

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
