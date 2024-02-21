import React, { useEffect, useState } from 'react';
import './Events.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { message } from 'antd';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config';
import { useUser } from '../../../../UserContext';
import { CloseOutlined, EditOutlined } from '@mui/icons-material';

const EventTable = () => {
  const [events, setEvents] = useState();
  const {userDetails,setUserData} = useUser();
  const [refresh,setRefresh] = useState(false);
  useEffect(()=>{
    const fetchPlannedEvents =async()=>{
      try{
        const response= await axios.get(`${API_BASE_URL}/orphanage/plannedEvents/${userDetails.orpId}`);
        const status= response.status;
        if(status === 200){
          setEvents(response.data);
        }
        }catch(error){
          message.error(error);
        }
      }
      fetchPlannedEvents();
    },[refresh])
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();
  const [formData, setFormData] = useState({ title: '',date: '', time:'',  description: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;

  const handleCancelEvent = async (eventId) => {
       try{
        console.log(eventId);
        const response = await axios.post(`${API_BASE_URL}/orphanage/cancelEvent/${eventId}`)
        if(response.status === 200){
          message.info(response.data);
          setRefresh(!refresh);
        }
       }catch(error){
        message.error(error);
       }
  };
  const handleEditEvent = (event) =>{
    setEdit(true);
    setSelectedEvent(event);
    console.log(selectedEvent);
  }

  const handleCreateNewEvent = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
    setFormData({ 
      title: '',
      date: '', 
      time:'',  
      description: '' }); 
  };
  const handleSubmitEditEvent = async(eventId) => {
    const editEvent = {
      title: formData.title,
      date: formData.date, 
      time: formData.time,  
      description: formData.description,
      orpId: userDetails.orpId,
    }
    try{
      const response = await axios.put(`${API_BASE_URL}/orphanage/editEvents/${eventId}`,editEvent);
      const status = response.status;
      if(status === 200){
        message.info(response.data)
      }
      else{
        message.error(response.data)
      }
    }catch(error){
      message.error(error);
    }
    setEdit(false);
  }
  const handleSubmit = async() => { 
    const newEvent = { 
      title: formData.title,
      date: formData.date, 
      time: formData.time,  
      description: formData.description,
      orpId: userDetails.orpId,
     };
      try{
         const response = await axios.post(`${API_BASE_URL}/orphanage/createEvent`,newEvent);
         const status = response.status;
         if(status===200){
          message.info(response.data);
          setRefresh(!refresh);
         }
         else{
          message.info(response.data);
        } 
      }catch(error){
        message.error(error);
      }
    setOpen(false);
    setFormData({  
      title: '',
      date: '', 
      time:'',  
      description: ''}); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: value });
  };

  // Logic for pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events?.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='main-events'>
      <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: '2em', justifyContent: 'center' ,justifyItems: 'center'}}>EVENTS</h1>
      <div className="eventContainer">
        <table className="event-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Description</th>
              <th>Verification Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEvents?.map((event, index) => (
              <tr key={index}>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>{event.description}</td>
                <td>{event.verificationStatus}</td>
                <td>
                  <button className="cancel-event-button" onClick={() => handleEditEvent(event)}>
                    Edit 
                  </button>
                  <button className="cancel-event-button" onClick={() => handleCancelEvent(event.id)}>
                    Cancel 
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
        {/*New Event*/}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogContent>
            <form className="event-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Event Name:</label>
              <input type="text" id="name" name="title" value={formData.title} onChange={handleChange} required />
            <label htmlFor="date">Date:</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
              <label htmlFor="time">Time:</label>
              <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required />
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
              </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>handleClose()}>Cancel</Button>
            <Button onClick={()=>handleSubmit()}>Create</Button>
          </DialogActions>
        </Dialog>

        {/*Edit Event*/}

        <Dialog open={edit} onClose={handleClose}>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogContent>
            <form className="event-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Event Name:</label>
              <input type="text" id="name" name="title" value={formData?.title} onChange={handleChange} required />
            <label htmlFor="date">Date:</label>
              <input type="date" id="date" name="date" value={formData?.date} onChange={handleChange} required />
              <label htmlFor="time">Time:</label>
              <input type="time" id="time" name="time" value={formData?.time} onChange={handleChange} required />
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" value={formData?.description} onChange={handleChange} required />
              </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>handleClose()}>Cancel</Button>
            <Button onClick={()=>handleSubmitEditEvent(selectedEvent.id)}>Edit</Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(events?.length / eventsPerPage) }).map((_, index) => (
          <li key={index} className="page-item" style={{listStyleType: 'none'}}>
            <button onClick={() => paginate(index + 1)} 
            className={`page-link ${index + 1 === currentPage ? 'active' : ''}`}>
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventTable;
