import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import RightSide from '../RigtSide/RightSide';
import './Certificates.css';
const FileUploadComponent = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file && file.size <= 5 * 1024 * 1024) {
      setUploadedFile(file);
    } else {
      alert('Please upload a file less than 5 MB.');
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleOkButtonClick = () => {
    // Implement your lgic for handling OK button click
    console.log('OK button clicked');
  };

  return (
    
          <div className="file-upload-container">
           <h1>Certificates</h1>
            <h3>To ensure transparency and compliance, please upload your orphanage's authentication certificate here. </h3>
            <>
              <p>Kindly follow these guidelines for document submission:</p>
              <ul>
              <li>Combine all relevant documents, including licenses, registrations, and accreditations, into a single PDF file.</li>
              <li>Ensure that the PDF file size does not exceed 5 MB.</li>
              <li>If your documents exceed this limit, consider compressing the file or contacting us for assistance.</li>
              </ul>
              <p>We appreciate your cooperation in adhering to these guidelines!</p>
              </>


      <label className="file-upload-label">
        Upload PDF :
        <input type="file" accept=".pdf" onChange={handleFileUpload} />
      </label>

      {uploadedFile && (
        <div className="uploaded-file">
          <p>File Uploaded: {uploadedFile.name}</p>
          <button className="remove-button" onClick={handleRemoveFile}>
            Remove
          </button>
        </div>
      )}

      <button className="ok-button" onClick={handleOkButtonClick}>
        OK
      </button>
    </div>
    
  );
};

export default FileUploadComponent;
