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
import CookieConsent from './components/CookieConsent';
import DonatePopup from './components/DonatePopup';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Header from "./components/Header";

import AppContextProvider from "./context/AppContext";

// Pages Imports
import DestinationRecco from './pages/DestinationRecco';
import CookiePolicy from './pages/CookiePolicy';
import SiteNotice from './pages/SiteNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Gtm from './pages/Gtm';
import DestinationDetail from './pages/DestinationDetail';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Login from './pages/Login';
import Itineraries from './pages/Itineraries';
import CreateItinerarie from './pages/CreateItinerarie';
import MyProfile from './pages/MyProfile';
import Favorites from './pages/Favorites';
import FavoriteDetail from './pages/FavoriteDetail';


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

      <AppContextProvider>
        <ScrollToTop />
        <ThemeProvider>
          <CookieConsent onAccept={handleAcceptCookies} />
          <DonatePopup />
          <TooltipProvider>
            <Header />
            <Routes>
              <Route path="/find-destination" element={<DestinationRecco />} />
              <Route path="/site-notice" element={<SiteNotice />} />
              <Route path="/general-terms-and-conditions" element={<Gtm />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="destination/:country" element={<DestinationDetail />} />
              <Route path='/' element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<Login />} />
              <Route path="/itineraries" element={<Itineraries />} />
              <Route path='/create-itinerary' element={<CreateItinerarie />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/favorites/:id" element={<FavoriteDetail />} />
            </Routes>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </AppContextProvider>
    </div >
  );
}

export default App;
