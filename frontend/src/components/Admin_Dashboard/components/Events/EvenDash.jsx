/* eslint-disable no-unused-vars */
// OrphDash.js
import React, { useState, useEffect } from "react";
import "./EvenDash.css";
// index.js or App.js
import '@fortawesome/fontawesome-free/css/all.css';
import ImagePopup from "./ImagePopup";
import axios from "axios";
import { API_BASE_URL } from "../../../../config";

const EvenDash = () => {
  const [imagePopupVisible, setImagePopupVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [eventsData, setEventsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const uniqueLocations = ["All", ...new Set(eventsData.map((event) => event.location))];
  const uniqueStatus = ["All", ...new Set(eventsData.map((event) => event.stats))];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/eventList`);
      const data = response.data.map(event => ({
        name: event.title,
        date: event.date,
        time: event.time,
        stats: event.verificationStatus,
        attend: event.interestedPersons,
      }));
      setEventsData(data);
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

  const filteredEvents = eventsData.filter((event) => {
    return (
      (selectedLocation === "All" || event.location === selectedLocation) &&
      (selectedStatus === "All" || event.stats === selectedStatus)
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
        <h2>Events</h2>
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
          {uniqueStatus.map((stats, index) => (
            <option key={index} value={stats}>
              {stats}
            </option>
          ))}
        </select>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {/* <th>Location</th> */}
              <th>Date</th>
              <th>Details</th>
              <th>Status</th>
              <th>Time</th>
              <th>Requests</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((event, index) => (
              <tr key={index}>
                <td>{event.name}</td>
                {/* <td>{event.location}</td> */}
                <td>{event.date}</td>
                <td>
                  <button onClick={() => openModal(event)} className="smallButton">Details</button>
                </td>
                <td>{event.stats}</td>
                <td>{event.time}</td>
                <td className="requests">
                  {event.stats === "Verified" ? (
                    <button onClick={() => console.log("Decline")} style={{ fontSize: "10px", padding: "5px" }}>Decline</button>
                  ) : (
                    <button onClick={() => console.log("Accept")} style={{ fontSize: "10px", padding: "5px" }}>Accept</button>
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
              <p className="field-name">Event Name<span> {selectedEvent.name}</span></p>
              {/* <p className="field-name">Location<span> {selectedEvent.location}</span></p> */}
              <p className="field-name">Date<span> {selectedEvent.date}</span></p>
              <p className="field-name">Time<span> {selectedEvent.time}</span></p>
              <p className="field-name">Interested Persons<span> {selectedEvent.attend}</span></p>
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
