import React from 'react';
import './Container.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import Galleries from '../Galleries/Galleries'
import UpdateDetails from '../UpdateDetails/UpdateDetails'
import Certificates from '../Certificates/Certificates'
import Photos from '../Photos/Photos'
const MyContainer = () => {

  const handleOk = () => {
    // Implement your logic for handling OK button click
    console.log('OK button clicked');
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
    GalleryLink: '/Galleries',
    OrphanageName: 'Miracle Foundation',
  };
  const [open, setOpen] = React.useState(false);
 const [gopen, setgOpen] = useState(false);
const [openCer,setOpenCer]=useState(false);
const [openPh,setOpenPh]=useState(false);
const [openG,setgalleryOpen]=useState(false);

const handleGalleriesOpen = () => {
  setgOpen(true)
}
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleGalleryClickOpen = () => {
    setgalleryOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenCer(false);
    setOpenPh(false);
    setgOpen(false)
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

                  <button className="gallery-button" onClick={() => handleGalleriesOpen()} >{orphanageInfo.OrphanageName}</button>

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
        open={gopen}
        onClose={handleClose} 
      >
        
        <DialogContent>
          <Galleries />
        </DialogContent>
        <DialogActions>
        <button type="submit" onClick={handleClose}>Save Changes</button>
        </DialogActions>
      </Dialog>

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
        
        <DialogContent>
        <UpdateDetails />
        </DialogContent>
        <DialogActions>
        <button type="submit" onClick={handleClose}>Save Changes</button> 
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
        <DialogContent>
        <Certificates />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Save Changes</Button>
          <Button type="submit">Cancel</Button>
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
        <DialogContent>
       <Photos />
        </DialogContent>
        <DialogActions>
          <Button className="ok-button" onClick={handleOk}>OK</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyContainer;