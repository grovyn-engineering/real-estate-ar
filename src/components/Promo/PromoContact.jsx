import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import './PromoContact.css';

const PromoContact = () => {
    const [phone, setPhone] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (phone) setSubmitted(true);
    };

    return (
        <section className="promo-section">
            <div className="container">
                <div className="promo-card">
                    <div className="promo-left">
                        <div className="promo-images">
                            <img
                                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&q=80"
                                alt="Luxury villa"
                                className="promo-img-back"
                            />
                            <div className="promo-img-front-wrapper">
                                <img
                                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80"
                                    alt="Penthouse view"
                                    className="promo-img-front"
                                />
                                <div className="promo-value-badge">
                                    <TrendingUp size={16} />
                                    <span>+12% avg. appreciation</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="promo-right">
                        <div className="promo-help-tag">
                            <TrendingUp size={16} />
                            <span>Selling your property?</span>
                        </div>

                        <h2 className="promo-title">
                            Get a free valuation and find out what your property is worth today
                        </h2>

                        <p className="promo-desc">
                            Leave your number and one of our senior valuation experts will call you back within 2 hours.
                        </p>

                        {!submitted ? (
                            <form className="promo-form" onSubmit={handleSubmit}>
                                <input
                                    type="tel"
                                    placeholder="+91 ___________"
                                    className="promo-input"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                                <button type="submit" className="promo-submit">
                                    Get free valuation <span className="submit-icon"><ArrowRight size={16} /></span>
                                </button>
                            </form>
                        ) : (
                            <div className="promo-success">
                                <strong>Thank you!</strong>
                                <p>We'll call you back within 2 hours with your free valuation.</p>
                            </div>
                        )}

                        <p className="promo-disclaimer">No commitment. No spam. 100% confidential.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromoContact;
