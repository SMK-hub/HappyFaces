import React, { useState } from 'react';
import './Photos.css';
import RightSide from '../RigtSide/RightSide';
import Sidebar from '../Sidebar';

const PhotosComponent = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    const filteredFiles = files.filter((file) => {
      const isImage = file.type.startsWith('image/');
      const isSizeValid = file.size <= 5 * 1024 * 1024; // 5 MB

      return isImage && isSizeValid;
    });

    setUploadedFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  const handleOkButtonClick = () => {
    // Implement your logic for handling OK button click
    console.log('OK button clicked');
  };

  return (
    <div className='Dashb'>
      <div className='DashbGlass'  >
        <Sidebar/>
           <div className="photos-container">
      <h1>Photos</h1>
      <h3>Upload pictures of your orphanage's activities and events.</h3>
      <p>
         Accepted formats: png, jpg, jpeg.
      </p>
      <p> Maximum file size: 5 MB</p>

      <label className="file-upload-label">
        Upload Pictures:
        <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFileUpload} multiple />
      </label>

      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <p>Uploaded Files:</p>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>
                {file.name}
                <button className="remove-button" onClick={() => handleRemoveFile(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="ok-button" onClick={handleOkButtonClick}>
        OK
      </button>
    </div> <RightSide/>
        </div>
        
    </div>
    
  );
};

export default PhotosComponent;
