import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { removeToken } from "../utils/auth";
import styles from "./exploreTrip.module.css";

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
    <div className={styles['create-page']}>
      <header className={styles.topbar}>
        <div className={styles['topbar-inner']}>
          <div className={styles.logo}>UnPlan</div>
          <nav>
            <Link className={styles['nav-link']} to="/">Home</Link>
            <Link className={styles['nav-link']} to="/create-trip">+ Create Trip</Link>
            <Link className={`${styles['nav-link']} ${styles.primary}`} to="/explore-trips">Explore Trips</Link>
            <a className={`${styles['nav-link']} ${styles.danger}`} onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</a>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles['main-inner']}>
          <h1 className={styles.headline}>Explore Trips</h1>

          {trips.length === 0 && <p>No trips available yet.</p>}

          <div className={styles['grid-layout']} >
            {trips.map((trip) => (
              <div
                key={trip._id}
                className={styles.card}
                style={{ marginBottom: "20px", overflow: "hidden" }}
              >
                {trip.image && (
                  <img
                    src={`${API_BASE_URL}/${trip.image}`}
                    alt={trip.title}
                    style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "12px 12px 0 0" }}
                  />
                )}
                <div style={{ padding: "15px" }}>
                  <h2 className={`${styles['card-title']} ${styles.blue}`}>{trip.title}</h2>
                  <p><strong>Destination:</strong> {trip.destination}</p>
                  <p><strong>Budget:</strong> ₹{trip.budget}</p>

                  {trip.createdBy && (
                    <p>
                      <strong>Created by:</strong> {trip.createdBy.name} ({trip.createdBy.email})
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ExploreTrips;

