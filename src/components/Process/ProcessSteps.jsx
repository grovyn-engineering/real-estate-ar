import React from 'react';
import { Search, MessageSquare, Eye, FileText, Key } from 'lucide-react';
import './ProcessSteps.css';

const STEPS = [
    {
        num: '01',
        icon: <Search size={24} />,
        title: 'Search & Discover',
        desc: 'Browse our curated portfolio or share your requirements with an advisor. We source RERA-approved and exclusive listings across India\'s top cities.',
        img: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=300&q=80',
        dark: true
    },
    {
        num: '02',
        icon: <MessageSquare size={24} />,
        title: 'Expert Consultation',
        desc: 'Your personal advisor creates a shortlist, provides market analysis and guides you through location, pricing and investment potential.',
        img: null,
        dark: false,
        images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&q=80',
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=300&q=80',
        ]
    },
    {
        num: '03',
        icon: <Eye size={24} />,
        title: 'Property Viewings',
        desc: 'Schedule private viewings at your convenience — in person or via immersive virtual tours. We\'ll arrange everything, including travel.',
        profile: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
        profileName: 'Rahul Mehta, Senior Advisor',
        dark: true
    },
    {
        num: '04',
        icon: <FileText size={24} />,
        title: 'Offer & Negotiation',
        desc: 'We negotiate on your behalf to secure the best possible price and terms. Our legal team reviews all contracts and documentation.',
        img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
        dark: true,
        isBg: true
    },
    {
        num: '05',
        icon: <Key size={24} />,
        title: 'Keys in Hand',
        desc: 'We handle every detail through to completion. On handover day, we\'re with you to ensure a seamless transition into your new home.',
        img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
        dark: true,
        isBg: true
    }
];

const ProcessSteps = () => {
    return (
        <section className="process-section">
            <div className="container">
                <div className="process-header">
                    <span className="section-label">How It Works</span>
                    <h2 className="process-main-title">
                        From first search to<br />keys in hand — we guide you every step
                    </h2>
                </div>

                <div className="process-grid">
                    <div className="process-card card-dark process-1">
                        <div className="step-badge">{STEPS[0].num}</div>
                        <div className="step-icon-box">{STEPS[0].icon}</div>
                        <h3 className="process-card-title">{STEPS[0].title}</h3>
                        <p className="process-card-desc">{STEPS[0].desc}</p>
                        <div className="process-img-mockup">
                            <img src={STEPS[0].img} alt={STEPS[0].title} />
                        </div>
                    </div>

                    <div className="process-card card-light process-2">
                        <div className="step-badge dark">{STEPS[1].num}</div>
                        <div className="step-icon-box dark">{STEPS[1].icon}</div>
                        <h3 className="process-card-title dark-text">{STEPS[1].title}</h3>
                        <p className="process-card-desc dark-text">{STEPS[1].desc}</p>
                        <div className="process-img-stack">
                            <img src={STEPS[1].images[0]} alt="Property 1" className="stack-1" />
                            <img src={STEPS[1].images[1]} alt="Property 2" className="stack-2" />
                            <img src={STEPS[1].images[2]} alt="Property 3" className="stack-3" />
                        </div>
                    </div>

                    <div className="process-card card-dark process-3">
                        <div className="step-badge">{STEPS[2].num}</div>
                        <div className="process-3-content">
                            <div className="process-3-text">
                                <div className="step-icon-box">{STEPS[2].icon}</div>
                                <h3 className="process-card-title large">{STEPS[2].title}</h3>
                                <p className="process-card-desc">{STEPS[2].desc}</p>
                            </div>
                            <div className="process-3-profile">
                                <img src={STEPS[2].profile} alt="Advisor" />
                                <span className="profile-name">{STEPS[2].profileName}</span>
                            </div>
                        </div>
                    </div>

                    <div className="process-card process-4 bg-image">
                        <img src={STEPS[3].img} alt={STEPS[3].title} className="bg-img" />
                        <div className="step-badge">{STEPS[3].num}</div>
                        <div className="step-icon-box">{STEPS[3].icon}</div>
                        <h3 className="process-card-title large">{STEPS[3].title}</h3>
                    </div>

                    <div className="process-card process-5 bg-image">
                        <img src={STEPS[4].img} alt={STEPS[4].title} className="bg-img" />
                        <div className="step-badge">{STEPS[4].num}</div>
                        <div className="process-5-content">
                            <div className="step-icon-box">{STEPS[4].icon}</div>
                            <h3 className="process-card-title large">{STEPS[4].title}</h3>
                            <p className="process-card-desc">{STEPS[4].desc}</p>
                            <div className="process-5-contact">
                                <p>Available 7 days<br />a week — 10:00 to 20:00 IST</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSteps;
