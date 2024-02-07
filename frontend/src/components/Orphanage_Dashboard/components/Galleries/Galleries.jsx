import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Galleries.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  

  const handleDelete = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

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

  const handleOK = () => {
    console.log('OK button clicked');
  };

  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      author: '@bkristastucchio',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      author: '@rollelflex_graphy726',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      author: '@nolanissac',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      author: '@hjrc33',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      author: '@tjdragotta',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      author: '@katie_wasserman',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      author: '@silverdalex',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      author: '@shelleypauls',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      author: '@peterlaster',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      author: '@southside_customs',
      cols: 2,
    },
  ];

  return (
    <div>
      <center>
        <div className="image-gallery">
          <ImageList sx={{ width: 550, height: 590 }}>
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div">Miracle Foundation</ListSubheader>
            </ImageListItem>
            {itemData.map((item, index) => (
              <div key={index}>
                <ImageListItem>
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.title}
                    subtitle={item.author}
                  />
                </ImageListItem>
              </div>
            ))}
            {images.map((image, index) => (
              <div key={index}>
                <ImageListItem>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Image ${index}`}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    actionIcon={
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`delete image`}
                        onClick={() => handleDelete(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              </div>
            ))}
          </ImageList>
          <input
            type="file"
            accept=".jpg, .jpeg"
            multiple
            onChange={handleImageUpload}
          />
          <Button variant="contained" onClick={handleOK}>OK</Button>
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
