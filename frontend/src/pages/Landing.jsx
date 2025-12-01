import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">Unplan</span>
          </div>
          <div className="nav-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link nav-link-primary">Sign Up</Link>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Your Next
              <span className="hero-highlight"> Adventure</span>
            </h1>
            <p className="hero-subtitle">
              Connect with fellow travelers, create unforgettable trips, and explore the world together.
              Whether you're planning a solo journey or joining a group adventure, Unplan makes it easy.
            </p>
            
            <div className="hero-buttons">
              <Link to="/create-trip" className="btn btn-primary">
               
                Create Trip
              </Link>
              <Link to="/join-trip" className="btn btn-secondary">
                
                Join Trip
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card card-1">
              <div className="card-icon"></div>
              <div className="card-content">
                <h4>Mountain Trek</h4>
                <p>Himalayas, Nepal</p>
              </div>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon"></div>
              <div className="card-content">
                <h4>Beach Paradise</h4>
                <p>Bali, Indonesia</p>
              </div>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon"></div>
              <div className="card-content">
                <h4>City Explorer</h4>
                <p>Tokyo, Japan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section className="how-it-works">
        <div className="how-it-works-container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Get started in three simple steps
            </p>
          
           
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-text">Unplan</span>
            </div>
            
            <div className="social-links">
              
            </div>
          </div>
          <div className="footer-section">
            <h3>Product</h3>
            <div className="footer-links">
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#pricing">Pricing</a>
              <a href="#reviews">Reviews</a>
            </div>
          </div>
          <div className="footer-section">
            
            
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <div className="footer-links">
              
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; Unplan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
