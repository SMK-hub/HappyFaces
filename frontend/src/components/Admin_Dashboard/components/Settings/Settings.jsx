// Settings.js

import React, { useState, useEffect } from 'react';
import './Settings.css'; // Import the CSS file
import EditProfilePopup from './EditProfilePopup'; // Import the EditProfilePopup component
import img2 from './img2.png';

const Settings = () => {
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(() => {
    // Retrieve the image from localStorage on component mount
    const storedImage = localStorage.getItem('profileImage');
    return storedImage || img2;
  });
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("example@email.com");
  const role = "Admin";

  useEffect(() => {
    // Save the profile image to localStorage whenever it's updated
    localStorage.setItem('profileImage', profileImage);
  }, [profileImage]);

  const openEditPopup = () => {
    setEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditPopupOpen(false);
  };

  // Callback functions to update profile details
  const updateProfileImage = (newImage) => {
    setProfileImage(newImage);
  };

  const updateProfileDetails = (newName, newEmail) => {
    setName(newName);
    setEmail(newEmail);
  };

  const altText = profileImage ? "Profile" : "Default Profile";

  return (
    <div className="settings">
      <div className="card-box">
        <div className="profile-section">
          <div className="profile-circle">
            {/* Replace the icon with a circular image */}
            <img
              src={profileImage}
              alt={altText}
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

      {isEditPopupOpen && (
        <EditProfilePopup
          onClose={closeEditPopup}
          onUpdateProfileImage={updateProfileImage}
          onUpdateProfileDetails={updateProfileDetails}
        />
      )}
    </div>
  );
};

export default Settings;
