import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Calendar, PhoneCall } from 'lucide-react';
import './FinalCTA.css';

const FinalCTA = () => {
    return (
        <section className="final-cta-section">
            <div className="container">
                <div className="final-cta-flex">
                    <div className="final-cta-media">
                        <div className="final-img-container">
                            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80" alt="Luxury property" />
                            <div className="cta-float-badge">
                                <CheckCircle2 size={20} className="gold-text" />
                                <span>Trusted by 1,200+ homeowners</span>
                            </div>
                        </div>
                    </div>

                    <div className="final-cta-details">
                        <div className="final-cta-header">
                            <span className="section-label">Start Your Journey</span>
                            <h2 className="final-cta-title">
                                Ready to find your<br />perfect home?
                            </h2>
                            <p className="final-cta-lead">
                                Our specialist agents provide white-glove service from first search to final signature.
                                Get a tailored shortlist of properties matched to your exact requirements.
                            </p>
                        </div>

                        <ul className="premium-check-list">
                            <li>
                                <CheckCircle2 size={18} />
                                <span>Personal property advisor assigned to you</span>
                            </li>
                            <li>
                                <CheckCircle2 size={18} />
                                <span>Access to off-market & exclusive listings</span>
                            </li>
                            <li>
                                <CheckCircle2 size={18} />
                                <span>Free market valuation for sellers</span>
                            </li>
                            <li>
                                <CheckCircle2 size={18} />
                                <span>Seamless legal & financial support</span>
                            </li>
                        </ul>

                        <div className="final-cta-actions">
                            <Link to="/contact" className="btn-primary-luxe">
                                <PhoneCall size={18} /> Book a Free Consultation
                            </Link>
                            <Link to="/catalog" className="btn-outline-luxe">
                                <ArrowUpRight size={18} /> Browse Properties
                            </Link>
                        </div>

                        <div className="milestones-row">
                            <div className="milestone-item">
                                <strong>Est. 2009</strong>
                                <p>15 years of real estate excellence.</p>
                            </div>
                            <div className="milestone-item">
                                <Calendar size={18} className="gold-text" />
                                <p>Viewings available 7 days a week.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
