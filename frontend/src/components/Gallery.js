// components/Gallery.js
import React from 'react';
import './Gallery.css'

const Gallery = () => {
  // Example gallery images (replace with your own images and captions)
  const galleryImages = [
    { id: 1, src: 'https://cdn.gencraft.com/prod/user/f443edf3-6a0c-4d53-81f2-50ed80ed4c69/b3ce4b3d-04e7-4b74-a921-5db4b18f1526/image/image0_0.jpg?Expires=1704862160&Signature=V8yuwphiDtmUqOlDnWQu7xVZox4FntTq8p42nQynN~DD1JyL0Q3qZimGGlFUo1oHHzmuQqdTfk7Vc-Z8nLFBul8r1QEJotKaWUBRG1Yuq4k5mOxRTz6SPbVmzvaXo4zfncnx4Hnkm6sDwgfCT1oREpX5Pr5mknM4~kDewhWP~zhKqbmOxfCrKmjOia9Gi4yJnB~aIkQXeNpHER1FCqDZJDhA-RKCa~xBsb6oqTD53zbgZorUCHMWqvicMDODX9QpJK2UxK9tt3bdEhZjZiPnuw8frLT6Ln-HUeTAgMPSsXRjuUwRCbRYHGWsxvxjEQLqYvStMBttEg6--XCP-jBsZg__&Key-Pair-Id=K3RDDB1TZ8BHT8', caption: 'Create a compassionate website highlighting the transformative power of education for orphaned children. Showcase success stories, educational programs, and ways for visitors to support and get involved' },
    { id: 2, src: 'https://cdn.gencraft.com/prod/user/f443edf3-6a0c-4d53-81f2-50ed80ed4c69/0d49f272-caa4-4bf5-a945-edda3c2b0e4d/image/image0_0.jpg?Expires=1704862190&Signature=GSuLZLGmu-KDULSWGCnMPOiJMLI3RDt~KSf6NDrWVJsQCwFFX6-NKPBzUxtSHYw9cyoPtYgg2jnASJluNQzHeuuvqhh7NXps8Tkq-oTOBjUkCdN1djbdtuAifr~AZGWXJ~HaFd0r-9N0Yg3qaVXJUUNvqpc6-lv1KwZzFfG7GuR9jHUAVip-oyGh~idOnnshzYJil2qo4K3IZEPxCLOkc61hBoB3JXVbuFfIx2xFELyT~v-9BV-0a1W035a2Ogw7GnXSnJeIwHj6kXns57m2cjgEXAj6opR638npE4YJ81cre344e0BVH7PN4sb12Irr5ba4FCufM4q~MZahJj-XSQ__&Key-Pair-Id=K3RDDB1TZ8BHT8', caption: 'Step into the serene world of our orphanage as captured in heartfelt moments of children in prayer. Explore our gallery to witness the spiritual resilience and shared moments of reflection, highlighting the importance of faith in shaping their lives. Join us in embracing a community where prayer becomes a source of solace and unity.' },
    { id: 3, src: 'https://cdn.gencraft.com/prod/user/f443edf3-6a0c-4d53-81f2-50ed80ed4c69/6bd88ddb-ac4b-4be1-a5b8-3d409b46dab2/image/image1_0.jpg?Expires=1704862219&Signature=m17WLXmMPSnbd0bnUslXhiyAlOFZajgAqhlWP9~0ZhSIiuq3Y~IKNOTiYNWrWY~p4hUytBJf9VQtNUCaBniE5G51sHslds70cBgf3wJfyBNZ-4d7O38K02NTYUFLb0dFuKQN9u7h9qCrWjYeyfR-TuOpl0Fu5GIuucVD1FyhcnR7XWKK5OvW1DICUXx6ka-xI5RUT7UhD35O3voXUV76XQ9kXUOFBtkcAgDcuAfqq5Xiys8DPmNSiNCEJJjcXR1zlWXZiMtNvKTYVEAEjWgMZblOoEvZXBt9S54dGnvEWgzIewoNm4uXjgpEMhl-T7CkhveYnHvuIIcSSHcKgcsKew__&Key-Pair-Id=K3RDDB1TZ8BHT8', caption: 'Experience the joyous spirit of childhood in our orphanage playground! Dive into our gallery to witness the laughter, friendships, and playful adventures of orphaned children. Discover how a vibrant and safe play environment fosters happiness and holistic development. Join us in celebrating the simple pleasures that make every child\'s journey special.' },
    // Add more images as needed
  ];

  return (
    <div className='page'>
      <p className='para'>Gallery</p>
    <div className='gallery_page'>
      <div className="gallery-container">
        {galleryImages.map((image, index) => (
          <div key={image.id} className={index % 2 === 0? 'row-even':'row-odd'} >
            <div className='image-container hover'>
            <figure><img src={image.src} alt= {`_Image_:${image.caption}`} /></figure>
            </div>
            <div className='caption-container' >
            <p>{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Gallery;
