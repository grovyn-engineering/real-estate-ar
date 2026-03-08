import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import LandingPage from './pages/LandingPage'
import PropertyDetails from './pages/PropertyDetails'
import CatalogPage from './pages/CatalogPage'
import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import Footer from './components/Layout/Footer'
import OpeningSequence from './components/OpeningSequence/OpeningSequence'
import './App.css'

const SESSION_KEY = 'grovyn_opening_seen';

function AppContent() {
    const [showOpening, setShowOpening] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const seen = sessionStorage.getItem(SESSION_KEY);
        if (!seen && location.pathname === '/') {
            setShowOpening(true);
        }
    }, [location.pathname]);

    const handleOpeningComplete = () => {
        sessionStorage.setItem(SESSION_KEY, '1');
        setShowOpening(false);
    };

    return (
        <>
            {showOpening && <OpeningSequence onComplete={handleOpeningComplete} />}
            <div className="app-main">
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/property/:id" element={<PropertyDetails />} />
                </Routes>
                <Footer />
            </div>
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    )
}

export default App
