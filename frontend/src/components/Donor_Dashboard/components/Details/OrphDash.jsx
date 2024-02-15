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
      const response=await axios.get(`http://localhost:8079/donor/VerifiedEvents/${orpId}`);
      console.log(response.data);
      return response.data;
      
    }catch(error){
      console.log(error);
    }
  }
  const fetchParticipatedDonorsId = async (eventId)=>{
      try{
        const response=await axios.get(`http://localhost:8079/donor/participatedDonorsId/${eventId}`);
        return response.data;
      }catch(error){
        alert(error);
      }
  }
  const fetchImageData = async (orpId)=> {
    try{
      const response=await axios.get(`http://localhost:8079/orphanage/${orpId}/orphanageDetails/viewImages`);
      return response.data;

    }catch(error)
    {
      console.log(error);
    }
  }
  const fetchEventData = async(orpId)=> {
    try{
      const response= await axios.get(`http://localhost:8079/donor/VerifiedEvents/${orpId}`);
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
      const response = await axios.get(`http://localhost:8079/orphanage/getCertificate/${orpId}`, { responseType: 'blob' });
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

  const viewCertificates = async (orpId) => {
    try {
      const response = await axios.get(`http://localhost:8079/orphanage/getCertificate/${orpId}`, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Open the PDF file in a new tab
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error viewing PDF:', error);
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
      const response= await axios.post(`http://localhost:8079/donor/${userDetails?.donorId}/eventRegister/${eventId}`);
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
      const response = await axios.post('http://localhost:8079/donor/save/DonationRequirement', data);
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
              <p className="field-name">Certificates:{" "} 
                <button onClick={() => downloadCertificates(selectedOrphanage.orpId, selectedOrphanage.orphanageName)}>Download</button>
                <button onClick={() => viewCertificates(selectedOrphanage.orpId)}>View PDF</button>
              </p>
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
                          loadingPosition="start" 
                          onClick={() => handleRegisterEvent(event.id)} 
                          variant="contained"
                          endIcon={<i class="fa fa-check"></i>}
                        >
                          {selectedOrphanage.eventData[index].participantData?.includes(userDetails.donorId) ? 'Registered' : 'Register'}
                        </LoadingButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
 
        {/* Donation Popup */}
        {donationPopupVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setDonationPopupVisible(false)}>&times;</span>
              <h3>Donate</h3>
              <div className="donation-options">
                <button onClick={() => handleDonationOption('Requirements')}>Donation Requirements</button>
                <button onClick={() => handleDonationOption('Others')}>Others</button>
              </div>
            </div>
          </div>
        )}
 
        {/* Donation Description Popup */}
        {donationDescriptionVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleDonationDescriptionClose}>&times;</span>
              <h3>Donation Description</h3>
              <textarea
                value={donationDescription}
                onChange={(e) => setDonationDescription(e.target.value)}
              />
              <button onClick={handleDonationDescriptionSave}>Save</button>
            </div>
          </div>
        )}
 
        {/* Registration Success Popup */}
        {registrationSuccessVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleRegistrationSuccessClose}>&times;</span>
              <h3>Registration Successful</h3>
              <p>You have successfully registered for the event.</p>
            </div>
          </div>
        )}

        {/* RazorPay Donation Popup */}
        {donationRazorPayVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handledonationRazorPayVisible}>&times;</span>
              <h3>Donate via RazorPay</h3>
              <RazorPay/>
            </div>
          </div>
        )}

        {/* View Images Popup */}
        {viewImagesPopupVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeViewImagesPopup}>&times;</span>
              <h3>View Images</h3>
              <ImageList variant="masonry" cols={3} gap={8}>
                {selectedOrphanage.imageData.map((item) => (
                  <ImageListItem key={item.id}>
                    <img
                      src={pictureUrl(item.image)}
                      alt={item.alt}
                      onClick={openImagePopup}
                      style={{ cursor: "pointer" }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default OrphDash;

