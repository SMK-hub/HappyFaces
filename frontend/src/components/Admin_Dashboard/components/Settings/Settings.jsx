// Settings.js

import React, { useState } from 'react';
import './Settings.css'; // Import the CSS file
import EditProfilePopup from './EditProfilePopup'; // Import the EditProfilePopup component

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const name = "John Doe";
  const email = "example@email.com";
  const password = "yourpassword";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
            {/* Using an external icon for a female user from Font Awesome */}
            <i className="fas fa-user-circle fa-5x"></i>
          </div>
          <div className="profile-details">
            <label>Name:</label>
            <div className="profile-value">{name}</div>

            <label>Email:</label>
            <div className="profile-value">{email}</div>

            <label>Password:</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                readOnly
                className="profile-value"
              />
              <span onClick={togglePasswordVisibility} className="eye-icon">
                {showPassword ? '👁️' : '🔒'}
              </span>
            </div>

            <div className="profile-buttons">
              <button className="edit-profile-button" onClick={openEditPopup}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {isEditPopupOpen && (
        <EditProfilePopup onClose={closeEditPopup} />
      )}
    </div>
  );
};

export default Settings;
