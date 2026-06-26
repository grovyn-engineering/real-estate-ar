import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import LandingPage from './pages/LandingPage'
import PropertyDetails from './pages/PropertyDetails'
import CatalogPage from './pages/CatalogPage'
import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import VRPage from './pages/VRPage'
import Footer from './components/Layout/Footer'
import OpeningSequence from './components/OpeningSequence/OpeningSequence'
import './App.css'

const SESSION_KEY = 'grovyn_opening_seen';

function AppContent() {
    // Decide synchronously on the first render so the curtain is painted
    // immediately - no flash of the underlying page before it mounts.
    const [showOpening, setShowOpening] = useState(
        () => !sessionStorage.getItem(SESSION_KEY) && window.location.pathname === '/'
    );

    const handleOpeningComplete = () => {
        sessionStorage.setItem(SESSION_KEY, '1');
        setShowOpening(false);
    };

    return (
        <>
            {showOpening && <OpeningSequence onComplete={handleOpeningComplete} />}
            <Routes>
                <Route path="/vr/:id" element={<VRPage />} />
                <Route path="*" element={
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
                } />
            </Routes>
        </>
    );
}

function App() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppContent />
        </Router>
    )
}

export default App
