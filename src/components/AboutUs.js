// components/AboutUs.js
import React from 'react';
// components/AboutUs.js
import { FaRegHeart, FaHandsHelping, FaUsers, FaMicrophoneAlt } from 'react-icons/fa';

import './AboutUs.css'; // Import the CSS file

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="our-story-section">
        <div className="announcement-mic">
          <FaMicrophoneAlt className="mic-icon" />
        </div>
        <div className="our-story-box">
          <h2 className="about-us-heading">Our Story</h2>
          <p className="about-us-description">
          Miracle Foundation India helps vulnerable children find safe, stable and permanent families.
          Whether living within a Child Care Institution or at risk of separation, our mission is a family for every child,
          in our lifetime. For the past 22 years, Miracle Foundation has improved the lives of more than 164,000 children—but
          this is just the beginning. Today, we are a worldwide leader ending the need for Child Care Institutions by 2040.
          To achieve this, we are actively uniting children with families, we are training the social work force to 
          prevent children from entering the child care institutions, and we are creating technology to easily scale our work.
          We are consistently awarded the highest ratings across all charity watchdog organizations,
          so you can be confident that Miracle Foundation is transparent, accountable and financially healthy.
          </p>
        </div>
      </div>  

      <div className="card-container">
        <div className="card" id="mission-card">
          <h3>Our Mission</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod justo sit amet risus auctor.
          </p>
        </div>
        <div className="card" id="values-card">
          <h3>Our Values</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod justo sit amet risus auctor.
          </p>
        </div>
        <div className="card" id="team-card">
          <h3>Our Team</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod justo sit amet risus auctor.
          </p>
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

      
      {/* Additional Creative Section 2 */}
      <div className="additional-creative-section">
        <div className="additional-creative-content">
          <h3>Join Us in Making a Difference</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod justo sit amet risus auctor, vitae condimentum nisl
            pellentesque.
          </p>
          <button className="join-us-button">Join Us</button>
        </div>
      </div>
      
      {/* Visually Striking Section */}
      <div className="visually-striking-section">
        <div className="animated-circles"></div>
        <h3 className="striking-heading">Experience the Magic</h3>
        <p className="striking-description">
          Immerse yourself in a world of possibilities and wonder.
        </p>
      </div>

      <div className="contact-form-section">
        <div className="contact-form-card">
          <h3>Contact Us</h3>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message"></textarea>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>

            {/* Address Card */}
      <div className="address-card-section">
        <div className="address-card">
          <h3>Visit Us</h3>
          <p>123 Magic Street</p>
          <p>Enchanted City, 98765</p>
          <p>Fantasyland</p>
        </div>
      </div>

      {/* Trademark Section */}
      <div className="trademark-section">
        <p>&copy; 2024 Happy Faces</p>
      </div>

    </div>
  );
};

export default AboutUs;
