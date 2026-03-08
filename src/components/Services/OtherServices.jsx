import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './OtherServices.css';

const SERVICES = [
    {
        title: 'Buy Property',
        desc: 'Access our curated portfolio of premium homes across India with expert guidance at every step.',
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
        link: '/services'
    },
    {
        title: 'Sell Property',
        desc: 'Get the best market value with our proven marketing strategy and expert negotiation.',
        img: 'https://images.unsplash.com/photo-1558904541-efa843a96f09?w=600&q=80',
        link: '/services'
    },
    {
        title: 'Rental Management',
        desc: 'Maximise your investment returns with our full-service property management.',
        img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80',
        link: '/services'
    }
];

const OtherServices = () => {
    return (
        <section className="services-section">
            <div className="container">
                <div className="services-section-header">
                    <div>
                        <span className="section-label">What We Offer</span>
                        <h2 className="services-title">Everything you need<br />in one place</h2>
                    </div>
                    <Link to="/services" className="btn-outline">
                        All Services <ArrowUpRight size={16} />
                    </Link>
                </div>

                <div className="services-grid">
                    {SERVICES.map((service, i) => (
                        <div key={i} className="service-card">
                            <div className="service-img-wrapper">
                                <img src={service.img} alt={service.title} />
                                <div className="service-img-overlay" />
                            </div>
                            <div className="service-card-info">
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                                <Link to={service.link} className="service-btn">
                                    Learn more
                                    <span className="btn-icon-dark"><ArrowUpRight size={14} /></span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OtherServices;
