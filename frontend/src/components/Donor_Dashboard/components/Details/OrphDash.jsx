import React, { useState, useEffect } from "react";
import "./OrphDash.css";
import { orphanagesData } from "../../Data/Data";
import '@fortawesome/fontawesome-free/css/all.css';
import ImagePopup from "./ImagePopup";
import { jsPDF } from "jspdf";
 
const OrphDash = () => {
  const [imagePopupVisible, setImagePopupVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedOrphanage, setSelectedOrphanage] = useState({
    orphanage: null,
    events: [],
  });
  const [selectedRequirement, setSelectedRequirement] = useState("All");
  const [eventDetailsVisible, setEventDetailsVisible] = useState(false);
  const [registrationSuccessVisible, setRegistrationSuccessVisible] = useState(false);
  const [donationPopupVisible, setDonationPopupVisible] = useState(false);
  const [donationDescriptionVisible, setDonationDescriptionVisible] = useState(false);
 
  const uniqueLocations = ["All", ...new Set(orphanagesData.map((orphanage) => orphanage.location))];
  const uniqueRequirements = ["All", ...new Set(orphanagesData.map((orphanage) => orphanage.requirements))];
 
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };
 
  const handleRequirementChange = (e) => {
    setSelectedRequirement(e.target.value);
  };
 
  const openModal = async (orphanage) => {
    const events = await fetchEvents(orphanage.id);
    setSelectedOrphanage({
      orphanage,
      events,
    });
  };
 
  const closeModal = () => {
    setSelectedOrphanage({
      orphanage: null,
      events: [],
    });
    setEventDetailsVisible(false);
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
 
  const handleEventsButtonClick = () => {
    setEventDetailsVisible(true);
  };
 
  const handleEventDetailsClose = () => {
    setEventDetailsVisible(false);
  };
 
  const handleRegisterEvent = () => {
    console.log("Event registered");
    setRegistrationSuccessVisible(true);
  };
 
  const handleDonateButtonClick = () => {
    setDonationPopupVisible(true);
  };
 
  const handleDonationOption = (option) => {
    console.log(`Donation option selected: ${option}`);
    if (option === 'Requirements') {
      setDonationDescriptionVisible(true);
    } else if (option === 'Others') {
      // Handle the case for donating money
    }
  };
 
  const handleRegistrationSuccessClose = () => {
    setRegistrationSuccessVisible(false);
  };
 
  const handleBackButtonClick = () => {
    setSelectedOrphanage({
      orphanage: null,
      events: [],
    });
  };
 
  const handleDonationDescriptionClose = () => {
    setDonationDescriptionVisible(false);
  };
 
  const handleDonationDescriptionSave = () => {
    console.log("Donation description saved");
    setDonationDescriptionVisible(false);
  };
 
  const filteredOrphanages = orphanagesData.filter((orphanage) => {
    return (
      (selectedLocation === "All" || orphanage.location === selectedLocation) &&
      (selectedRequirement === "All" || orphanage.requirements === selectedRequirement)
    );
  });
 
  const fetchEvents = (orphanageId) => {
    return [
      { id: 1, dateTime: "2024-02-10 15:00:00" },
      { id: 2, dateTime: "2024-02-15 18:30:00" },
    ];
  };
 
  return (
    <div>
      <div className="OrphDash">
        <h2>Orphanages</h2>
        <div className="OrphDash-inside">
          <div className="search-item">
            <label htmlFor="locationFilter">Search by Location :</label>
            <select id="locationFilter" value={selectedLocation} onChange={handleLocationChange}>
              {uniqueLocations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="search-item">
            <label htmlFor="requirementFilter">Search by Requirements :</label>
            <select id="requirementFilter" value={selectedRequirement} onChange={handleRequirementChange}>
              {uniqueRequirements.map((requirements, index) => (
                <option key={index} value={requirements}>
                  {requirements}
                </option>
              ))}
            </select>
          </div>
        </div>
 
        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Details</th>
              <th>Requirements</th>
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
                <td>{orphanage.requirements}</td>
              </tr>
            ))}
          </tbody>
        </table>
 
        {/* Modal */}
        {selectedOrphanage.orphanage && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h3>{selectedOrphanage.orphanage.name}</h3>
              <p className="field-name">Orphanage Name:<span> {selectedOrphanage.orphanage.name}</span></p>
              <p className="field-name">Location:<span> {selectedOrphanage.orphanage.location}</span></p>
              <p className="field-name">Director:<span> {selectedOrphanage.orphanage.director}</span></p>
              <p className="field-name">Certificates:{" "} <button onClick={() => downloadCertificates(selectedOrphanage.orphanage)}>Download</button></p>
 
              {/* Add "Events" and "Donate" buttons */}
              <div className="button-container">
                <button onClick={handleEventsButtonClick}>Events</button>
                <button onClick={handleDonateButtonClick}>Donate</button>
              </div>
            </div>
          </div>
        )}
 
        {imagePopupVisible && (
          <ImagePopup
            images={selectedOrphanage.orphanage ? selectedOrphanage.orphanage.images : []}
            onClose={closeImagePopup}
            onBack={handleBackButtonClick}
          />
        )}
 
        {/* Event Details Card Box */}
        {eventDetailsVisible && selectedOrphanage.orphanage && (
          <div className="modal">
            <div className="event-details-content">
              <span className="close" onClick={handleEventDetailsClose}>&times;</span>
              <h3>{selectedOrphanage.orphanage.name} Event Details</h3>
 
              {/* Display Events in a Table */}
              <table>
                <thead>
                  <tr>
                    <th>Orphanage Name</th>
                    <th>Date/Time</th>
                    <th>Register Event</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrphanage.events.map((event, index) => (
                    <tr key={index}>
                      <td>{selectedOrphanage.orphanage.name}</td>
                      <td>{event.dateTime}</td>
                      <td>
                        <button onClick={handleRegisterEvent}>Register Event</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
 
              <p>"Unlock a world of inspiration at our upcoming event. Join us for an enriching experience. Register now to secure your spot, connect with like-minded individuals, and contribute to a meaningful cause. Don't miss out on this transformative event!"</p>
              <button className="back-button" onClick={handleEventDetailsClose}>Back</button>
            </div>
          </div>
        )}
 
        {/* Registration Success Pop-up */}
        {registrationSuccessVisible && (
          <div className="modal">
            <div className="event-details-content registration-success-popup">
              <span className="close" onClick={handleRegistrationSuccessClose}>&times;</span>
              <h3>Thank you for successful registration!</h3>
              <button className="close-button" onClick={handleRegistrationSuccessClose}>X</button>
            </div>
          </div>
        )}
 
        {/* Donation Pop-up */}
        {donationPopupVisible && selectedOrphanage.orphanage && (
          <div className="modal">
            <div className="donation-popup-content">
              <span className="close" onClick={() => setDonationPopupVisible(false)}>&times;</span>
              <h3>Donate to {selectedOrphanage.orphanage.name}</h3>
              <p>Choose a donation option:</p>
              <div className="button-container">
                <button onClick={() => handleDonationOption('Requirements')}>Donate Requirements</button>
                <button onClick={() => handleDonationOption('Others')}>Donate Money</button>
              </div>
              {/* Additional close button inside the pop-up content */}
              <button className="close-button-inside" onClick={() => setDonationPopupVisible(false)}>Close</button>
            </div>
          </div>
        )}
 
        {/* Donation Description Pop-up */}
        {donationDescriptionVisible && (
          <div className="modal donation-description-modal">
            <div className="donation-description-popup-content">
              <span className="close" onClick={handleDonationDescriptionClose}>&times;</span>
              <h3>Donate Requirements - {selectedOrphanage.orphanage.name}</h3>
              <p>Enter a description of the requirements you wish to donate:</p>
              <textarea placeholder="Description" rows="4" cols="50"></textarea>
              <div className="button-container">
                <button onClick={handleDonationDescriptionSave}>Save</button>
                <button onClick={handleDonationDescriptionClose}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default OrphDash;