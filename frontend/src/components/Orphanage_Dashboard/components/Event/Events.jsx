import React, { useState } from 'react';
import './Events.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const EventTable = () => {
  const [events, setEvents] = useState([
    { date: '15/02/2024' , time: '12:00 P.M.', name: 'Food Drive', description: 'Description of Event 1', participants: 50 },
    { date: '25/02/2024' , time: '04:00 P.M.', name: 'Book Donation', description: 'Description of Event 2', participants: 30 },
    // Add more events as needed
  ]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ date: '', time:'', name: '', description: '', participants: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;

  const handleCancelEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index + (currentPage - 1) * eventsPerPage, 1);
    setEvents(updatedEvents);
  };

  const handleCreateNewEvent = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ date: '', time:'', name: '', description: '', participants: '' }); // Reset form data
  };

  const handleSubmit = () => { 
    const newEvent = { date: formData.date, time:formData.time, name: formData.name, description: formData.description, participants: parseInt(formData.participants) };
    setEvents([...events, newEvent]);
    setOpen(false);
    setFormData({  date: '', time:'', name: '', description: '', participants: '' }); // Reset form data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the input is for participants and validate it to allow only positive numbers
    if (name === 'participants') {
      if (value === '' || parseInt(value) > 0) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Logic for pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='main-events'>
      <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: '2em', justifyContent: 'center' ,justifyItems: 'center'}}>EVENTS</h1>
      <div className="eventContainer">
        <table className="event-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Name</th>
              <th>Description</th>
              <th>Participants</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.map((event, index) => (
              <tr key={index}>
                <td>{event.date}</td>
                <td>{event.time}</td>
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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogContent>
            <form className="event-form" onSubmit={handleSubmit}>
            <label htmlFor="date">Date:</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
              <label htmlFor="time">Time:</label>
              <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required />
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
              <label htmlFor="participants">Participants:</label>
              <input type="number" id="participants" name="participants" value={formData.participants} onChange={handleChange} min="1" required />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(events.length / eventsPerPage) }).map((_, index) => (
          <li key={index} className="page-item">
            <button onClick={() => paginate(index + 1)} className="page-link">
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventTable;
