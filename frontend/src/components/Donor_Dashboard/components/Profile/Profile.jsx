// Profile.jsx
import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState('Srikanth');
  const [editedEmail, setEditedEmail] = useState('srikanth@gmail.com');
  const [editedContact, setEditedContact] = useState('1234567894');

  const handleEditProfileClick = () => {
    setIsEditMode(true);
  };

  const handleSaveChangesClick = () => {
    // Save changes to the backend or update state as needed
    setIsEditMode(false);
  };

  return (
    <div className='heading'>
      <h1>Manager's Profile</h1>
      <div className="profile-container">
        <div className="profile-picture">
          {/* Replace the image source with your profile picture URL */}
          <img src="https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile" />
        </div>
        <div className="profile-details">
          {isEditMode ? (
            <>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <input
                type="text"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
              <input
                type="text"
                value={editedContact}
                onChange={(e) => setEditedContact(e.target.value)}
              />
              <button onClick={handleSaveChangesClick}>Save Changes</button>
            </>
          ) : (
            <>
              <h2>{editedName}</h2>
              <p>Email: {editedEmail}</p>
              <p>Contact no. : {editedContact}</p>
              <div className="profile-buttons">
                <button className="edit-profile-button" onClick={handleEditProfileClick}>
                  Edit Profile
                </button>
                <button className="change-password-button">Change Password</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
