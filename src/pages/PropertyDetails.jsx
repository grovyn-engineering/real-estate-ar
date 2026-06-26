import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Phone, Mail, Calendar, Layers, Zap, ArrowUpRight } from 'lucide-react';
import PageWrapper from '../components/Layout/PageWrapper';
import ViewerTabs from '../components/Property/ViewerTabs';
import { PROPERTIES } from '../data/properties';
import './PropertyDetails.css';

const PropertyDetails = () => {
    const { id } = useParams();
    const property = PROPERTIES.find(p => p.id === parseInt(id));

    if (!property) return (
        <PageWrapper title="Not Found">
            <div className="error-state">
                <h2>Project data could not be retrieved.</h2>
                <Link to="/catalog" className="btn-primary">Return to Portfolio</Link>
            </div>
        </PageWrapper>
    );

    return (
        <PageWrapper
            title={property.title}
            subtitle={property.location}
            bgImage={property.image}
        >
            <div className="details-refined-grid">
                <div className="details-main-content">
                    <div className="back-nav">
                        <Link to="/catalog" className="link-with-icon">
                            <ChevronLeft size={16} /> Back to Portfolio
                        </Link>
                    </div>

                    <div className="interactive-viewer-box glass-card">
                        <ViewerTabs property={property} />
                    </div>

                    <div className="project-extensive-description">
                        <div className="desc-header">
                            <span className="section-label">Property Overview</span>
                            <h2>About This Property</h2>
                        </div>
                        <p>{property.description}</p>

                        <div className="technical-specs-grid">
                            <div className="spec-card">
                                <Layers size={24} className="gold-text" />
                                <h4>Property Type</h4>
                                <p>{property.type} - premium finishes and thoughtfully designed living spaces throughout.</p>
                            </div>
                            <div className="spec-card">
                                <Zap size={24} className="gold-text" />
                                <h4>Investment Potential</h4>
                                <p>Strong capital growth trajectory based on location demand and comparable sales data.</p>
                            </div>
                        </div>

                        <div className="key-highlights">
                            <h3>Key Features</h3>
                            <div className="highlights-pills">
                                {property.features.map((feature, index) => (
                                    <div key={index} className="highlight-pill">
                                        <div className="pill-dot"></div>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="details-sidebar-sticky">
                    <div className="concierge-card glass-card">
                        <span className="concierge-label">Concierge Service</span>
                        <h3>Arrange a Private Viewing</h3>
                        <p>Our dedicated advisors will arrange an exclusive viewing and answer any questions about this property.</p>

                        <div className="concierge-actions">
                            <button className="btn-primary w-full">
                                <Phone size={18} /> Call an Advisor
                            </button>
                            <button className="btn-outline w-full">
                                <Mail size={18} /> Request a Brochure
                            </button>
                            <button className="btn-outline w-full luxe">
                                <Calendar size={18} /> Book a Viewing
                            </button>
                        </div>

                        <div className="response-guarantee">
                            <Zap size={14} fill="currentColor" />
                            <span>Average response time: 2 hours</span>
                        </div>
                    </div>

                    <div className="sidebar-promo">
                        <h4>Interested in this area?</h4>
                        <p>We have access to exclusive off-market listings in this neighbourhood that aren't publicly advertised.</p>
                        <Link to="/contact" className="link-with-icon gold-text">
                            Speak to an advisor <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default PropertyDetails;
