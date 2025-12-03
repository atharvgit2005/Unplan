import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import beachImg from './pexels-vincent-gerbouin-445991-1188470.jpg';
import cityImg from './pexels-musaortac-31023938.jpg';
import mountainImg from './pexels-dreamypixel-554609.jpg';

export default function Landing() {
  return (
    <div className="landing-page">

      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">Unplan</span>
          </div>

          <div className="nav-links">
            <Link to="/create-trip" className="nav-link">Create Trip</Link>
            <Link to="/explore-trips" className="nav-link">Join Trip</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link signup-btn">Sign Up</Link>
          </div>
        </div>
      </nav>

  
      <section className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Your Next
              <span className="hero-highlight"> Adventure</span>
            </h1>

            <p className="hero-subtitle">
              Match with solo travelers, plan group trips, and explore new places —
              all through Unplan.
            </p>

            <div className="hero-buttons">
              <Link to="/create-trip" className="btn-primary">Create Trip</Link>
              <Link to="/join-trip" className="btn-secondary">Join Trip</Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="floating-card card-1">
              <img src={mountainImg} alt="Mountain Trip" className="card-img" />
              <h4>Mountain Trek</h4>
              <p>Uttarakhand , India</p>
            </div>

            <div className="floating-card card-2">
              <img src={beachImg} alt="Beach" className="card-img" />
              <h4>Beach Paradise</h4>
              <p>Bali, Indonesia</p>
            </div>

            <div className="floating-card card-3">
              <img src={cityImg} alt="City" className="card-img" />
              <h4>City Explorer</h4>
              <p>Mumbai ,Maharashtra</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
  <div className="how-it-works-container">
    <h2 className="section-title">How It Works</h2>
    <p className="section-subtitle">Start your journey in 3 simple steps</p>

    <div className="vertical-steps">

      <div className="step-item">
        <div className="step-line"></div>
        <div className="step-number">1</div>
        <div className="step-content">
          <h3>Create Your Profile</h3>
          <p>Set your travel preferences and adventure style.</p>
        </div>
      </div>

      <div className="step-item">
        <div className="step-line"></div>
        <div className="step-number">2</div>
        <div className="step-content">
          <h3>Host or Join Trips</h3>
          <p>Create your own travel group or join one instantly.</p>
        </div>
      </div>

      <div className="step-item">
        <div className="step-line"></div>
        <div className="step-number">3</div>
        <div className="step-content">
          <h3>Travel With Like-Minded People</h3>
          <p>Match with solo travelers and explore together.</p>
        </div>
      </div>

    </div>
  </div>
</section>


      <footer className="footer">
        <div className="footer-container">

          <div className="footer-col">
            <h3 className="footer-logo">Unplan</h3>
            <p>Your travel companion for unforgettable journeys.</p>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <a href="#how-it-works">How It Works</a>
            <Link to="/create-trip">Create Trip</Link>
            <Link to="/explore-trips">Join Trip</Link>
          </div>

          <div className="footer-col">
            <a href="#">About Us</a>
    
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <a href="#">Contact</a>
            <a href="#">Terms & Policy</a>
          </div>
        </div>

        <div className="footer-bottom">
          © Unplan — All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}
