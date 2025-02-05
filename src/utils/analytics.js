import ReactGA from 'react-ga4';

export const initGA = () => {
    ReactGA.initialize('G-GPXYFVE48N');
    // Google Analytics Measurement ID
};

export const sendGAEvent = (eventName, eventParams = {}) => {
    if (window.gtag) {
        window.gtag("event", eventName, eventParams);
    } else {
        console.warn("Google Analytics is not loaded");
    }
};

export const logPageView = () => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
};
