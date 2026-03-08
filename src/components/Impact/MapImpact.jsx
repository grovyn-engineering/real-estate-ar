import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Home, Users, MapPin, Award } from 'lucide-react';
import './MapImpact.css';

const STATS = [
    { icon: <Home size={28} />, value: '850+', label: 'Properties Sold', desc: 'Across India\'s premium residential markets' },
    { icon: <Users size={28} />, value: '1,200+', label: 'Happy Families', desc: 'Who found their dream home through us' },
    { icon: <MapPin size={28} />, value: '25+', label: 'Cities Covered', desc: 'With dedicated local market experts' },
    { icon: <Award size={28} />, value: '15yr', label: 'Industry Experience', desc: 'Of trusted real estate excellence' },
];

const MapImpact = () => {
    return (
        <section className="impact-section">
            <div className="container">
                <div className="impact-header">
                    <div className="impact-header-text">
                        <span className="section-label">Our Track Record</span>
                        <h2 className="impact-title">
                            Trusted by over 1,200 families<br />to find their perfect home
                        </h2>
                    </div>
                    <Link to="/catalog" className="btn-primary">
                        View All Properties <ArrowUpRight size={18} />
                    </Link>
                </div>

                <div className="impact-stats-grid">
                    {STATS.map((stat, i) => (
                        <div key={i} className="impact-stat-card glass-card">
                            <div className="stat-icon-box">{stat.icon}</div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label-main">{stat.label}</div>
                            <p className="stat-desc">{stat.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="impact-map-visual">
                    <div className="impact-map-wrapper">
                        <img
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80"
                            alt="Our pan-India presence"
                            className="impact-map-img"
                        />
                        <div className="impact-map-overlay">
                            <div className="pin" style={{ top: '28%', left: '22%' }}></div>
                            <div className="pin" style={{ top: '35%', left: '48%' }}></div>
                            <div className="pin" style={{ top: '42%', left: '36%' }}></div>
                            <div className="pin" style={{ top: '55%', left: '58%' }}></div>
                            <div className="pin" style={{ top: '48%', left: '70%' }}></div>
                        </div>
                        <div className="map-caption glass-card">
                            <strong>Pan-India Presence</strong>
                            <p>Present across 25+ cities in India</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapImpact;
