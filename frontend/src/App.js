// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import DashboardAdmin from './components/All_js/DashboardAdmin';
import DashboardOrphanage from './components/Orphanage_Dashboard/DashboardOrphanage';
import DashboardDonor from './components/All_js/DashboardDonor';
import OrphanageHome from './components/Orphanage_Dashboard/components/OrphanageHome';
import { Container } from '@mui/material';
import MyContainer from './components/Orphanage_Dashboard/components/Container/Container';
import Profile from './components/Orphanage_Dashboard/components/Profile/Profile';
import EventTable from './components/Orphanage_Dashboard/components/Event/Events';
import Sidebar from './components/Orphanage_Dashboard/components/Sidebar';
import RightSide from './components/Orphanage_Dashboard/components/RigtSide/RightSide';
import PaymentDashboard from './components/Orphanage_Dashboard/components/Payments/Payment';



const App = () => {
  return (
    <Router>
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
        <Route path="/admin-dashboard" element={<DashboardAdmin />} />

        <Route path='/orphanage-dashboard' element={<DashboardOrphanage/>}/>
        <Route path="/donor-dashboard" element={<DashboardDonor/>}/>
        <Route path="/OrphanageHome" element={<OrphanageHome />} />
        <Route path="/OrphanageHome/details" element={<MyContainer/>}/>
        <Route path="/OrphanageHome/profile" element={<Profile/>}/>
        <Route path="/OrphanageHome/events" element={<EventTable/>}/> 
        <Route path="/OrphanageHome/payments" element={<PaymentDashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;
