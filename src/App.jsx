import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import LandingPage from './pages/LandingPage'
import PropertyDetails from './pages/PropertyDetails'
import CatalogPage from './pages/CatalogPage'
import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import Footer from './components/Layout/Footer'
import './App.css'

function App() {
    return (
        <Router>
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
        </Router>
    )
}

export default App
