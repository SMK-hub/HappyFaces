/* eslint-disable no-unused-vars */
// OrphDash.js
import React, { useState, useEffect } from "react";
import "./OrphDash.css";
import '@fortawesome/fontawesome-free/css/all.css';
import ImagePopup from "./ImagePopup";
import { jsPDF } from "jspdf";
import axios from "axios";

const OrphDash = () => {
  const [imagePopupVisible, setImagePopupVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedOrphanage, setSelectedOrphanage] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [orphanagesData, setOrphanagesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const uniqueLocations = ["All", ...new Set(orphanagesData.map((orphanage) => orphanage.location))];
  const uniqueStatus = ["All", ...new Set(orphanagesData.map((orphanage) => orphanage.status))];

  useEffect(() => {
    fetchOrphanages();
  }, []);

  const fetchOrphanages = async () => {
    try {
      const response = await axios.get("http://localhost:8079/admin/orphanageDetailsList");
      const data = response.data;
      console.log(data);
      setOrphanagesData(data);
    } catch (error) {
      console.error("Error fetching orphanages", error);
    }
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  const openModal = (orphanage) => {
    setSelectedOrphanage(orphanage);
  };

  const closeModal = () => {
    setSelectedOrphanage(null);
  };

  const openImagePopup = () => {
    setImagePopupVisible(true);
  };

  const closeImagePopup = () => {
    setImagePopupVisible(false);
  };

  const downloadCertificates = (orphanage) => {
    const pdf = new jsPDF();
    pdf.text(`Certificates for ${orphanage.name}`, 20, 20);
    pdf.save(`${orphanage.name}_certificates.pdf`);
  };

  const showConfirmation = (action) => {
    const confirmationMessage = `Are you sure to ${action === 'Decline' ? 'Decline' : 'Accept'} this?`;
    if (window.confirm(confirmationMessage)) {
      if (action === 'Decline') {
        console.log("Decline");
        // Add logic for Decline action here
      } else {
        console.log("Accept");
        // Add logic for Accept action here
      }
    } else {
      // User clicked Cancel, do nothing or add additional logic as needed
    }
  };

  const filteredOrphanages = orphanagesData.filter((orphanage) => {
    return (
      (selectedLocation === "All" || orphanage.address === selectedLocation) &&
      (selectedStatus === "All" || orphanage.status === selectedStatus)
    );
  });

  const totalEntries = filteredOrphanages.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredOrphanages.slice(indexOfFirstEntry, indexOfLastEntry);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="OrphDash">
        <h2>Orphanages</h2>
        
        <div className="selection">
          <label htmlFor="locationFilter">Search by Location</label>
        
        <select id="locationFilter" value={selectedLocation} onChange={handleLocationChange}>
          {uniqueLocations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
        <label htmlFor="statusFilter">Search by Status</label>
        <select id="statusFilter" value={selectedStatus} onChange={handleStatusChange}>
          {uniqueStatus.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
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
              <th>Details</th>
              <th>Status</th>
              <th>Requests</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((orphanage, index) => (
              <tr key={index}>
                <td>{orphanage.name}</td>
                <td>{orphanage.location}</td>
                <td>{orphanage.contact}</td>
                <td>
                  <button onClick={() => openModal(orphanage)} className="smallButton">Details</button>
                </td>
                <td>{orphanage.status}</td>
                <td className="requests">
                  {orphanage.status === "Verified" ? (
                    <button onClick={() => showConfirmation("Decline")} style={{ fontSize: "10px", padding: "5px" }}>Decline</button>
                  ) : (
                    <button onClick={() => showConfirmation("Accept")} style={{ fontSize: "10px", padding: "5px" }}>Accept</button>
                  )}
                </td>
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

        {/* Modal */}
        {selectedOrphanage && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h3>{selectedOrphanage.name}</h3>
              <p className="field-name">Director:<span> {selectedOrphanage.director}</span></p>
              <p className="field-name">Established Date:<span> {selectedOrphanage.establishedDate}</span></p>
              <p className="field-name">Location<span> {selectedOrphanage.location}</span></p>
              <p className="field-name">Contact<span> {selectedOrphanage.contact}</span></p>
              <p className="field-name">Image:{" "} <button onClick={openImagePopup}>View</button></p>
              <p className="field-name">Certificates:{" "} <button onClick={() => downloadCertificates(selectedOrphanage)} className="smallButton">Download</button></p>
            </div>
          </div>
        )}

        {imagePopupVisible && (
          <ImagePopup
            images={selectedOrphanage ? selectedOrphanage.images : []}
            onClose={closeImagePopup}
          />
        )}
      </div>
    </div>
  );
};

export default OrphDash;
