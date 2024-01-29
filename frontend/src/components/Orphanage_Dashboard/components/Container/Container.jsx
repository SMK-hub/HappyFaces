import React from 'react';
import './Container.css';
import { Link } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';

const MyContainer = () => {

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);

    const filteredFiles = files.filter((file) => {
      const isImage = file.type.startsWith('image/');
      const isSizeValid = file.size <= 5 * 1024 * 1024; // 5 MB

      return isImage && isSizeValid;
    });

    setUploadedFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
  };

  const handleRemove = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  const handleOk = () => {
    // Implement your logic for handling OK button click
    console.log('OK button clicked');
  };


  // Dummy data for orphanage information
  const [formData, setFormData] = useState({
    Name: '',
    DirectorName: '',
    Contact: '',
    Description: '',
    Address: '',
    Website: '',
    Requirements: '',
    PriorityStatus: '',
  });
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
    // Implement your logic for handling OK button click
    console.log('OK button clicked');
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission
    console.log('Form submitted:', formData);
  };

  const handlePasswordChange = () => {
    // Add your logic to handle password change
    console.log('Password change requested');
  };


  const orphanageInfo = {
    Name: 'ABC Orphanage',
    DirectorName: 'Rajnikanth',
    Contact: '123-456-7890',
    Description: 'A place for children in need.',
    Address: '123 Main Street, City, Country',
    VerificationStatus: 'Verified',
    Website: 'https://miraclefoundationindia.in/',
    Requirements: 'Food, clothing, education materials',
    PriorityStatus: 'High',
    GalleryLink: '/gallery', // Add this property for Gallery link
    GalleryName: 'Miracle Foundation',
  };
  const [open, setOpen] = React.useState(false);
const [openCer,setOpenCer]=useState(false);
const [openPh,setOpenPh]=useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenCer(false);
    setOpenPh(false)
  };
  const tableData = Object.entries(orphanageInfo);
const openCertificates=()=>{
setOpenCer(true)
}
const openPhotos=()=>{
  setOpenPh(true)
  }
  const handleButtonClick = (action) => {
    // Handle button click logic here
    console.log(`Button clicked: ${action}`);
  };

  return (
    <div className="container">
      <h1 className="head">ORPHANAGE DETAILS</h1>
      <table className="info-table">
        <tbody>
          {tableData.map(([title, detail]) => (
            <tr key={title}>
              <td className="info-title">{title}:</td>
              {title === 'VerificationStatus' && (
                <td className="info-detail">
                  <button className="verification-button">{detail}</button>
                </td>
              )}
              {title === 'Website' && (
                <td className="info-detail">
                  <a href={detail} target="_blank" rel="noopener noreferrer">
                    {detail}
                  </a>
                </td>
              )}
              {title === 'GalleryLink' && (
  <td className="info-detail">
    <Link to={orphanageInfo.GalleryLink}>
      <button className="gallery-button">{orphanageInfo.GalleryName}</button>
    </Link>
  </td>
)}
              {title !== 'VerificationStatus' && title !== 'Website' && title !== 'GalleryLink' && (
                <td className="info-detail">{detail}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
          <button className="button" onClick={() => handleClickOpen()}>
            Update Details
          </button>
  
          <button className="button" onClick={() => openCertificates()}>
            Update Certificates
          </button>
      
        
          <button className="button" onClick={() => openPhotos()}>
            Upload Photos
          </button>
        
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{'& form':{width:'auto'}}}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
        <form onSubmit={handleSubmit}>
        <h1>Orphanage Details</h1>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Director Name:
          <input type="text" name="directorName" value={formData.directorName} onChange={handleChange} />
        </label>
        <label>
          Contact:
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        
        <label>
          Website:
          <input type="text" name="website" value={formData.website} onChange={handleChange} />
        </label>
        <label>
          Requirements:
          <select name="requirements" value={formData.requirements} onChange={handleChange}>
            <option value="">Select Requirement</option>
            <option value="food">Food</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        </label>
        <label>
          Priority Status:
          <select name="priorityStatus" value={formData.priorityStatus} onChange={handleChange}>
            <option value="">Select Priority Status</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
          </select>
        </label>

        <div className="button-container">
          <button type="submit">Update</button>
          <button type="button" onClick={handlePasswordChange}>Change Password</button>
        </div>
      </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>



      <Dialog
        open={openCer}
        onClose={handleClose}
        sx={{'& form':{width:'auto'}}}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={openPh}
        onClose={handleClose}
        sx={{'& form':{width:'auto'}}}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
        <div className="photos-container">
      <h1>Photos</h1>
      <h3>Upload pictures of your orphanage's activities and events.</h3>
      <p>
         Accepted formats: png, jpg, jpeg.
      </p>
      <p> Maximum file size: 5 MB</p>

      <label className="file-upload-label">
        Upload Pictures:
        <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleUpload} multiple />
      </label>

      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <p>Uploaded Files:</p>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>
                {file.name}
                <button className="remove-button" onClick={() => handleRemove(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="ok-button" onClick={handleOk}>
        OK
      </button>
    </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyContainer;
