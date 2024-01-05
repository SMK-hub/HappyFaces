// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Gallery from './components/Gallery';
import SignInSelector from './components/SignInSelector';
import SignUpSelector from './components/SignUpSelector';
import SignInAdmin from './components/SignInAdmin';
import SignInOrphanage from './components/SignInOrphanage';
import SignInDonor from './components/SignInDonor';
import SignUpAdmin from './components/SignUpAdmin';
import SignUpOrphanage from './components/SignUpOrphanage';
import SignUpDonor from './components/SignUpDonor';


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/signin" element={<SignInSelector />} />
        <Route path="/signup" element={<SignUpSelector />} />
        <Route path="/signin/admin" element={<SignInAdmin />} />
        <Route path="/signin/orphanage" element={<SignInOrphanage />} />
        <Route path="/signin/donor" element={<SignInDonor />} />
        <Route path="/signup/admin" element={<SignUpAdmin />} />
        <Route path="/signup/orphanage" element={<SignUpOrphanage />} />
        <Route path="/signup/donor" element={<SignUpDonor />} />
      </Routes>
    </Router>
  );
};

export default App;
