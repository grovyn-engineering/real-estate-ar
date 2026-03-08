import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './LightingInfo.css';

const PROPERTY_TYPES = [
    {
        title: 'Penthouses',
        img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
        bullets: [
            'Panoramic city & skyline views from private terraces',
            'Exclusive top-floor living with premium finishes',
            'Private elevator access and 24/7 security'
        ],
        btnText: 'View Penthouses',
        link: '/catalog?type=Penthouse'
    },
    {
        title: 'Luxury Villas',
        img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
        bullets: [
            'Expansive grounds with pools, gardens & outdoor living',
            'Premium villas in Goa, Alibaug, Lonavala & hill stations',
            'Modular kitchens and modern security systems'
        ],
        btnText: 'View Villas',
        link: '/catalog?type=Villa'
    },
    {
        title: 'Private Estates',
        img: 'https://images.unsplash.com/photo-1500382017468-9049fee74a62?w=600&q=80',
        bullets: [
            'Vast land parcels with complete privacy and seclusion',
            'Build your dream home or invest in plotted development',
            'Ideal for multigenerational families and weekend retreats'
        ],
        btnText: 'View Estates',
        link: '/catalog?type=Land/Estate'
    }
];

const LightingInfo = () => {
    return (
        <section className="property-types-section">
            <div className="container">
                <div className="property-types-header">
                    <div>
                        <span className="section-label">Explore by Category</span>
                        <h2 className="property-types-title">
                            Find the property style<br />that fits your lifestyle
                        </h2>
                    </div>
                    <Link to="/catalog" className="btn-outline">
                        All Listings <ArrowUpRight size={16} />
                    </Link>
                </div>

                <div className="property-type-cards-grid">
                    {PROPERTY_TYPES.map((item, index) => (
                        <div key={index} className="property-type-card">
                            <div className="property-type-img-wrap">
                                <img src={item.img} alt={item.title} />
                                <div className="property-type-img-overlay" />
                            </div>

                            <div className="property-type-content">
                                <h3>{item.title}</h3>
                                <ul className="property-type-bullets">
                                    {item.bullets.map((bullet, i) => (
                                        <li key={i}>{bullet}</li>
                                    ))}
                                </ul>
                                <Link to={item.link} className="property-type-btn">
                                    {item.btnText}
                                    <span className="btn-icon-small-dark">
                                        <ArrowUpRight size={14} color="#fff" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LightingInfo;
