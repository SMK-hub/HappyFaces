import React, { useState } from 'react';
import './Events.css';


const EventTable = () => {
  // Use state to manage events
  const [events, setEvents] = useState([
    { Orphanage_Name: 'Food Drive', description: 'Description of Event 1', participants: 50 },
    { name: 'Book Donation', description: 'Description of Event 2', participants: 30 },
    // Add more events as needed
  ]);

  // Function to handle cancel event for a specific index
  const handleCancelEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
  };

  // Function to handle create new event
  // const handleCreateNewEvent = () => {
  //   const newEvent = {
  //     Orphanage_Name: `Event ${events.length + 1}`,
  //     Event_Name: `Description of Event ${events.length + 1}`,
  //     Description: 0,
  //   };
  //   setEvents([...events, newEvent]);
  // };

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
    </div>
  );
};

export default EventTable;
