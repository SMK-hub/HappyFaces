import React, { useEffect, useState } from 'react';
import './Events.css';
import axios from 'axios';
import {useUser} from '../../../../UserContext'

const EventTable = () => {
  // Use state to manage events
  const [events, setEvents] = useState();
  const [interestedPerson,setInterestedPerson] = useState();
  const [cancelEventId,setCancelEventId] = useState();
  const [render,setRender] = useState(false);
  const  {setUserData} = useUser();
  const {userDetails} = useUser();
useEffect(()=>{
  const participatedEvents = async()=>{
    try{
      const response=await axios.get(`http://localhost:8079/donor/RegisteredEvents/${userDetails.donorId}`);
      const status=response.status;
      const responseWithEventData = await Promise.all(response.data.map(async(interestedPerson)=>{
        const eventData=await fetchEventData(interestedPerson.eventId);
        
        return {
          ...interestedPerson,
          eventData:eventData,
        }
      }))
      console.log(responseWithEventData);

      setInterestedPerson(responseWithEventData);
    }catch(error){
      console.log(error);
    }
  } 
  participatedEvents();
},[render])
  
const fetchEventData = async (eventId) => {
  try {
      const response = await axios.get(`http://localhost:8079/donor/Event/${eventId}`);
      const status = response.status;
      
      if (status === 200) {
        const data=response.data;
        const orphanageDetails =await fetchOrphanageDetails(data.orpId);
        
        return{
          ...response.data,
          OrphanageData: orphanageDetails,
        }        
      }
  } catch (error) {
      console.log(error);
      return null;
  }
}

const fetchOrphanageDetails = async (orpId)=>{
  try{
    const response=await axios.post(`http://localhost:8079/donor/${orpId}/OrphanageDetails`)
    console.log(response+"*");
    const status = response.status;
      if (status === 200) {
          return response.data;
      }
  }catch (error) {
    console.log(error);
    return null;
}
}

  // State for cancel registration pop-up
  const [cancelRegistrationVisible, setCancelRegistrationVisible] = useState(false);

  // State for cancellation success pop-up
  const [cancellationSuccessVisible, setCancellationSuccessVisible] = useState(false);

  // Index of the event to cancel registration
  const [cancelIndex, setCancelIndex] = useState(null);

  // Function to handle cancel event for a specific index
  const handleCancelEvent = (eventId) => {
    setCancelIndex(eventId);
    setCancelEventId(eventId);
    setCancelRegistrationVisible(true);
  };

  // Function to confirm cancel registration
  const handleConfirmCancel = async() => {
    try{
      console.log(interestedPerson)
      const response = await axios.post(`http://localhost:8079/donor/${userDetails.donorId}/cancelEventRegister/${cancelEventId}`);
      
      const status=response.status;
      console.log(status);
      if(status === 200){
        setCancelRegistrationVisible(false);
        setCancellationSuccessVisible(true);
      }
    }catch(error){
      console.log(error);
      alert(error);
    }finally{
      setRender(!render);
    }

    
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
            {interestedPerson?.map((event, index) => (
              <tr key={index}>
                <td>{event.eventData.OrphanageData?.orphanageName}</td>
                <td>{event.eventData.title}</td>
                <td>{event.eventData.description}</td>
                <td>{event.eventData.date} {event.eventData.time}</td>
                <td>
                  <button className="cancel-event-button" onClick={() => handleCancelEvent(event.eventId)}>
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