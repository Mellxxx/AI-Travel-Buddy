import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';


// shadcn/ui Imports
import { ThemeProvider } from './utils/ThemeProvider';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./components/ui/tooltip";


// GA4
import { initGA, logPageView } from './utils/analytics';


// Components Imports
import ModeToggle from './components/ModeToggle';
import CookieConsent from './components/CookieConsent';
import DonatePopup from './components/DonatePopup';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';


// Pages Imports
import DestinationRecco from './pages/DestinationRecco';
import CookiePolicy from './pages/CookiePolicy';
import SiteNotice from './pages/SiteNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Gtm from './pages/Gtm';
import DestinationDetail from './pages/DestinationDetail';
import NotFound from './pages/NotFound';
import Home from './pages/Home';



function App() {

  // Initialize GA4 start 
  const location = useLocation();
  const [gaInitialized, setGaInitialized] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'true' && !gaInitialized) {
      initGA();
      setGaInitialized(true);
    }
  }, [gaInitialized]);

  useEffect(() => {
    if (gaInitialized) {
      logPageView();
    }
  }, [location, gaInitialized]);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    if (!gaInitialized) {
      initGA();
      setGaInitialized(true);
      logPageView();
    }
  };
  // Initialize GA4 end


  return (
    <div>


      <ScrollToTop />
      <ThemeProvider>
        <CookieConsent onAccept={handleAcceptCookies} />
        <DonatePopup />
        <TooltipProvider>
          <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-0 pt-5'>
            <ModeToggle />
          </div>
          <Routes>
            <Route path="/find-destination" element={<DestinationRecco />} />
            <Route path="/site-notice" element={<SiteNotice />} />
            <Route path="/general-terms-and-conditions" element={<Gtm />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="destination/:country" element={<DestinationDetail />} />
            <Route path='/' element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </TooltipProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
