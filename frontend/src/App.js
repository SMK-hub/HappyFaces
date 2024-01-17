// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/All_js/Header';
import Home from './components/All_js/Home';
import AboutUs from './components/All_js/AboutUs';
import Gallery from './components/All_js/Gallery';
import SignInSelector from './components/All_js/SignInSelector';
import SignUpSelector from './components/All_js/SignUpSelector';
import SignInAdmin from './components/All_js/SignInAdmin';
import SignInOrphanage from './components/All_js/SignInOrphanage';
import SignInDonor from './components/All_js/SignInDonor';
import SignUpAdmin from './components/All_js/SignUpAdmin';
import SignUpOrphanage from './components/All_js/SignUpOrphanage';
import SignUpDonor from './components/All_js/SignUpDonor';


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
