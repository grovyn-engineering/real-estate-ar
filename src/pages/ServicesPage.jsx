import React from 'react';
import { ArrowUpRight, Home, TrendingUp, Key, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/Layout/PageWrapper';
import './ServicesPage.css';

const SERVICES_DATA = [
    {
        icon: <Home size={32} />,
        title: 'Property Acquisition',
        label: 'Buy & Invest',
        desc: 'We guide you through every step of buying a home or investment property — from shortlisting and viewings to offer negotiation and legal completion. Our advisors have deep local market knowledge and exclusive off-market access.',
        impact: 'Our buyers on average secure properties 8% below the initial asking price through our expert negotiation process.',
        features: ['Off-Market Listings', 'Expert Negotiation', 'Legal & Due Diligence Support']
    },
    {
        icon: <TrendingUp size={32} />,
        title: 'Property Sales',
        label: 'Sell & Achieve',
        desc: 'Maximize the value of your property with our proven sales methodology. We deliver precision pricing, premium staging, targeted digital marketing, and direct access to our qualified buyer network.',
        impact: 'Properties listed with us sell 32% faster and achieve 6% above market average valuations.',
        features: ['Professional Staging', 'Targeted Buyer Network', 'Premium Photography & Listings']
    },
    {
        icon: <Key size={32} />,
        title: 'Rental Management',
        label: 'Manage & Earn',
        desc: 'End-to-end rental management that removes the stress of being a landlord. We handle tenant sourcing, contracts, inspections, rent collection, and ongoing maintenance coordination for your full portfolio.',
        impact: 'Clients see 95%+ occupancy rates across managed portfolios with zero day-to-day administrative burden.',
        features: ['Tenant Screening', 'Rent Collection', 'Maintenance Coordination']
    },
    {
        icon: <BarChart3 size={32} />,
        title: 'Investment Advisory',
        label: 'Grow & Diversify',
        desc: 'Strategic real estate investment guidance backed by granular market data and portfolio analysis. We identify high-yield opportunities across residential, commercial, and mixed-use asset classes.',
        impact: 'Advisory clients have achieved an average annual property portfolio ROI of 14.2% over five years.',
        features: ['Market Analysis Reports', 'Portfolio Planning', 'ROI Forecasting']
    }
];

const ServicesPage = () => {
    return (
        <PageWrapper
            title="Our Services"
            subtitle="Comprehensive real estate solutions for buyers, sellers, landlords and investors."
            bgImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80"
        >
            <div className="services-content-grid">
                {SERVICES_DATA.map((service, idx) => (
                    <div className="service-refined-card" key={idx}>
                        <div className="service-card-header">
                            <div className="service-icon-box">{service.icon}</div>
                            <span className="service-label-text">{service.label}</span>
                        </div>

                        <div className="service-card-body">
                            <h3>{service.title}</h3>
                            <p className="service-description">{service.desc}</p>

                            <div className="service-impact-box">
                                <strong>Proven Results:</strong>
                                <p>{service.impact}</p>
                            </div>

                            <ul className="service-feature-list">
                                {service.features.map((feat, fIdx) => (
                                    <li key={fIdx}>{feat}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="service-card-footer">
                            <Link to="/contact" className="btn-outline w-full">
                                Learn More <ArrowUpRight size={18} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Strategic Section */}
            <div className="strategic-impact-block glass-card">
                <div className="strategic-text">
                    <span className="section-label">Why Choose Us</span>
                    <h2>A systematic approach to exceptional outcomes</h2>
                    <p>
                        We don't just list properties — we engineer successful transactions. Our team combines deep market
                        intelligence, a proven negotiation framework, and an extensive network of buyers, sellers, and
                        investors to deliver results that consistently exceed expectations. Every client relationship
                        begins with understanding your goals, not just the property.
                    </p>
                </div>
                <div className="strategic-cta">
                    <Link to="/contact" className="btn-primary">Speak to an Advisor</Link>
                </div>
            </div>
        </PageWrapper>
    );
};

export default ServicesPage;
