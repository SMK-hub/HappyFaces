import React, { useState } from 'react';
import './Events.css';
 
const EventTable = () => {
  // Use state to manage events
  const [events, setEvents] = useState([
    { Orphanage_Name: 'Food Drive', Event_Name: 'Description of Event 1', Description: 'Event 1 Description', Date: '2024-02-10 15:00:00' },
    { Orphanage_Name: 'Book Donation', Event_Name: 'Description of Event 2', Description: 'Event 2 Description', Date: '2024-02-15 18:30:00' },
    // Add more events as needed
  ]);
 
  // State for cancel registration pop-up
  const [cancelRegistrationVisible, setCancelRegistrationVisible] = useState(false);
 
  // State for cancellation success pop-up
  const [cancellationSuccessVisible, setCancellationSuccessVisible] = useState(false);
 
  // Index of the event to cancel registration
  const [cancelIndex, setCancelIndex] = useState(null);
 
  // Function to handle cancel event for a specific index
  const handleCancelEvent = (index) => {
    setCancelIndex(index);
    setCancelRegistrationVisible(true);
  };
 
  // Function to confirm cancel registration
  const handleConfirmCancel = () => {
    // Cancel registration logic
    const updatedEvents = [...events];
    updatedEvents.splice(cancelIndex, 1);
    setEvents(updatedEvents);
 
    // Close cancel registration pop-up
    setCancelRegistrationVisible(false);
 
    // Show cancellation success pop-up
    setCancellationSuccessVisible(true);
  };
 
  // Function to handle cancel registration cancellation
  const handleCancelCancel = () => {
    // Close cancel registration pop-up
    setCancelRegistrationVisible(false);
 
    // Clear cancelIndex
    setCancelIndex(null);
  };
 
  return (
    <div className='main-event'>
      <h2>EVENTS</h2>
      <div className="event-container">
        <table className="event-table">
          <thead>
            <tr>
              <th>Orphanage_Name</th>
              <th>Event_Name</th>
              <th>Description</th>
              <th>Date/Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td>{event.Orphanage_Name}</td>
                <td>{event.Event_Name}</td>
                <td>{event.Description}</td>
                <td>{event.Date}</td>
                <td>
                  <button className="cancel-event-button" onClick={() => handleCancelEvent(index)}>
                    Cancel Registration
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      {/* Cancel Registration Pop-up */}
      {cancelRegistrationVisible && (
        <div className="modal">
          <div className="modal-content">
            <h3>Cancel Registration</h3>
            <p>Are you sure you want to cancel the registration?</p>
            <div className="button-container">
              <button onClick={handleConfirmCancel}>Yes</button>
              <button onClick={handleCancelCancel}>No</button>
            </div>
          </div>
        </div>
      )}
 
      {/* Cancellation Success Pop-up */}
      {cancellationSuccessVisible && (
        <div className="modal">
          <div className="modal-content">
            <h3>Registration Cancelled Successfully!</h3>
            <button onClick={() => setCancellationSuccessVisible(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default EventTable;