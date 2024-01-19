import React, { useState } from 'react';
import './Events.css';
import RightSide from '../RigtSide/RightSide';
import Sidebar from '../Sidebar';

const EventTable = () => {
  // Use state to manage events
  const [events, setEvents] = useState([
    { name: 'Food Drive', description: 'Description of Event 1', participants: 50 },
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
  const handleCreateNewEvent = () => {
    const newEvent = {
      name: `Event ${events.length + 1}`,
      description: `Description of Event ${events.length + 1}`,
      participants: 0,
    };
    setEvents([...events, newEvent]);
  };

  return (
    <div className='main-event'>
      <h2>EVENTS</h2>
      <div className="event-container">
        <table className="event-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Participants</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td>{event.participants}</td>
                <td>
                  <button className="cancel-event-button" onClick={() => handleCancelEvent(index)}>
                    Cancel Event
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="button-container">
          <button className="new-event-button" onClick={handleCreateNewEvent}>
            Create New Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventTable;
