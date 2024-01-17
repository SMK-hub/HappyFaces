// components/AboutUs.js
import React from 'react';
import { FaRegHeart, FaHandsHelping, FaUsers, FaMicrophoneAlt, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
  const emailLink = "mailto:demo@gmail.com"; // Gmail mailto link

  return (
    <div className="about-us-container">
      <div className="our-story-section">
        <div className="announcement-mic">
          <FaMicrophoneAlt className="mic-icon" />
        </div>
        <div className="our-story-box">
          <h2 className="about-us-heading">Our Story</h2>
          <p className="about-us-description">
            Step into the heartwarming world of Happy Faces, an online haven where every smile tells a story of hope and resilience. We are not just an orphanage; we are a vibrant community, weaving a tapestry of love and support. Explore our website to meet the incredible souls behind the smiles, read inspiring tales of triumph, and discover how you can make a difference. Whether through donations, volunteering, or spreading the word, you become a catalyst for positive change. Join us in creating a world where abandoned dreams find new life, and every face radiates the pure joy of belonging. Together, we illuminate the path to a brighter future. 😊🌟 #HappyFaces #SpreadLove #TransformLives
          </p>
        </div>
      </div>

      <div className="card-container">
        <div className="card" id="mission-card">
          <h3>Our Mission</h3>
          <p>
            Happy Faces: Illuminating lives with love, Happy Faces is on a mission to provide hope, shelter, and opportunities to orphaned children, fostering resilience and joyful futures. #HappyFacesMission
          </p>
        </div>
        <div className="card" id="values-card">
          <h3>Our Values</h3>
          <p>
            Happy Faces values compassion, resilience, and community. We believe in fostering a nurturing environment where every child is empowered to thrive, creating a brighter future filled with love, support, and joy. #HappyFacesValues
          </p>
        </div>
        <div className="card" id="team-card">
          <h3>Our Team</h3>
          <p>
            Meet the incredible team behind Happy Faces—passionate individuals dedicated to nurturing smiles and building a brighter future for orphaned children. Committed to compassion, innovation, and positive impact. Together, we make dreams blossom! #HappyFacesTeam
          </p>
          <Link to="/team-details" className="view-details-button">
            View Team Members
          </Link>
        </div>
      </div>

      <div className="creative-section">
        <div className="creative-item">
          <FaRegHeart className="creative-icon" />
          <p>Passion</p>
        </div>
        <div className="creative-item">
          <FaHandsHelping className="creative-icon" />
          <p>Community</p>
        </div>
        <div className="creative-item">
          <FaUsers className="creative-icon" />
          <p>Diversity</p>
        </div>
      </div>

      <div className="additional-creative-section">
        <div className="additional-creative-content">
          <h3>Join Us in Making a Difference</h3>
          <p>
            "Embark on a transformative journey with us. Join Happy Faces in making a profound impact. Your involvement, whether through donations, volunteering, or advocacy, plays a pivotal role in creating positive change and nurturing brighter futures for orphaned children. Together, let's make a lasting difference."
          </p>
          <button className="join-us-button">Join Us</button>
        </div>
      </div>

      <div className="visually-striking-section">
        <div className="animated-circles"></div>
        <h3 className="striking-heading">Experience the Magic</h3>
        <p className="striking-description">
          Immerse yourself in a world of possibilities and wonder.
        </p>
      </div>

      <div className="contact-us-section">
        <h3>Contact Us</h3>
        <p>
          <FaWhatsapp style={{ marginRight: '10px' }} /> WhatsApp: 123456789
        </p>
        <p>Email: <a href={emailLink}>{emailLink}</a></p>
      </div>

      <div className="trademark-section">
        <p>&copy; 2024 Happy Faces</p>
      </div>
    </div>
  );
};

export default AboutUs;
