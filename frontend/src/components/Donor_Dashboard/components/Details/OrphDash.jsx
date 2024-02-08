import React, { useState, useEffect } from "react";
import "./OrphDash.css";
import { fetchOrphanageDetailsData } from "../../Data/Data";
import '@fortawesome/fontawesome-free/css/all.css';
import ImagePopup from "./ImagePopup";
import { jsPDF } from "jspdf";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import RazorPay from '../Details/RazorPay'; // Corrected import statement
 
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
  const [selectedOrphanage, setSelectedOrphanage] = useState({
    orphanage: null,
    events: [],
  });
  const [selectedRequirement, setSelectedRequirement] = useState("All");
  const [eventDetailsVisible, setEventDetailsVisible] = useState(false);
  const [registrationSuccessVisible, setRegistrationSuccessVisible] = useState(false);
  const [donationPopupVisible, setDonationPopupVisible] = useState(false);
  const [donationDescriptionVisible, setDonationDescriptionVisible] = useState(false);
  const [viewImagesPopupVisible, setViewImagesPopupVisible] = useState(false); // New state for view images pop-up
 
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
    const events = fetchEvents();
    setSelectedOrphanage({
      orphanage,
      events,
    });
  };
 
  const closeModal = () => {
    setSelectedOrphanage({
      orphanage: null,
      events: [],
    });
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
 
  const downloadCertificates = (orphanage) => {
    const pdf = new jsPDF();
    pdf.text(`Certificates for ${orphanage.name}`, 20, 20);
    pdf.save(`${orphanage.name}_certificates.pdf`);
  };
 
  const handleEventsButtonClick = () => {
    setEventDetailsVisible(true);
  };
 
  const handleEventDetailsClose = () => {
    setEventDetailsVisible(false);
  };
 
  const handleRegisterEvent = () => {
    console.log("Event registered");
    setRegistrationSuccessVisible(true);
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
    console.log("Donation description saved");
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
 
  const fetchEvents = (orphanageId) => {
    return [
      { id: 1, dateTime: "2024-02-10 15:00:00" },
      { id: 2, dateTime: "2024-02-15 18:30:00" },
    ];
  };
 
  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
    },
  ];
 
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
              <th>Name</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Details</th>
              <th>Requirements</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrphanages?.map((orphanage, index) => (
              <tr key={index}>
                <td>{orphanage.name}</td>
                <td>{orphanage.location}</td>
                <td>{orphanage.contact}</td>
                <td>
                  <button onClick={() => openModal(orphanage)}>Details</button>
                </td>
                <td>{orphanage.requirements}</td>
              </tr>
            ))}
          </tbody>
        </table>
 
        {/* Modal */}
        {selectedOrphanage.orphanage && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h3>{selectedOrphanage.orphanage.name}</h3>
              <p className="field-name">Orphanage Name:<span> {selectedOrphanage.orphanage.name}</span></p>
              <p className="field-name">Location:<span> {selectedOrphanage.orphanage.location}</span></p>
              <p className="field-name">Director:<span> {selectedOrphanage.orphanage.director}</span></p>
              <p className="field-name">Certificates:{" "} <button onClick={() => downloadCertificates(selectedOrphanage.orphanage)}>Download</button></p>
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
        {eventDetailsVisible && selectedOrphanage.orphanage && (
          <div className="modal">
            <div className="event-details-content">
              <span className="close" onClick={handleEventDetailsClose}>&times;</span>
              <h3>{selectedOrphanage.orphanage.name} Event Details</h3>
 
              {/* Display Events in a Table */}
              <table>
                <thead>
                  <tr>
                    <th>Orphanage Name</th>
                    <th>Date/Time</th>
                    <th>Register Event</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrphanage.events.map((event, index) => (
                    <tr key={index}>
                      <td>{selectedOrphanage.orphanage.name}</td>
                      <td>{event.dateTime}</td>
                      <td>
                        <button onClick={handleRegisterEvent}>Register Event</button>
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
        {donationPopupVisible && selectedOrphanage.orphanage && (
          <div className="modal">
            <div className="donation-popup-content">
              <span className="close" onClick={() => setDonationPopupVisible(false)}>&times;</span>
              <h3>Donate to {selectedOrphanage.orphanage.name}</h3>
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
              <h3>Donate Requirements - {selectedOrphanage.orphanage.name}</h3>
              <p>Enter a description of the requirements you wish to donate:</p>
              <textarea placeholder="Description" rows="4" cols="50"></textarea>
              <div className="button-container">
                <button onClick={handleDonationDescriptionSave}>Save</button>
                <button onClick={handleDonationDescriptionClose}>Close</button>
              </div>
            </div>
          </div>
        )}

{donationRazorPayVisible && (
          <div className="modal donation-description-modal">
            <div className="donation-description-popup-content">
              <RazorPay onClose={handledonationRazorPayVisible}/>
              
            </div>
          </div>
        )}
 
        {/* View Images Pop-up */}
        {viewImagesPopupVisible && selectedOrphanage.orphanage && (
          <div className="modal">
            <div className="view-images-content">
              <span className="close" onClick={closeViewImagesPopup}>&times;</span>
              <h3>{selectedOrphanage.orphanage.name} Images</h3>
              <div className="image-container">
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default OrphDash;