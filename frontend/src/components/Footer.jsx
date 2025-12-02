import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="footer-container">
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                {/* CTA Section */}
                <div style={{ marginBottom: '80px' }}>
                    <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.2, marginBottom: '20px', maxWidth: '600px' }}>
                        Start your next adventure today.
                        <br />
                        Powered by AI, guided by experience.
                    </h2>
                    <Link to="/create" className="btn btn-primary" style={{ marginTop: '20px' }}>
                        Plan Your Trip
                    </Link>
                </div>

                {/* App/Social Section */}
                <div style={{ marginBottom: '60px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <a href="#" className="app-btn" aria-label="Twitter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                    </a>
                    <a href="#" className="app-btn" aria-label="Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                    </a>
                    <a href="#" className="app-btn" aria-label="LinkedIn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                    </a>
                </div>

                {/* Links Grid */}
                <div className="footer-grid">
                    {/* Navigation Column */}
                    <div>
                        <h3 className="footer-heading">UNPLAN</h3>
                        <Link to="/" className="footer-link">Home</Link>
                        <Link to="/create" className="footer-link">Create Trip</Link>
                        <Link to="/explore" className="footer-link">Explore</Link>
                        <Link to="/dashboard" className="footer-link">Dashboard</Link>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h3 className="footer-heading">RESOURCES</h3>
                        <a href="#" className="footer-link">About Us</a>
                        <a href="#" className="footer-link">FAQs</a>
                        <a href="#" className="footer-link">Blog</a>
                        <a href="#" className="footer-link">Support</a>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="footer-heading">GET IN TOUCH</h3>
                        <a href="mailto:hello@unplan.com" className="footer-link" style={{ fontSize: '1rem' }}>hello@unplan.com</a>
                        <a href="tel:+1234567890" className="footer-link" style={{ fontSize: '1rem' }}>+1 (234) 567-890</a>
                        <div style={{ marginTop: '20px' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Follow us</p>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div style={{ paddingTop: '40px', paddingBottom: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <p>&copy; 2024 UnPlan. All rights reserved.</p>
                </div>
            </div>

            {/* Huge Watermark */}
            <div className="footer-watermark">
                UNPLAN
            </div>
        </footer>
    )
}
