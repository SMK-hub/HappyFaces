import React, { useState } from 'react';
import './Profile.css';
import {useUser} from '../../../../UserContext'
import axios from 'axios';
 
const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  // const [editedName, setEditedName] = useState('Srikanth');
  // const [editedEmail, setEditedEmail] = useState('srikanth@gmail.com');
  // const [editedContact, setEditedContact] = useState('1234567894');
  // const [editedRole, setEditedRole] = useState('ABC Orphanage');
 
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState('');

 
  const [additionalCondition, setAdditionalCondition] = useState(false);
  const [additionalField, setAdditionalField] = useState('');
 
  const  {setUserData} = useUser();

  const [orphanageDetail,setOrphanageDetail] = useState({
    name:"",
    email:"",
    contact:""
  });

  const {userDetails} = useUser();

  const handleEditProfileClick = () => {
    setIsEditMode(true);
    setAdditionalCondition(false);
  };
 
  const handleEditPasswordClick = () => {
    setIsEditMode(true);
    setAdditionalCondition(true);
  };
 
  const handleSaveChangesClick = async () => {
    try{
      const response=await axios.put(`http://localhost:8079/orphanage/${userDetails?.orpId}/editProfile`,orphanageDetail);
      const status=response.status;
      console.log(response.data);
      if(status==200){
        setUserData(response.data);
        console.log(response.data);
        setIsEditMode(false);
      }
    }catch(error){
      alert("Try Again Later");
      console.log(error);
    }
  };
  const handelEditBackClick = () => {
    setIsEditMode(false);
  };
 
  const handleSavePasswordChangesClick =async () => {
    if(oldPassword !== userDetails?.password){
      setPasswordMismatchError('Enter Correct Password');
      alert(passwordMismatchError);
    }
    else if (newPassword !== confirmPassword) {
      setPasswordMismatchError('New password and confirm password do not match');
      alert(passwordMismatchError);
    } else {
      try{
        const response = await axios.post(`http://localhost:8079/orphanage/ChangePassword/${userDetails?.email}/${oldPassword}/${newPassword}/${confirmPassword}`);
        const status = response.status;
        if(status == 200){
          setUserData(response.data);
          console.log(response.data);
          setIsEditMode(false);
          setPasswordMismatchError('');
        }
      }catch(error){
        alert("Try Again Later");
        console.log(error);
      }
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
          <div className='text-field'>
            <p className='text'>Old Password:</p>
            <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Old Password"
                    />
          </div>
          <div className='text-field'>
            <p>New Password:</p>
            <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                    />
          </div>
          <div className='text-field'>
            <p>Conform Password:</p>
            <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                    />
          </div>
          <button onClick={handleSavePasswordChangesClick}>Save</button>
          <button onClick={handelEditBackClick}>Back</button>
          </>
              ) : (
                // Editing profile details
          <>
          <div className='text-field'>
            <p>Name:</p>
          <input
                    type="text"
                    placeholder={userDetails?.name}
                    onChange={(e) => setOrphanageDetail({...orphanageDetail,name:e.target.value})}
                  />
          </div>
          <div className='text-field'>
            <p>Email:</p>
          <input
                    type="email"
                    placeholder={userDetails?.email}
                    onChange={(e) => setOrphanageDetail({...orphanageDetail,email:e.target.value})}
                  />
          </div>
          <div className='text-field'>
            <p>Contact:</p>
          <input
                    type="tel"
                    placeholder={userDetails?.contact}
                    onChange={(e) => setOrphanageDetail({...orphanageDetail,contact:e.target.value})}
                  />
          </div>
          <button onClick={handleSaveChangesClick}>Save Changes</button>
          <button onClick={handelEditBackClick}>Back</button>
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
          <td style={{ fontFamily: 'Roboto, sans-serif' }}>{userDetails?.name}</td>
          </tr>
          <tr>
          <td style={{ fontFamily: 'Roboto, sans-serif' }}>Email: </td>
          <td style={{ fontFamily: 'Roboto, sans-serif' }}>{userDetails?.email}</td>
          </tr>
          <tr>
          <td style={{ fontFamily: 'Roboto, sans-serif' }}>Contact no.: </td>
          <td style={{ fontFamily: 'Roboto, sans-serif' }}>{userDetails?.contact}</td>
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