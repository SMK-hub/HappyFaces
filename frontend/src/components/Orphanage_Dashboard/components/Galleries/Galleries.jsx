// Gallery.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Galleries.css';

const Gallery = () => {
  // Sample array of image URLs
  const galleryImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
    // Add more image URLs as needed
  ];

  return (
    <div>
      <h1>Orphanage Gallery</h1>
      <div className="image-gallery">
        {galleryImages.map((imageUrl, index) => (
          <Link key={index} to={`/Gallery/${index + 1}`}>
            {/* Redirect to /gallery/1, /gallery/2, etc. */}
            <img src={imageUrl} alt={`Orphanage Image ${index + 1}`} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
