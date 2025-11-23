import React, { useState } from "react";
import "./create-trip.css";

export default function CreateTrip() {
  const [trip, setTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    budget: "",
    groupSize: "",
  });

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      description: trip.description,
      budget: trip.budget,
      groupSize: trip.groupSize,
      creator: "66343b56abc12345", // replace with logged in user ID
    };

    try {
      await fetch("http://localhost:5000/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      alert("Trip created!");
    } catch (err) {
      alert("Error creating trip");
    }
  };

  return (
    <div className="create-page">
      {/* Top Navigation */}
      <header className="topbar">
        <div className="topbar-inner">
          <div className="logo">Unplan</div>
          <nav>
            <a className="link-primary">+ Create Trip</a>
            <a className="link-danger">Logout</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="main-inner">
          <h1 className="headline">
            Fill in the details below to create your adventure
          </h1>

          <div className="content-grid">
            {/* LEFT SIDE FORM */}
            <div className="left-column">
              {/* Destination & Dates */}
              <section className="card">
                <h2 className="card-title card-title-blue">Destination & Dates</h2>
                <p className="card-subtitle">Where are you heading?</p>

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
                    <input
                      type="date"
                      name="startDate"
                      onChange={handleChange}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="label">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                </div>
              </section>

              {/* Trip Details */}
              <section className="card">
                <h2 className="card-title card-title-orange">Trip Details</h2>
                <p className="card-subtitle">Tell us about your adventure</p>

                <label className="label">Description</label>
                <textarea
                  name="description"
                  className="textarea"
                  onChange={handleChange}
                  placeholder="Tell us about your adventure…"
                />

                <div className="row">
                  <div>
                    <label className="label">Budget</label>
                    <input
                      type="number"
                      name="budget"
                      placeholder="e.g., 1000"
                      className="input"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="label">Group Size</label>
                    <input
                      type="number"
                      name="groupSize"
                      placeholder="e.g., 4-6"
                      className="input"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT SIDE PREVIEW */}
            <aside className="card preview">
              <h2 className="card-title card-title-preview">Trip Preview</h2>

              <div className="preview-box">
                <span className="preview-box-text">Destination preview</span>
              </div>

              <div className="preview-info">
                <div className="preview-row">
                  <span>Destination:</span>
                  <strong>{trip.destination || "Not set"}</strong>
                </div>

                <div className="preview-row">
                  <span>Duration:</span>
                  <strong>
                    {trip.startDate && trip.endDate
                      ? `${trip.startDate} → ${trip.endDate}`
                      : "Select dates"}
                  </strong>
                </div>

                <div className="preview-row">
                  <span>Budget:</span>
                  <strong>{trip.budget || "Not set"}</strong>
                </div>

                <div className="preview-row">
                  <span>Group Size:</span>
                  <strong>{trip.groupSize || "Not set"}</strong>
                </div>
              </div>

              <div className="info-box">
                Publishing soon! Fill all details to publish your trip.
              </div>

              <button className="button-draft">Save as Draft</button>
            </aside>
          </div>

          {/* Bottom Bar */}
          <div className="bottom-bar">
            <button onClick={handleSubmit} className="button-publish">
              Publish Trip
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
