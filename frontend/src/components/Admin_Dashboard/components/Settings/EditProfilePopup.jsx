// EditProfilePopup.js

import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import './EditProfilePopup.css';

const EditProfilePopup = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [originalImage, setOriginalImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const editorRef = useRef(null);

  const handleSaveChanges = () => {
    // Implement logic to save changes
    // For demonstration purposes, simply log the changes
    console.log("Username:", username);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    console.log("Cropped Image:", croppedImage);

    // Close the popup after saving changes
    onClose();
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setOriginalImage(file);
    setIsCropping(true);
  };

  const handleAcceptCrop = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
      setCroppedImage(canvas);
    }
    setIsCropping(false);
  };

  const handleRejectCrop = () => {
    setCroppedImage(null);
    setIsCropping(false);
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
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

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

        {isCropping ? (
          <div className="crop-container">
            <AvatarEditor
              ref={editorRef}
              image={originalImage}
              width={100}
              height={100}
              border={50}
              borderRadius={50}
              color={[255, 255, 255, 0.6]} // The color of the crop border
            />
            <button className="accept-crop-button" onClick={handleAcceptCrop}>Yes</button>
            <button className="reject-crop-button" onClick={handleRejectCrop}>No</button>
          </div>
        ) : (
          <>
            <label>Change Profile Picture:</label>
            <input
              type="file"
              accept=".png, .jpg"
              onChange={handleProfilePictureChange}
            />
          </>
        )}

        {croppedImage && (
          <p className="uploaded-image-name">Cropped Image</p>
        )}

        <button className="save-changes-button" onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
};

export default EditProfilePopup;
