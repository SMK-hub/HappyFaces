// Donors.jsx

import React, { useState } from 'react';
import './PayDash.css'; // Import the CSS file
import { payData } from '../../Data/Data';
import PayCard from './PayCard'; 

const PayDash = () => {
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [selectedName, setSelectedName] = useState('All');

  const openDonorCard = (donor) => {
    setSelectedDonor(donor);
  };

  const closeDonorCard = () => {
    setSelectedDonor(null);
  };

  const handleNameChange = (e) => {
    setSelectedName(e.target.value);
  };

  const filteredDonors = selectedName === 'All'
    ? payData
    :payData.filter((donor) => donor.name === selectedName);

  return (
    <div className="donors">
      <h2 className="donors-title">Payments</h2>

      {/* Dropdown search bar */}
      <div className="search-bar">
        <label htmlFor="name">Search through Name </label>
        <select id="name" value={selectedName} onChange={handleNameChange}>
          <option value="All">All</option>
          {/* Add options for each unique location in your data */}
          {Array.from(new Set(payData.map(donor => donor.name))).map((name, index) => (
            <option key={index} value={name}>{name}</option>
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
            <th>Date</th>
            <th>Donated</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonors.map((donor) => (
            <tr key={donor.id} onClick={() => openDonorCard(donor)} style={{ cursor: 'pointer' }}>
              <td>{donor.name}</td>
              <td>{donor.location}</td>
              <td>{donor.contact}</td>
              <td>{donor.orphanage}</td>
              <td>{donor.date}</td>
              <td>{donor.donated}</td>
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
