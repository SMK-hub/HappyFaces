import React, { useState, useEffect } from "react";
import "./OrphDash.css";
import { fetchOrphanageDetailsData } from "../../Data/Data";
import '@fortawesome/fontawesome-free/css/all.css';
import ImagePopup from "./ImagePopup";
import { jsPDF } from "jspdf";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import RazorPay from '../Details/RazorPay'; // Corrected import statement
import {useUser} from '../../../../UserContext'
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { API_BASE_URL } from "../../../../config";
 
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${15 * cols}&h=${15 * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${15 * cols}&h=${15 * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}
 
const OrphDash = () => {
  const [imagePopupVisible, setImagePopupVisible] = useState(false);
  const [donationRazorPayVisible, SetdonationRazorPayVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedOrphanage, setSelectedOrphanage] = useState();
  const [selectedRequirement, setSelectedRequirement] = useState("All");
  const [eventDetailsVisible, setEventDetailsVisible] = useState(false);
  const [registrationSuccessVisible, setRegistrationSuccessVisible] = useState(false);
  const [donationPopupVisible, setDonationPopupVisible] = useState(false);
  const [donationDescriptionVisible, setDonationDescriptionVisible] = useState(false);
  const [viewImagesPopupVisible, setViewImagesPopupVisible] = useState(false); // New state for view images pop-up
  const [donationDescription, setDonationDescription] = useState('');
  const [allEventData, setAllEventData] = useState();
  const [RegisteringProcess,setRegisteringProcess] = useState(false);
 
  const  {setUserData} = useUser();
  const {userDetails} = useUser();
  console.log(userDetails);
 
  const[orphanagesData,setOrphanagesData] = useState([])
  useEffect(()=>{
    const fetch=async()=>{
        try{
      const res=await fetchOrphanageDetailsData();
      console.log(res);
      setOrphanagesData(res);
    }catch(error){
      console.log(error);    
    }
    }
    fetch();
   
  },[])
 
 
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };
 
  const handleRequirementChange = (e) => {
    setSelectedRequirement(e.target.value);
  };
 
  const openModal = async (orphanage) => {
    // const events = await fetchEvents(orphanage.orpId);
    const orphanageWithImageData=await fetchImageData(orphanage.orpId);
    const orphanagaeWithEventData=await fetchEventData(orphanage.orpId);
    const orphanageWithAllEventData=await fetchAllEventData(orphanage.orpId);
    const eventParticipant = await Promise.all(
      orphanagaeWithEventData.map(async(event)=>{        
        const participant = await fetchParticipatedDonorsId(event.id);
        return {
          ...event,
          participantData:participant,
        }
      })
    )
    setSelectedOrphanage({
      ...orphanage,
      imageData:orphanageWithImageData,
      eventData:eventParticipant,
      allEventData:orphanageWithAllEventData
    });
  };
  console.log(selectedOrphanage);
 
  const fetchAllEventData = async (orpId)=>{
    try{
      const response=await axios.get(`${API_BASE_URL}/donor/VerifiedEvents/${orpId}`);
      const filteredData = response.data.filter(
        (event) => event.eventStatus === 'PLANNED' || event.eventStatus === 'ONGOING'
      );
      console.log(filteredData);
      return filteredData;
     
    }catch(error){
      console.log(error);
    }
  }
  const fetchParticipatedDonorsId = async (eventId)=>{
      try{
        const response=await axios.get(`${API_BASE_URL}/donor/participatedDonorsId/${eventId}`);
        return response.data;
      }catch(error){
        alert(error);
      }
  }
  const fetchImageData = async (orpId)=> {
    try{
      const response=await axios.get(`${API_BASE_URL}/orphanage/${orpId}/orphanageDetails/viewImages`);
      return response.data;
 
    }catch(error)
    {
      console.log(error);
    }
  }
  const fetchEventData = async(orpId)=> {
    try{
      const response= await axios.get(`${API_BASE_URL}/donor/VerifiedEvents/${orpId}`);
      return response.data;
    }catch(error)
  {
    console.log(error);
  }
  }
 
  const closeModal = () => {
    setSelectedOrphanage();
    setEventDetailsVisible(false);
  };
 
  const openImagePopup = () => {
    setImagePopupVisible(true);
  };
 
  const closeImagePopup = () => {
    setImagePopupVisible(false);
  };
 
  const openViewImagesPopup = () => {
    setViewImagesPopupVisible(true);
  };
 
  const closeViewImagesPopup = () => {
    setViewImagesPopupVisible(false);
  };
 
  const downloadCertificates = async(orpId,orpName) => {
    try{
      const response = await axios.get(`${API_BASE_URL}/orphanage/getCertificate/${orpId}`, { responseType: 'blob' });
        const status = response.status;
        if (status === 200) {
            const blob = new Blob([response.data], { type: 'application/pdf' });
            if (blob.size === 0) {
              alert('The file is empty.');
              return;
          }
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${orpName}_certificates.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } else {
            alert(response.status);
        }
 
    }catch(error){
      console.log(error);
    }
  };
 
  const handleEventsButtonClick = () => {
    setEventDetailsVisible(true);
  };
 
  const handleEventDetailsClose = () => {
    setEventDetailsVisible(false);
  };
 
  const handleRegisterEvent = async(eventId) => {
    try{
      setRegisteringProcess(true);
      const response= await axios.post(`${API_BASE_URL}/donor/${userDetails?.donorId}/eventRegister/${eventId}`);
      console.log("Event registered");
     
      setRegistrationSuccessVisible(true);
    }catch(error){
      console.log(error);
      alert(error);
    }
    finally{
      setRegisteringProcess(false);
      window.location.reload();
    }
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
 
  const handledonationRazorPayVisible  = () => {
    SetdonationRazorPayVisible(!donationRazorPayVisible);
  }
 
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
    const data = {
      orpId: selectedOrphanage.orpId,
      donorId: userDetails.donorId,
      description: donationDescription
    };
    saveDonationData(data);
    console.log("Donation description saved");
    setDonationDescription('');
    setDonationDescriptionVisible(false);
  };
 
  const handleThumbnailClick = (index) => {
    // Handle thumbnail click, update main image with selected index
  };
 
  const filteredOrphanages = orphanagesData.filter((orphanage) => {
    return (
      (selectedLocation === "All" || orphanage.location === selectedLocation) &&
      (selectedRequirement === "All" || orphanage.requirements === selectedRequirement)
    );
  });
 
  const pictureUrl = (image) => {
    return `data:image/jpeg;base64,${image}`;
  };
 
  const saveDonationData = async (data) => {
    try {
      // Send the data to your backend API for saving
      const response = await axios.post(`${API_BASE_URL}/donor/save/DonationRequirement`, data);
      // Handle success response if needed
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error('Error saving donation data:', error);
    }
  };
   
  return (
    <div>
      <div className="OrphDash">
        <h2>Orphanages</h2>
        <div className="OrphDash-inside">
          {/* <div className="search-item">
            <label htmlFor="locationFilter">Search by Location :</label>
            <select id="locationFilter" value={selectedLocation} onChange={handleLocationChange}>
              {uniqueLocations?.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div> */}
          {/* <div className="search-item">
            <label htmlFor="requirementFilter">Search by Requirements :</label>
            <select id="requirementFilter" value={selectedRequirement} onChange={handleRequirementChange}>
              {uniqueRequirements?.map((requirements, index) => (
                <option key={index} value={requirements}>
                  {requirements}
                </option>
              ))}
            </select>
          </div> */}
        </div>
 
        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Orphanage Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Details</th>
              <th>Requirement</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrphanages?.map((orphanage, index) => (
              <tr key={index}>
                <td>{orphanage.orphanageName}</td>
                <td>{orphanage.address.house_no},{orphanage.address.street},{orphanage.address.city}-{orphanage.address.postalCode},{orphanage.address.state},{orphanage.address.country}</td>
                <td>{orphanage.contact}</td>
                <td>
                  <button onClick={() => openModal(orphanage)}>Details</button>
                </td>
                <td>{orphanage.requirements?.need}</td>
              </tr>
            ))}
          </tbody>
        </table>
 
        {/* Modal */}
        {selectedOrphanage && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h3>{selectedOrphanage.orphanageName}</h3>
              <p className="field-name">Orphanage Name:<span> {selectedOrphanage.orphanageName}</span></p>
              <p className="field-name">Director:<span> {selectedOrphanage.directorName}</span></p>
              <p className="field-name">Location:
              <span>
                {selectedOrphanage.address.house_no},
                {selectedOrphanage.address.street},
                {selectedOrphanage.address.city}-{selectedOrphanage.address.postalCode},
                {selectedOrphanage.address.state},
                {selectedOrphanage.address.country}
                </span>
              </p>
              <p className="field-name">Email:<span>{selectedOrphanage.orphanageEmail}</span></p>
              <p className="field-name">Description:<span>{selectedOrphanage.description}</span></p>
              <p className="field-name">Website:<span>{selectedOrphanage.website}</span></p>
              <p className="field-name">Certificates:{" "} <button onClick={() => downloadCertificates(selectedOrphanage.orpId,selectedOrphanage.orphanageName)}>Download</button></p>
              <p className="field-name">View Images:{" "} <button onClick={openViewImagesPopup}>View Images</button><span></span></p>
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
        {eventDetailsVisible && selectedOrphanage && (
          <div className="modal">
            <div className="event-details-content">
              <span className="close" onClick={handleEventDetailsClose}>&times;</span>
              <h3>{selectedOrphanage.orphanageName} - Event Details</h3>
 
              {/* Display Events in a Table */}
              <table>
                <thead>
                  <tr>
                    <th>Orphanage Name</th>
                    <th>Event Name</th>
                    <th>Event Description</th>
                    <th>Date/Time</th>
                    <th>Register Event</th>
                  </tr>
                </thead>
                <tbody>
                {console.log(selectedOrphanage.allEventData)}
                  {selectedOrphanage.allEventData?.map((event, index) => (
                   
                    <tr key={index}>
                      <td>{selectedOrphanage.orphanageName}</td>
                      <td>{event.title}</td>
                      <td>{event.description}</td>
                      <td>{event.date} {event.time}</td>
                      <td>
                        {console.log(selectedOrphanage.eventData[index].participantData)}
                      <LoadingButton
                          disabled={selectedOrphanage.eventData[index].participantData?.includes(userDetails.donorId)}  
                          loading={RegisteringProcess}
                         
                          loadingIndicator={<div>Registering...</div>}
                          onClick={() => handleRegisterEvent(event.id)}
                          style={{
                            cursor: selectedOrphanage.eventData[index].participantData ? (selectedOrphanage.eventData[index].participantData.includes(userDetails.donorId) ? 'not-allowed' : 'pointer') : 'pointer',
                            backgroundColor: selectedOrphanage.eventData[index].participantData ? (selectedOrphanage.eventData[index].participantData.includes(userDetails.donorId) ? 'grey' : 'initial') : 'initial',
                          }}
                          > Register Event</LoadingButton>
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
        {donationPopupVisible && selectedOrphanage&& (
          <div className="modal">
            <div className="donation-popup-content">
              <span className="close" onClick={() => setDonationPopupVisible(false)}>&times;</span>
              <h3>Donate to {selectedOrphanage.orphanageName}</h3>
              <p>Choose a donation option:</p>
              <div className="button-container">
                <button onClick={() => handleDonationOption('Requirements')}>Donate Requirements</button>
                <button onClick={() => handledonationRazorPayVisible()}>Donate Money</button>
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
          <h3>Donate Requirements - {selectedOrphanage.orphanageName}</h3>
          <p>Enter a description of the requirements you wish to donate:</p>
          <textarea
            placeholder="Description"
            rows="4"
            cols="50"
            value={donationDescription}
            onChange={(e) => setDonationDescription(e.target.value)}
          ></textarea>
          <div className="button-container">
            <button onClick={handleDonationDescriptionSave}>Notify Orphanage</button>
            <button onClick={() => { handleDonationDescriptionClose(); setDonationDescription(''); }}>Close</button>
          </div>
        </div>
      </div>
    )}
 
{donationRazorPayVisible && (
          <div className="modal donation-description-modal">
            <div className="donation-description-popup-content">
              <RazorPay onClose={handledonationRazorPayVisible} selectedOrphanage={selectedOrphanage}/>
             
            </div>
          </div>
        )}
 
        {/* View Images Pop-up */}
        {viewImagesPopupVisible && selectedOrphanage && (
  <div className="modal">
    <div className="view-images-content">
      <span className="close" onClick={closeViewImagesPopup}>&times;</span>
      <h3>{selectedOrphanage.orphanageName} Images</h3>
      <div className="image-container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '10px', borderRadius: '5px' }}>
        {selectedOrphanage.imageData && selectedOrphanage.imageData.length > 0 ? (
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {selectedOrphanage.imageData.map((item) => (
              <ImageListItem key={item.img}>
                <img style={{ minHeight: '200px', maxHeight: '200px', width: '150px', objectFit: 'cover' }}
                  src={`${pictureUrl(item.image)}`}
                  srcSet={`${pictureUrl(item.image)}`}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <p style={{ textAlign: 'center', color: '#333', marginTop: '20px', alignItems: 'center' }}>No Images to Display</p>
        )}
      </div>
    </div>
  </div>
)}
 
      </div>
    </div>
  );
};
export default OrphDash;