// MainDash.jsx
import React from "react";
import Table from "../Table/Table";
import "./MainDash.css";

const MainDash = () => {
  const totalContributions = 100; // Replace with your actual data
  const eventsAttended = 20; // Replace with your actual data
  const totalPayment = 5000; // Replace with your actual data

  return (
    <div className="MainDash">
      <h1><center>Donor's Dashboard</center></h1>
      {/* <p className="welcomeMessage">
        Welcome, generous donor! Your contributions make a significant impact on
        our community. Your support helps us organize events and create positive
        change. Thank you for being a part of our mission to make the world a
        better place. 😊
      </p> */}
      <div className="card-container">
        <div className="card">
          <h2>Total Contributions</h2>
          <p>{totalContributions}</p>
        </div>
        <div className="card">
          <h2>Events Attended</h2>
          <p>{eventsAttended}</p>
        </div>
        <div className="card">
          <h2>Total Payment Donated</h2>
          <p>{totalPayment}</p>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default MainDash;
