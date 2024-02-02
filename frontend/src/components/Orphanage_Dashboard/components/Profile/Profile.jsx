import React, { useState } from 'react';
import './Profile.css';
 
const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState('Srikanth');
  const [editedEmail, setEditedEmail] = useState('srikanth@gmail.com');
  const [editedContact, setEditedContact] = useState('1234567894');
  const [editedRole, setEditedRole] = useState('ABC Orphanage');
 
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
 
  const [additionalCondition, setAdditionalCondition] = useState(false);
  const [additionalField, setAdditionalField] = useState('');
 
  const handleEditProfileClick = () => {
    setIsEditMode(true);
    setAdditionalCondition(false);
  };
 
  const handleEditPasswordClick = () => {
    setIsEditMode(true);
    setAdditionalCondition(true);
  };
 
  const handleSaveChangesClick = () => {
    // Save changes to the backend or update state as needed
    setIsEditMode(false);
  };
 
  const handleSavePasswordChangesClick = () => {
    // Handle logic to save password changes
    // Validate passwords and perform the necessary actions
    if (newPassword === confirmPassword) {
      // Passwords match, perform the update
      console.log('Password updated successfully');
      console.log('Old Password:', oldPassword);
      console.log('New Password:', newPassword);
      console.log('Confirm Password:', confirmPassword);
      // Reset password fields
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsEditMode(false); // Hide password fields after saving
    } else {
      // Passwords do not match, display an error or handle accordingly
      console.error('Passwords do not match');
    }
  };
 
  return (
<div className="heading">
<h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: '2em' }}> Manager's Profile</h1>
<div className="profile-containers">
<div className="profile-picture">
          {/* Replace the image source with your profile picture URL */}
<img
            src="https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Profile"
          />
</div>
<div className="profile-details">
          {isEditMode ? (
<>
              {additionalCondition ? (
                // Editing password details
<>
<input
                    type="text"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Old Password"
                  />
<input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                  />
<input
                    type="text"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                  />
<button onClick={handleSavePasswordChangesClick}>Save</button>
</>
              ) : (
                // Editing profile details
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
<input
                    type="text"
                    value={editedRole}
                    onChange={(e) => setEditedRole(e.target.value)}
                  />
<button onClick={handleSaveChangesClick}>Save Changes</button>
</>
              )}
</>
          ) : (
            // Displaying profile details
<>
<table className="user-details-table">
<tbody>
<tr>
<td style={{ fontFamily: 'Roboto, sans-serif' }}>Name:</td>
<td style={{ fontFamily: 'Roboto, sans-serif' }}>{editedName}</td>
</tr>
<tr>
<td style={{ fontFamily: 'Roboto, sans-serif' }}>Email: </td>
<td style={{ fontFamily: 'Roboto, sans-serif' }}>{editedEmail}</td>
</tr>
<tr>
<td style={{ fontFamily: 'Roboto, sans-serif' }}>Contact no.: </td>
<td style={{ fontFamily: 'Roboto, sans-serif' }}>{editedContact}</td>
</tr>
<tr>
<td style={{ fontFamily: 'Roboto, sans-serif' }}>Orphanage Managed: </td>
<td style={{ fontFamily: 'Roboto, sans-serif' }}>{editedRole}</td>
</tr>
</tbody>
</table>
              {/* Button container */}
<div className="button-container">
<button className="edit-profile-button" onClick={handleEditProfileClick}>
                  Edit Profile
</button>
<button className="change-password-button" onClick={handleEditPasswordClick}>
                  Change Password
</button>
</div>
</>
          )}
</div>
</div>
</div>
  );
};
 
export default Profile;