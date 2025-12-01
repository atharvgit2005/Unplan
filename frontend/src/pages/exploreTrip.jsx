import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { removeToken } from "../utils/auth";
import "./create-trip.css";

function ExploreTrips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/trips`);
        setTrips(res.data);
      }
      catch (error) {
        console.log("Error fetching trips", error);
      }
    };

    fetchTrips();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      removeToken();
      window.location.href = "/login";
    }
  };

  return (
    <div className="create-page">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="logo">UnPlan</div>
          <nav>
            <a className="nav-link" href="/create-trip">+ Create Trip</a>
            <a className="nav-link primary" href="/explore-trips">Explore Trips</a>
            <a className="nav-link danger" onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</a>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="main-inner">
          <h1 className="headline">Explore Trips</h1>

          {trips.length === 0 && <p>No trips available yet.</p>}

          <div className="grid-layout" style={{ display: 'block' }}>
            {trips.map((trip) => (
              <div
                key={trip._id}
                className="card"
                style={{ marginBottom: "20px" }}
              >
                <h2 className="card-title blue">{trip.title}</h2>
                <p><strong>Destination:</strong> {trip.destination}</p>
                <p><strong>Budget:</strong> ₹{trip.budget}</p>

                {trip.createdBy && (
                  <p>
                    <strong>Created by:</strong> {trip.createdBy.name} ({trip.createdBy.email})
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ExploreTrips;

