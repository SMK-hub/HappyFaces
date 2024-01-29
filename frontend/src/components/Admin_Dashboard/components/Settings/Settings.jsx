// Settings.js

import React from 'react';
import './Settings.css'; // Import the CSS file
import { adminData } from '../../Data/Data';

const Settings = () => {
  // Assuming orphanagesData has email and password properties
  const { email, password } = adminData;

  return (
    <div className="settings">
      <div className="profile-section">
        <div className="profile-circle">
          <img src="path/to/your/profile-image.jpg" alt="Profile" />
        </div>
        <div className="profile-details">
          <label>Email</label>
          <div className="profile-value">{email}</div>

          <label>Password</label>
          <div className="profile-value">{password}</div>

          <div className="profile-buttons">
            <button className="edit-profile-button">Edit Profile</button>
            <button className="view-profile-button">View Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
