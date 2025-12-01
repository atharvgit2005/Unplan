import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Explore Trips</h1>

      {trips.length === 0 && <p>No trips available yet.</p>}

      {trips.map((trip) => (
        <div
          key={trip._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginTop: "10px",
            borderRadius: "8px"
          }}
        >
          <h2>{trip.title}</h2>
          <p><strong>Destination:</strong> {trip.destination}</p>
          <p><strong>Budget:</strong> ₹{trip.budget}</p>

          {trip.creator && (
            <p>
              <strong>Created by:</strong> {trip.creator.name} ({trip.creator.email})
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ExploreTrips;

