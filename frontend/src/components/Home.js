/* eslint-disable jsx-a11y/img-redundant-alt */
// components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
//import bg_img from './testingg.png';
import './Header.css';

const Home = () => {
  
  const backgroundStyle = {
    //backgroundImage: `url(${bg_img})`, // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 'calc(100vh - 64px)', // Adjust the height based on the header height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black', // Set text color to be visible on the background
  };

  return (
    <div style={backgroundStyle}>
      <h1>Welcome to Happy Faces</h1>
      <p>Providing care and support to every child</p>
      <Link to="/signin/donor">
        <button className="give-now-button">GIVE NOW</button>
      </Link>
    </div>
  );
};

export default Home;
