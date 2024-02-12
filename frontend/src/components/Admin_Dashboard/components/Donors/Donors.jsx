// Donors.jsx

import React, { useState , useEffect } from 'react';
import './Donors.css'; // Import the CSS file
import { fetchDonorsData } from '../../Data/Data';
import DonorCard from './DonorCard'; // Import the DonorCard component
import axios from "axios";

const Donors = () => {
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;
  const [donorsData,setDonorsData] = useState([]);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await axios.get("http://localhost:8079/admin/donationList");
      const data = response.data.map(donate => ({
        name: donate.orphanageName,
        amount: donate.amount,
        tid: donate.transactionId,
        entry: donate.dateTime,
      }))
    }catch(error){
      console.log(error);
    }
  }

  const openDonorCard = (donor) => {
    setSelectedDonor(donor);
  };

  const closeDonorCard = () => {
    setSelectedDonor(null);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    setCurrentPage(1);
  };
  // let filteredDonors;
  // let currentEntries;
  // let totalPages;
  // let totalEntries;
  // let indexOfFirstEntry;
  // let indexOfLastEntry;
// useEffect(()=>{
  const filteredDonors = selectedLocation === 'All'
    ? donorsData
    : donorsData.filter((donor) => donor.location === selectedLocation);
  const totalEntries = filteredDonors?.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredDonors.slice(indexOfFirstEntry, indexOfLastEntry);
// },[donorsData]);
  
  console.log(currentEntries);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (donorsData && donorsData.length > 0) && (
    <div className="donors">
      <h2 className="donors-title">Donors</h2>
      {/* Dropdown search bar */}
      <div className="search-bar">
        <label htmlFor="location">Search through Location </label>
        <select id="location" value={selectedLocation} onChange={handleLocationChange}>
          <option value="All">All</option>
          {
            donorsData && Array.from(new Set(donorsData.map(donor => donor.location))).map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
          
          
        </select>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          
          {currentEntries && currentEntries.map((donor) => (
            <tr key={donor.id} onClick={() => openDonorCard(donor)} style={{ cursor: 'pointer' }}>
              <td>{donor.name}</td>
              <td>{donor.email}</td>
              <td>{donor.contact}</td>
              <td>{donor.location}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button key={page} onClick={() => handlePageChange(page)} className={`pagination-button ${currentPage === page ? 'active' : ''}`}>
              {page}
            </button>
          ))}
          <p>Page {currentPage} of {totalPages}</p>
        </div>

      {/* Donor Card Popup */}
      {selectedDonor && (
        <div className="overlay">
          <DonorCard donor={selectedDonor} onClose={closeDonorCard} />
        </div>
      )}
    </div>
  );
};

export default Donors;
