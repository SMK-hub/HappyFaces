/* eslint-disable no-unused-vars */
// OrphDash.js
import React, { useState } from "react";
import "./OrphDash.css";
import { orphanagesData } from "../../Data/Data";
// index.js or App.js
import '@fortawesome/fontawesome-free/css/all.css';
import ImagePopup from "./ImagePopup";
import { jsPDF } from "jspdf";

const OrphDash = () => {
  const [imagePopupVisible, setImagePopupVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedOrphanage, setSelectedOrphanage] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");

  const uniqueLocations = ["All", ...new Set(orphanagesData.map((orphanage) => orphanage.location))];
  const uniqueStatus = ["All", ...new Set(orphanagesData.map((orphanage) => orphanage.status))];

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
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
    // Generate a unique PDF content based on orphanage information
    const pdf = new jsPDF();
    pdf.text(`Certificates for ${orphanage.name}`, 20, 20);
    pdf.save(`${orphanage.name}_certificates.pdf`);
  };

  const filteredOrphanages = orphanagesData.filter((orphanage) => {
    return (
      (selectedLocation === "All" || orphanage.location === selectedLocation) &&
      (selectedStatus === "All" || orphanage.status === selectedStatus)
    );
  });

  return (
    <div>
      <div className="OrphDash">
        <h2>Orphanages</h2>
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

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Details</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrphanages.map((orphanage, index) => (
              <tr key={index}>
                <td>{orphanage.name}</td>
                <td>{orphanage.location}</td>
                <td>{orphanage.contact}</td>
                <td>
                  <button onClick={() => openModal(orphanage)}>Details</button>
                </td>
                <td>{orphanage.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {selectedOrphanage && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h3>{selectedOrphanage.name}</h3>
              <p className="field-name">Director:<span> {selectedOrphanage.director}</span></p>
              <p className="field-name">Certificates:{" "} <button onClick={() => downloadCertificates(selectedOrphanage)}>Download</button></p>
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
