import React from 'react';
import { Link } from 'react-router-dom';
import '../All_css/Home.css';
import Aim from './Aim';
import FocusSection from './FocusSection';
import NumberCounter from './NumberCounter';
import CardList from './CardList';
import Testimony from './Testimony';
import Registration from './Registration';
import Contact from './Contact';
import Footer from './Footer';
import Header from './Header';

const Home = () => {
  return (
    <div className="home-background">
      <Header/>
      <div className="home-container">
        <video autoPlay muted loop id="background-video">
          <source src="https://player.vimeo.com/external/555730946.sd.mp4?s=6882418f3ab902044ca28a586c1f3c24ae939ea4&profile_id=164&oauth2_token_id=57447761" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
        <h1>HAPPY FACES</h1>
        <p>Home for every child</p>
        <Link to="/signin/donor">
          <button className="donate">DONATE NOW</button>
        </Link>
      </div>
      <Aim />
      <FocusSection />
      <NumberCounter/>
      <CardList/>
      <Testimony/>
      <Contact/>
      <Footer/>
    </div>
  );
};

export default Home;
