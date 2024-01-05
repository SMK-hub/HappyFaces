// components/Gallery.js
import React from 'react';

const Gallery = () => {
  // Example gallery images (replace with your own images and captions)
  const galleryImages = [
    { id: 1, src: 'wall.jpg', caption: 'Caption 1' },
    { id: 2, src: 'image2.jpg', caption: 'Caption 2' },
    { id: 3, src: 'image3.jpg', caption: 'Caption 3' },
    // Add more images as needed
  ];

  return (
    <div>
      <h2>Gallery</h2>
      <div className="gallery-container">
        {galleryImages.map((image) => (
          <div key={image.id} className="gallery-item">
            <img src={image.src} alt={image.caption} />
            <p>{image.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
