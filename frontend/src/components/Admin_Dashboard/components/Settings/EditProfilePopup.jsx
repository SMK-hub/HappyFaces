// EditProfilePopup.js

import React, { useState } from 'react';
import './EditProfilePopup.css';

const EditProfilePopup = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const[email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveChanges = () => {
    // Implement logic to save changes
    // For demonstration purposes, simply log the changes
    console.log("Username:", username);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);

    // Close the popup after saving changes
    onClose();
  };

  return (
    <div className="edit-profile-popup">
      <div className="popup-content">
        <span className="close-icon" onClick={onClose}>
          &times;
        </span>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="save-changes-button" onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
};

export default EditProfilePopup;
