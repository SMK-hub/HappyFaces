// Profile.jsx
import React, { useState } from 'react';
import './Profile.css';
import {useUser} from '../../../../UserContext'
import axios from 'axios';

const Profile = () => {
   const [isEditMode, setIsEditMode] = useState(false);
   const [isChangePasswordMode, setIsChangePasswordMode] = useState(false);

  // const [editedName, setEditedName] = useState('Srikanth');
  // const [editedEmail, setEditedEmail] = useState('srikanth@gmail.com');
  // const [editedContact, setEditedContact] = useState('1234567894');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState('');

  const  {setUserData} = useUser();

  const [donorDetail,setDonorDetail] = useState({
    name:"",
    email:"",
    contact:""
  });

  const {userDetails} = useUser();

  const handleEditProfileClick = () => {
    setIsEditMode(true);
    setIsChangePasswordMode(false);
  };

  const handleSaveChangesClick = async() => {
    try{
      const response=await axios.post(`http://localhost:8079/donor/${userDetails?.donorId}/editProfile`,donorDetail);
      const status=response.status;
      console.log(status);
      if(status == 200){
        setUserData(null);
        setUserData(response.data);
        setIsEditMode(false);
      }
    }catch(error){
      alert("Try Again Later");
      console.log(error.message);
    }
    
  };

  const handleChangePasswordClick = () => {
    setIsChangePasswordMode(true);
    setIsEditMode(false);
    setPasswordMismatchError('');
  };

  const handleSavePasswordChangesClick = () => {
    if (newPassword !== confirmPassword) {
      setPasswordMismatchError('New password and confirm password do not match');
    } else {
      // Implement logic to save password changes
      setIsChangePasswordMode(false);
      setPasswordMismatchError('');
    }
  };

  const handleTogglePasswordVisibility = (field) => {
    if (field === 'new') {
      setNewPasswordVisibility(!newPasswordVisibility);
    } else if (field === 'confirm') {
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  };

  const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

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
                placeholder={userDetails?.name}
                onChange={(e) => setDonorDetail({...donorDetail,name:e.target.value})}
              />
              <input
                type="text"
                placeholder={userDetails?.email}
                onChange={(e) => setDonorDetail({...donorDetail,email:e.target.value})}
              />
              <input
                type="text"
                placeholder={userDetails?.contact}
                onChange={(e) => setDonorDetail({...donorDetail,contact:e.target.value})}
              />
              <div className="button-group">
                <button onClick={handleSaveChangesClick}>Save Changes</button>
                <button onClick={() => setIsEditMode(false)}>Back</button>
              </div>
            </>
          ) : isChangePasswordMode ? (
            <>
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <div className="password-input">
                <input
                  type={newPasswordVisibility ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <span
                  className={`password-toggle ${newPasswordVisibility ? "visible" : ""}`}
                  onClick={() => handleTogglePasswordVisibility('new')}
                >
                  {/* <i className="fas fa-eye"></i> */}
                </span>
              </div>
              <div className="password-input">
                <input
                  type={confirmPasswordVisibility ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className={`password-toggle ${confirmPasswordVisibility ? "visible" : ""}`}
                  onClick={() => handleTogglePasswordVisibility('confirm')}
                >
                  {/* <i className="fas fa-eye"></i> */}
                </span>
              </div>
              {passwordMismatchError && <p className="error-message">{passwordMismatchError}</p>}
              <div className="button-group">
                <button onClick={handleSavePasswordChangesClick}>Save Password Changes</button>
                <button onClick={() => setIsChangePasswordMode(false)}>Back</button>
              </div>
            </>
          ) : (
            <>
              <h2>{userDetails?.name}</h2>
              <p>Email: {userDetails?.email}</p>
              <p>Contact no. : {userDetails?.contact}</p>
              <div className="profile-buttons">
                <button className="edit-profile-button" onClick={handleEditProfileClick}>
                  Edit Profile
                </button>
                <button className="change-password-button" onClick={handleChangePasswordClick}>
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
