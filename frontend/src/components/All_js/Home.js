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

// import { Header } from 'tar';

const Home = () => {
  return (
    <div className="home-background">
      <Header/>
      <div className="home-container">
        <h1>WELCOME TO HAPPY FACES</h1>
        <p>Providing care and support to every child</p>
        <Link to="/signin/donor">
          <button className="give-now-button">GIVE NOW</button>
        </Link>
      </div>
      <Aim />
      <FocusSection />
      <NumberCounter/>
      <CardList/>
      <Testimony/>
      <Registration/>
      <Contact/>
      <Footer/>
    </div>
  );
};

export default Home;
