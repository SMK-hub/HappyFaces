/* eslint-disable no-unused-vars */
// OrphDash.js
import React, { useState, useEffect } from "react";
import "./EvenDash.css";
import '@fortawesome/fontawesome-free/css/all.css';
import ImagePopup from "./ImagePopup";
import { jsPDF } from "jspdf";
import axios from "axios";

const EvenDash = () => {
  const [imagePopupVisible, setImagePopupVisible] = useState(false);
  // const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [eventsData, setEventsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // const uniqueLocations = ["All", ...new Set(eventsData.map((event) => orphanage.location))];
  const uniqueStatus = ["All", ...new Set(eventsData.map((event) => event.status))];

  useEffect(() => {
    fetchEvents();
    // updateOrphanageStatus();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8079/admin/eventList");
      const data = response.data.map(event => ({
        ...event,
        name: event.title,
        desc: event.description,
        state: event.eventStatus,
        date: event.date,
        time: event.time,
        status: event.verificationStatus,
      }));
      console.log(data);
      setEventsData(data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  const updateEventStatus = async (OrpId,status) => {
    try {
      await axios.post(`http://localhost:8079/admin/verifyEventDetails/${OrpId}/${status}`);
      fetchEvents();
      console.log("Event status updated ");
    } catch(error) {
      console.error("Error updating the event status",error);
      throw error;
    }
  };

  // const handleLocationChange = (e) => {
  //   setSelectedLocation(e.target.value);
  //   setCurrentPage(1);
  // };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
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

  const showConfirmation = async (action, OrpId) => {
    const confirmationMessage = `Are you sure to ${action === 'Decline' ? 'Decline' : 'Accept'} this?`;
    if (window.confirm(confirmationMessage)) {
      try {
        if (action === 'Decline') {
          await updateEventStatus(OrpId, 'NOT_VERIFIED');
        } else {
          await updateEventStatus(OrpId, 'VERIFIED');
        }
        fetchEvents();
      } catch(error) {
        console.error("Error in updating the status",error);
      }
    } else {
      if(action === 'Decline') {
        console.log('Decline action is not working');
      } else {
        console.log('Accept action is not working');
      }
    }
  };  

  const filteredEvents = eventsData.filter((event) => {
    return (
      (selectedStatus === "All" || event.status === selectedStatus)
    );
  });

  const totalEntries = filteredEvents.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEvents.slice(indexOfFirstEntry, indexOfLastEntry);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="OrphDash">
        <h2>Orphanages</h2>
        
        <div className="selection">
          {/* <label htmlFor="locationFilter">Search by Location</label>
        
        <select id="locationFilter" value={selectedLocation} onChange={handleLocationChange}>
          {uniqueLocations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select> */}
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
              <th>Event</th>
              <th>Description</th>
              <th>Date</th>
              <th>Time</th>
              <th>Details</th>
              <th>Status</th>
              <th>Requests</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((event, index) => (
              <tr key={index}>
                <td>{event.name}</td>
                <td>{event.desc}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>
                  <button onClick={() => openModal(event)} className="smallButton">Details</button>
                </td>
                <td>{event.status}</td>
                <td className="requests">
                  
                  {event.status === "VERIFIED" && (
                    <button onClick={() => showConfirmation("Decline", event.orpId)} style={{ fontSize: "10px", padding: "5px" }}>Decline</button>
                  )}
                  {event.status === "NOT_VERIFIED" && (
                    <button onClick={() => showConfirmation("Accept", event.orpId)} style={{ fontSize: "10px",padding:"5px"}}>Accept</button>
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
        {selectedEvent && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h3>{selectedEvent.name}</h3>
              <p className="field-name">Description:<span> {selectedEvent.desc}</span></p>
              <p className="field-name">Date:<span> {selectedEvent.date}</span></p>
              <p className="field-name">Time:<span> {selectedEvent.time}</span></p>
              <p className="field-name">Current Status:<span> {selectedEvent.state}</span></p>
            </div>
          </div>
        )}

        {imagePopupVisible && (
          <ImagePopup
            images={selectedEvent ? selectedEvent.images : []}
            onClose={closeImagePopup}
          />
        )}
      </div>
    </div>
  );
};

export default EvenDash;