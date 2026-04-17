

import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <h2>Welcome, {user?.name} 👋</h2>
      <p className="role">
        Role: <strong>{user?.role?.toUpperCase()}</strong>
      </p>

      <div className="cards">
        <Link to="/profile" className="card">
          <div className="icon">👤</div>
          <div>My Profile</div>
          <div className="sub">View and edit your profile</div>
        </Link>

        {["admin", "manager"].includes(user?.role) && (
          <Link to="/users" className="card">
            <div className="icon">👥</div>
            <div>Manage Users</div>
            <div className="sub">View, create and edit users</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
