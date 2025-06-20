import React from "react";
import { useNavigate } from "react-router-dom";
// import "./Dashboard.css"; // Optional: for custom styling

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: Clear any tokens or user state here
    navigate("/"); // Navigate back to login
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <section className="dashboard-content">
        <div className="card">
          <h3>Total Users</h3>
          <p>1,204</p>
        </div>
        <div className="card">
          <h3>Active Sessions</h3>
          <p>89</p>
        </div>
        <div className="card">
          <h3>Messages</h3>
          <p>542</p>
        </div>
      </section>
    </div>
  );
}
