import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-standard">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo serif">
                            PREMIUM<br />ESTATES
                        </Link>
                        <p className="footer-tagline">
                            We connect discerning buyers and sellers with the world's finest residential properties. Your trusted partner in luxury real estate.
                        </p>
                        <div className="footer-socials">
                            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-nav">
                        <h4>Company</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/catalog">Properties</Link></li>
                            <li><Link to="/projects">Case Studies</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div className="footer-nav">
                        <h4>Services</h4>
                        <ul>
                            <li><Link to="/services">Buy a Property</Link></li>
                            <li><Link to="/services">Sell Your Home</Link></li>
                            <li><Link to="/services">Rental Management</Link></li>
                            <li><Link to="/services">Investment Advisory</Link></li>
                            <li><Link to="/services">Property Valuation</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-contact">
                        <h4>Get In Touch</h4>
                        <ul className="contact-list">
                            <li>
                                <Phone size={18} />
                                <span>+1 (234) 567-89-00</span>
                            </li>
                            <li>
                                <Mail size={18} />
                                <span>hello@premiumestates.com</span>
                            </li>
                            <li>
                                <MapPin size={18} />
                                <span>One Estate Plaza, New York, NY</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p>&copy; {currentYear} Premium Estates. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
