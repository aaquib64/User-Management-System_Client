import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="brand">User Management</div>

      {/* Hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`links ${menuOpen ? "open" : ""}`}>
        {user && (
          <Link to="/dashboard" className="link">
            Dashboard
          </Link>
        )}

        {user && ["admin", "manager"].includes(user.role) && (
          <Link to="/users" className="link">
            Users
          </Link>
        )}

        {user && (
          <Link to="/profile" className="link">
            My Profile
          </Link>
        )}

        {user && (
          <button onClick={handleLogout} className="btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
