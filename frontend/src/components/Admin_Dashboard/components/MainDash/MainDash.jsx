import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";

const MainDash = () => {
  const  orphanages = 100; // Replace with your actual data
  const  donors = 20; // Replace with your actual data
  const  donations = 5000; // Replace with your actual data

  return (
    <div className="AdminMainDash">
      <h1>Dashboard</h1>

      <div className="card-container">
        <div className="card">
          <h2>Orphanages</h2>
          <p>{orphanages}</p>
        </div>
        <div className="card">
          <h2>Donors</h2>
          <p>{donors}</p>
        </div>
        <div className="card">
          <h2>Donations</h2>
          <p>{donations}</p>
        </div>
      </div>
      <div class='AdminMainDashChild'><Table /></div>
    </div>
  );
};

export default MainDash;
