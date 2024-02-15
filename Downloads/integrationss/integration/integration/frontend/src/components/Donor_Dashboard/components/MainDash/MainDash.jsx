import React, { useEffect, useState } from "react";
import "./MainDash.css";
import Women from "../../imgs/Women.png"; // Adjust the path based on the directory structure

const MainDash = () => {
  const totalContributions = 100; // Replace with your actual data
  const eventsAttended = 20; // Replace with your actual data
  const totalPayment = 5000; // Replace with your actual data
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkTimeout = setTimeout(() => {
      setBlink(false);
    }, 1000); // Adjust the duration of the blink animation

    return () => {
      clearTimeout(blinkTimeout);
    };
  }, []);

  return (
    <div className="MainDash">
      <h1 className="dashboard-heading">Donor's Dashboard</h1>
      <div className={`card-container ${blink ? "blink" : ""}`}>
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
      <img src={Women} alt="Cartoon Woman" className="cartoon-woman" />
    </div>
  );
};

export default MainDash;
