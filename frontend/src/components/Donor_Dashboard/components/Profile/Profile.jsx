// Profile.jsx
import React from 'react';
import './Profile.css';


const Profile = () => {
  return (
    <div className='heading'>
      <h1>Manager's Profile</h1>
      <div className="profile-container">
      <div className="profile-picture">
        {/* Replace the image source with your profile picture URL */}
        <img src="https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile" />
      </div>
      <div className="profile-details">
        <h2>Srikanth</h2>
        <p>Email: srikanth@gmail.com</p>
        <p>Contact no. : 1234567894</p>
        
        {/* Add other user details as needed */}
      </div>
    </div>
    </div>
    

  );
};

export default Profile;
