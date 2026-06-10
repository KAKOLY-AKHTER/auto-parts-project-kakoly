import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import WhyUs from './pages/WhyUs';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import ReturnPolicy from './pages/ReturnPolicy';
import FleetServices from './pages/FleetServices';
import ClientLayout from './pages/ClientLayout';
import EmergencyService from './pages/EmergencyService';
import MobileService from './pages/MobileService';
import OilChange from './pages/OilChange';
import FastResponse from './pages/FastResponse';
import TireService from './pages/TireService';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth pages — no header/footer */}
        <Route path="/login"  element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Main pages — with layout */}
        <Route path="/"               element={<Layout><Home /></Layout>} />
        <Route path="/contacts"       element={<Layout><Contact /></Layout>} />
        <Route path="/about"          element={<Layout><About /></Layout>} />
        <Route path="/services"       element={<Layout><Services /></Layout>} />
        <Route path="/auto-service"   element={<Layout><Services /></Layout>} />
        <Route path="/why-us"         element={<Layout><WhyUs /></Layout>} />
        <Route path="/careers"        element={<Layout><Careers /></Layout>} />
        <Route path="/blog"           element={<Layout><Blog /></Layout>} />
        <Route path="/shop"           element={<Layout><Shop /></Layout>} />
        <Route path="/cart"           element={<Layout><Cart /></Layout>} />
        <Route path="/return-policy"  element={<Layout><ReturnPolicy /></Layout>} />
        <Route path="/money-back"     element={<Layout><ReturnPolicy /></Layout>} />
        <Route path="/support"        element={<Layout><Contact /></Layout>} />
        <Route path="/fleet-services"     element={<Layout><FleetServices /></Layout>} />
        <Route path="/client-layout"      element={<ClientLayout />} />
        <Route path="/emergency-service"  element={<Layout><EmergencyService /></Layout>} />
        <Route path="/mobile-service"     element={<Layout><MobileService /></Layout>} />
        <Route path="/oil-change"         element={<Layout><OilChange /></Layout>} />
        <Route path="/fast-response"      element={<Layout><FastResponse /></Layout>} />
        <Route path="/tire-service"       element={<Layout><TireService /></Layout>} />
      </Routes>
    </Router>
  );
}
