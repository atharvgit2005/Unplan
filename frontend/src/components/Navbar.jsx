import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-pill">
        {/* Logo Section */}
        <Link to="/" className="text-xl font-bold text-white tracking-tight hover:opacity-80 transition-opacity">
          UnPlan
        </Link>

        {/* Center Links Section */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/create" className={`nav-link ${isActive('/create')}`}>
            Create Trip
          </Link>
          <Link to="/explore" className={`nav-link ${isActive('/explore')}`}>
            Explore
          </Link>
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
            Dashboard
          </Link>
        </div>

        {/* Right Auth Section */}
        <div className="flex items-center gap-3">
          <Link to="/login" className="nav-btn">
            Login
          </Link>
          <Link to="/signup" className="nav-btn nav-btn-primary">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}
