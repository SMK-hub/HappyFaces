import React, { useEffect, useState } from 'react';
import './Galleries.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config';
import { useUser } from '../../../../UserContext';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [uploadedFiles, setUploadedFile] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
        if (file.size <= 5 * 1024 * 1024) {
          newImages.push(file);
        } else {
          alert(`Image ${file.name} size exceeds 5 MB limit.`);
        }
      } else {
        alert(`Please upload JPG or JPEG format images.`);
      }
    }
    setImages([...images, ...newImages]);
    if (newImages.length > 0) {
      setUploadedFile([...uploadedFiles, ...newImages]);
    }
  };

  const {userDetails} = useUser();

  const handleDeleteButton = async(imageId) => {
if(window.confirm("Do you want to delete this image???????????")){
   try{
      const response = await axios.post(`${API_BASE_URL}/orphanage/${userDetails.orpId}/orphanageDetails/removeImage/${imageId}`);
      const status = response.status;
      setOnChangeVariable(!onChangeVariable);
       alert("Image Deleted Successfully");
    }catch(error){
      console.log(error)
    }
}
   
  };  

  const[onChangeVariable,setOnChangeVariable] = useState(true);
const [orphanageDetailWithImage,setOrphanageDetailWithImage] = useState();
  useEffect(()=>{
    const fetchOrphanageDetails = async() =>{
      try {
        const response = await axios.get(`${API_BASE_URL}/orphanage/${userDetails.orpId}/details`);
        const imageData= await fetchImageData();
        setOrphanageDetailWithImage({
          ...response.data,
          orphanageImages:imageData,
        })
      }catch(error){
        console.log(error)
      }
    }

  fetchOrphanageDetails();
  },[onChangeVariable]);
      const fetchImageData =async() =>{
    try{
        const response = await axios.get(`${API_BASE_URL}/orphanage/${userDetails.orpId}/orphanageDetails/viewImages`);
        return response.data;
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div>
      <center>
        <div className="image-gallery">
          <ImageList sx={{ width: 550, height: 590 }}>
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div">{orphanageDetailWithImage?.orphanageName}</ListSubheader>
            </ImageListItem>
            {orphanageDetailWithImage?.orphanageImages?.map((item, index) => (
              <ImageListItem key={index}>
                <img src={`data:image/jpeg;base64,${item?.image}`} alt={item.title} loading="lazy" />
                <ImageListItemBar
                  title={item?.title}
                  subtitle={item?.author}
                  actionIcon={
                    item && (
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label="delete image"
                        onClick={() => handleDeleteButton(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </center>
    </div>
  );
};

export default Gallery;
