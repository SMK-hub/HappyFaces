import React, { useEffect } from 'react';
import './Container.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import Galleries from '../Galleries/Galleries'
import UpdateDetails from '../UpdateDetails/UpdateDetails'
import Certificates from '../Certificates/Certificates'
import Photos from '../Photos/Photos'
import {useUser} from '../../../../UserContext'
import axios from 'axios';




const MyContainer = () => {

  const handleOk = () => {
    // Implement your logic for handling OK button click
    console.log('OK button clicked');
  };
  const [orphanageInfo,setOrphanageInfo] = useState({
    OrphanageName: 'ABC Orphanage',
    DirectorName: 'Rajnikanth',
    Contact: '123-456-7890',
    Description: 'A place for children in need.',
    Address: '123 Main Street, City, Country',
    VerificationStatus: 'Verified',
    Website: 'https://miraclefoundationindia.in/',
    Requirements: 'Food, clothing, education materials',
    PriorityStatus: 'High',
    GalleryLink: '/Galleries',
  }) 

  const  {setUserData} = useUser();
  const {userDetails} = useUser();

  useEffect(()=>{
    const fetch=async()=>{
      try{
        const res=await fetchOrphanageDetailsData();
        console.log(res);
        setOrphanageInfo({
          ...orphanageInfo,
          OrphanageName: res.orphanageName,
          DirectorName: res.directorName,
          Contact: res.contact,
          Description: res.description,
          Address: res.address.house_no+","+res.address.street+","+res.address.city+"-"+res.address.postalCode+","+res.address.state+","+res.address.country ,
          VerificationStatus: res.verificationStatus,
          Website: res.website,
          Requirements: res.requirements.need,
          PriorityStatus: res.requirements.priority,
          GalleryLink: '/Galleries',
        });
      }catch(error){
        console.log(error);    
      }
    }
    fetch();
  },[userDetails.orpId])

  const fetchOrphanageCertificate = async () => {
    try {
      const response = await axios.get(`http://localhost:8079/orphanage/getCertificate/${userDetails.orpId}`, {
        responseType: 'arraybuffer'
      });
  
      const status = response.status;
  
      if (status === 200) {
        const blob = new Blob([response.data]);
        const file = new File([blob], 'certificate.pdf', { type: 'application/pdf' });
  
        // Convert File object into a URL
        const fileUrl = URL.createObjectURL(file);
  
        return fileUrl;
      }
    } catch (error) {
      console.log("Error in Fetching Certificate:", error);
    }
  }

  const fetchOrphanageDetailsData = async() =>{
    try{
      const response=await axios.get(`http://localhost:8079/orphanage/${userDetails?.orpId}/details`)
      return response.data;
    }catch(error){
      console.log(error);
    }
  }

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

const [openPdfDialog, setOpenPdfDialog] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState(null);

  const handleViewCertificate = async () => {
    const certificateUrl = await fetchOrphanageCertificate();
    setCertificateUrl(certificateUrl);
    setOpenPdfDialog(true);
  };

// Function to handle closing the PDF dialog
const handleClosePdfDialog = () => {
  setOpenPdfDialog(false);
  setCertificateUrl(''); // Clear the certificate URL
};

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
            Upload Certificates
          </button>
          <button className="button" onClick={() => openPhotos()}>
            Upload Photos
          </button>
          <button className='button' onClick={handleViewCertificate}>
            View Certificate
          </button>
        
      </div>

      {/*View Certificate*/}
      <Dialog
        open={openPdfDialog}
        onClose={handleClosePdfDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>View Certificate</DialogTitle>
        <DialogContent>
          {certificateUrl ? (<iframe
            title="certificate"
            src={certificateUrl}
            width="100%"
            height="600"
          />): (<div>No Certificate to view</div>)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePdfDialog}>Close</Button>
        </DialogActions>
      </Dialog>
      {/*View Certificate*/}
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
            handleClose();
          },
        }}
      >
        <DialogContent>
       <Photos />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyContainer;
