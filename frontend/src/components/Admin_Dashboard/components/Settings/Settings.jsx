// Settings.js

import React, { useState } from 'react';
import './Settings.css'; // Import the CSS file
import EditProfilePopup from './EditProfilePopup'; // Import the EditProfilePopup component
import img2 from './img2.png';
const Settings = () => {
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const name = "John Doe";
  const email = "example@email.com";
  const role = "Admin";

  const openEditPopup = () => {
    setEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditPopupOpen(false);
  };

  return (
    <div className="settings">
      <div className="card-box">
        <div className="profile-section">
          <div className="profile-circle">
            {/* Replace the icon with a circular image */}
            <img
              src={img2} 
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className="profile-details">
            <label>Name:</label>
            <div className="profile-value">{name}</div>

            <label>Email:</label>
            <div className="profile-value">{email}</div>

            <label>Role:</label>
            <div className="profile-value">{role}</div>

            <div className="profile-buttons">
              <button className="edit-profile-button" onClick={openEditPopup}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {isEditPopupOpen && <EditProfilePopup onClose={closeEditPopup} />}
    </div>
  );
};

export default Settings;
