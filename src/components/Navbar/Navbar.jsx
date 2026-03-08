import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`navbar-premium ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container container">
                <div className="nav-logo">
                    <Link to="/" className="brand-name serif">
                        GROVYN<br />PROPERTIES
                    </Link>
                </div>

                <div className="nav-links-pill desktop-only">
                    <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
                    <Link to="/services" className={isActive('/services') ? 'active' : ''}>Services</Link>
                    <Link to="/catalog" className={isActive('/catalog') ? 'active' : ''}>Properties</Link>
                    <Link to="/projects" className={isActive('/projects') ? 'active' : ''}>Projects</Link>
                    <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
                </div>

                <div className="nav-actions desktop-only">
                    <Link to="/contact" className="btn-primary-sm">
                        Request Viewing
                    </Link>
                    <a href="tel:+919876543210" className="nav-phone-pill">
                        <span className="phone-icon-circle"><Phone size={14} /></span>
                        <span className="phone-number">+91 98765 43210</span>
                    </a>
                </div>

                <button
                    className="mobile-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                    <div className="mobile-links">
                        <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
                        <Link to="/services" className={isActive('/services') ? 'active' : ''}>Services</Link>
                        <Link to="/catalog" className={isActive('/catalog') ? 'active' : ''}>Properties</Link>
                        <Link to="/projects" className={isActive('/projects') ? 'active' : ''}>Projects</Link>
                        <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
                    </div>
                    <div className="mobile-cta">
                        <Link to="/contact" className="btn-primary w-full">
                            Request a Viewing <ArrowUpRight size={18} />
                        </Link>
                        <a href="tel:+919876543210" className="mobile-phone">
                            <Phone size={20} /> +91 98765 43210
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
