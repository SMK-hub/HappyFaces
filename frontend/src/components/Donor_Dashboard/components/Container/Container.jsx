/* eslint-disable no-unused-vars */
import React from 'react';
import './Container.css';
import Sidebar from '../Sidebar';
import RightSide from '../RigtSide/RightSide';
import { Link } from "react-router-dom";
 
const MyContainer = () => {
  // Dummy data for orphanage information
  const orphanageInfo = {
    Name: 'ABC Orphanage',
    DirectorName: 'Rajnikanth',
    Contact: '123-456-7890',
    Description: 'A place for children in need.',
    Address: '123 Main Street, City, Country',
    VerificationStatus: 'Verified',
    Website: 'https://www.abc-orphanage.org',
    Requirements: 'Food, clothing, education materials',
    PriorityStatus: 'High',
  };
 
  const tableData = Object.entries(orphanageInfo);
 
  return (
    <div className="details-container">
      <h1 className="head">ORPHANAGE DETAILS</h1>
      <table className="info-table">
        <tbody>
          {tableData.map(([title, detail]) => (
            <tr key={title}>
              <td className="info-title">{title}:</td>
              <td className="info-detail">{detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <Link to="/update-details"><button className="button" onClick={() => handleButtonClick('Update Details')}>
          Update Details
        </button>
        </Link>
        <Link to="/certificates"><button className="button" onClick={() => handleButtonClick('Update Certificates')}>
          Update Certificates
        </button>
        </Link>
       
        <button className="button" onClick={() => handleButtonClick('Upload Photos')}>
          Upload Photos
        </button>
      </div>
    </div>
  );
};
 
const handleButtonClick = (action) => {
  // Handle button click logic here
  console.log(`Button clicked: ${action}`);
};
 
export default MyContainer;
 