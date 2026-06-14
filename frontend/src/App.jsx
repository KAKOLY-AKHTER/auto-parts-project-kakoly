import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import WhyUs from './pages/WhyUs';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import ReturnPolicy from './pages/ReturnPolicy';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import ClientLayout from './pages/ClientLayout';
import Dashboard      from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProductDetail from './pages/ProductDetail';

import FleetServices      from './pages/services/FleetServices';
import FullyEquipped      from './pages/services/FullyEquipped';
import OurTechnicians     from './pages/services/OurTechnicians';
import QualityParts       from './pages/services/QualityParts';
import Pricing            from './pages/services/Pricing';
import Satisfaction       from './pages/services/Satisfaction';
import EmergencyService   from './pages/services/EmergencyService';
import MobileService      from './pages/services/MobileService';
import OilChange          from './pages/services/OilChange';
import FastResponse       from './pages/services/FastResponse';
import TireService        from './pages/services/TireService';
import BrakeRepair        from './pages/services/BrakeRepair';
import WheelAlignment     from './pages/services/WheelAlignment';
import BatteryReplacement from './pages/services/BatteryReplacement';
import AcEvaluation       from './pages/services/AcEvaluation';
import TruckTireChange    from './pages/services/TruckTireChange';
import TrailerTireChange  from './pages/services/TrailerTireChange';
import RoadsideAssistance from './pages/services/RoadsideAssistance';

export default function App() {
  return (
    <ThemeProvider>
    <CartProvider>
    <Router>
      <Routes>
        {/* Auth pages — no header/footer */}
        <Route path="/login"     element={<Login />} />
        <Route path="/signup"    element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin"     element={<AdminDashboard />} />

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
        <Route path="/product-details/:id" element={<Layout><ProductDetail /></Layout>} />
        <Route path="/return-policy"   element={<Layout><ReturnPolicy /></Layout>} />
        <Route path="/money-back"      element={<Layout><ReturnPolicy /></Layout>} />
        <Route path="/support"         element={<Layout><Contact /></Layout>} />
        <Route path="/privacy-policy"  element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/terms"           element={<Layout><Terms /></Layout>} />
        <Route path="/client-layout"   element={<ClientLayout />} />

        {/* Service & fleet pages */}
        <Route path="/fleet-services"     element={<Layout><FleetServices /></Layout>} />
        <Route path="/emergency-service"  element={<Layout><EmergencyService /></Layout>} />
        <Route path="/mobile-service"     element={<Layout><MobileService /></Layout>} />
        <Route path="/oil-change"         element={<Layout><OilChange /></Layout>} />
        <Route path="/fast-response"      element={<Layout><FastResponse /></Layout>} />
        <Route path="/tire-service"       element={<Layout><TireService /></Layout>} />
        <Route path="/brake-repair"       element={<Layout><BrakeRepair /></Layout>} />
        <Route path="/wheel-alignment"    element={<Layout><WheelAlignment /></Layout>} />
        <Route path="/battery-replacement" element={<Layout><BatteryReplacement /></Layout>} />
        <Route path="/ac-evaluation"      element={<Layout><AcEvaluation /></Layout>} />
        <Route path="/truck-tire-change"  element={<Layout><TruckTireChange /></Layout>} />
        <Route path="/trailer-tire-change" element={<Layout><TrailerTireChange /></Layout>} />
        <Route path="/roadside-assistance" element={<Layout><RoadsideAssistance /></Layout>} />

        {/* About / brand pages */}
        <Route path="/fully-equipped"  element={<Layout><FullyEquipped /></Layout>} />
        <Route path="/our-technicians" element={<Layout><OurTechnicians /></Layout>} />
        <Route path="/quality-parts"   element={<Layout><QualityParts /></Layout>} />
        <Route path="/pricing"         element={<Layout><Pricing /></Layout>} />
        <Route path="/satisfaction"    element={<Layout><Satisfaction /></Layout>} />

        {/* 404 catch-all */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </Router>
    </CartProvider>
    </ThemeProvider>
  );
}
