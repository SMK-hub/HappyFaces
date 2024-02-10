import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDashboard.css";
const MainDash = () => {
  const  details = 100; // Replace with your actual data
  const  profile = 20; // Replace with your actual data
  const  events = 5000; // Replace with your actual data

  return (
    
    <div className="MainDashboard">
      <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: '2em' }}>Dashboard</h1>

      <div className="card-container">
        <div className="card">
          <h2>Details</h2>
          <p>{details}</p>
        </div>
        <div className="card">
          <h2>Profile</h2>
          <p>{profile}</p>
        </div>
        <div className="card">
          <h2>Events</h2>
          <p>{events}</p>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default MainDash;
