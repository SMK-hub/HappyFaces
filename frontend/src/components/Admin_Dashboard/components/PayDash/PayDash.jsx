// Donors.jsx

import React, { useState } from 'react';
import './PayDash.css'; // Import the CSS file
import { payData } from '../../Data/Data';
import PayCard from './PayCard'; 

const PayDash = () => {
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('All');

  const openDonorCard = (donor) => {
    setSelectedDonor(donor);
  };

  const closeDonorCard = () => {
    setSelectedDonor(null);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const filteredDonors = selectedLocation === 'All'
    ? payData
    :payData.filter((donor) => donor.location === selectedLocation);

  return (
    <div className="donors">
      <h2 className="donors-title">Payments</h2>

      {/* Dropdown search bar */}
      <div className="search-bar">
        <label htmlFor="location">Search through Location </label>
        <select id="location" value={selectedLocation} onChange={handleLocationChange}>
          <option value="All">All</option>
          {/* Add options for each unique location in your data */}
          {Array.from(new Set(payData.map(donor => donor.location))).map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Contact</th>
            <th>Orphanage</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonors.map((donor) => (
            <tr key={donor.id} onClick={() => openDonorCard(donor)} style={{ cursor: 'pointer' }}>
              <td>{donor.name}</td>
              <td>{donor.location}</td>
              <td>{donor.contact}</td>
              <td>{donor.orphanage}</td>
              <td>{donor.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Donor Card Popup */}
      {selectedDonor && (
        <div className="overlay">
          <PayCard donor={selectedDonor} onClose={closeDonorCard} />
        </div>
      )}
    </div>
  );
};

export default PayDash;
