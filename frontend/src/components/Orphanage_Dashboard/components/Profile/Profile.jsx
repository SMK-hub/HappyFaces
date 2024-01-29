import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="heading">
      <h1>Manager's Profile</h1>
      <div className="profile-container">
        <div className="profile-picture">
          {/* Replace the image source with your profile picture URL */}
          <img
            src="https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Profile"
          />
        </div>
        <div className="profile-details">
          <h2 style={{ fontFamily: 'Roboto, sans-serif' }}>Srikanth</h2>
          <table className="user-details-table">
            <tbody>
              <tr>
                <td style={{ fontFamily: 'Roboto, sans-serif' }}>Name:</td>
                <td style={{ fontFamily: 'Roboto, sans-serif' }}>Srikanth</td>
              </tr>
              <tr>
                <td style={{ fontFamily: 'Roboto, sans-serif' }}>Email:</td>
                <td style={{ fontFamily: 'Roboto, sans-serif' }}>srikanth@gmail.com</td>
              </tr>
              <tr>
                <td style={{ fontFamily: 'Roboto, sans-serif' }}>Contact no.:</td>
                <td style={{ fontFamily: 'Roboto, sans-serif' }}>1234567894</td>
              </tr>
              <tr>
                <td style={{ fontFamily: 'Roboto, sans-serif' }}>Orphanage Managed:</td>
                <td style={{ fontFamily: 'Roboto, sans-serif' }}>ABC Orphanage</td>
              </tr>
            </tbody>
          </table>

          <div className="button-container">
            <button className="change-password-button">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
