import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Galleries.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  

 

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
    // Display the first uploaded file
    if (newImages.length > 0) {
      setUploadedFile(newImages[0]);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

 

  const [itemData, setItemData] = useState([
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      author: '@bkristastucchio',
      rows: 2,
      cols: 2,
      featured: true,
      showDeleteButton: true, // Add showDeleteButton property and set it to false
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      author: '@rollelflex_graphy726',
      featured: true,
      showDeleteButton: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik',
      featured: true,
      showDeleteButton: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      author: '@nolanissac',
      cols: 2,
      featured: true,
      showDeleteButton: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      author: '@hjrc33',
      cols: 2,
      featured: true,
      showDeleteButton: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      rows: 2,
      cols: 2,
      featured: true,
      showDeleteButton: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      author: '@tjdragotta',
      featured: true,
      showDeleteButton: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      author: '@katie_wasserman',
      featured: true,
      showDeleteButton: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      author: '@silverdalex',
      rows: 2,
      cols: 2,
      featured: true,
      showDeleteButton: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      author: '@shelleypauls',
      featured: true,
      showDeleteButton: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      author: '@peterlaster',
      featured: true,
      showDeleteButton: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      author: '@southside_customs',
      cols: 2,
      featured: true,
      showDeleteButton: true,
    },
  ]);

  const handleDeleteButton = (index) => {
    const updatedItemData = [...itemData];
    updatedItemData[index].showDeleteButton = true; // Show delete button for this item
    setItemData(updatedItemData);
  };


  return (
    <div>
      <center>
        <div className="image-gallery">
          <ImageList sx={{ width: 550, height: 590 }}>
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div">Miracle Foundation</ListSubheader>
            </ImageListItem>
            {itemData.map((item, index) => (
              <ImageListItem key={index}>
                <img src={item.img} alt={item.title} loading="lazy" />
                <ImageListItemBar
                  title={item.title}
                  subtitle={item.author}
                  actionIcon={
                    item.showDeleteButton && (
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label="delete image"
                        onClick={() => handleDeleteButton(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
          <input type="file" accept=".jpg, .jpeg" multiple onChange={handleImageUpload} />
          {/* <Button variant="contained" onClick={handleOK}>OK</Button> */}
        </div>
        {uploadedFile && (
          <div className="uploaded-file">
            <p>File Uploaded: {uploadedFile.name}</p>
            <button className="remove-button" onClick={handleRemoveFile}>
              Remove
            </button>
          </div>
        )}
      </center>
    </div>
  );
};
export default Gallery;