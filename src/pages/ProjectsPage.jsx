import React from 'react';
import { ArrowUpRight, CheckCircle2, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/Layout/PageWrapper';
import { PROJECTS_DATA } from '../components/Projects/ProjectsCarousel';
import './ProjectsPage.css';

const CASE_DETAILS = [
    {
        challenge: 'The sellers required a discreet, high-value sale within a tight timeline while maximising the final price for this landmark estate property.',
        approach: 'We assembled a targeted buyer shortlist from our private network and conducted invitation-only viewings to create competitive tension without public exposure.',
        stats: [
            { label: 'Final Sale Price', value: null },
            { label: 'Days to Offer', value: '18 Days' },
            { label: 'Above Asking', value: '+4.2%' }
        ],
        outcome: 'The property sold above the asking price in under three weeks through an off-market approach, preserving complete privacy for the client.'
    },
    {
        challenge: 'An international buyer needed a trusted local advisor to identify the right luxury penthouse and navigate the acquisition process from overseas.',
        approach: 'We provided end-to-end remote buying support — from curated shortlists and virtual tours to in-person representation, legal coordination, and completion.',
        stats: [
            { label: 'Final Sale Price', value: null },
            { label: 'Saved vs. Asking', value: '6.1%' },
            { label: 'Time to Close', value: '42 Days' }
        ],
        outcome: 'The client secured their ideal property 6% below the initial asking price without ever needing to travel during the negotiation phase.'
    },
    {
        challenge: 'A developer needed to sell a premium villa portfolio simultaneously while maintaining strong individual pricing across each unit.',
        approach: 'We created individual marketing campaigns for each villa, staged them to premium standard, and ran a coordinated launch event for qualified buyers.',
        stats: [
            { label: 'Final Sale Price', value: null },
            { label: 'Sold in First Month', value: '100%' },
            { label: 'Average Premium', value: '+5.8%' }
        ],
        outcome: 'All villas were sold at a combined premium above developer projections, with the entire portfolio cleared within the first 30 days of launch.'
    },
    {
        challenge: 'The owners of a generational estate needed a long-term exit strategy that respected the property\'s heritage while achieving maximum value.',
        approach: 'We ran a structured 90-day global campaign targeting family offices and private collectors, supported by a dedicated PR and heritage property specialist.',
        stats: [
            { label: 'Final Sale Price', value: null },
            { label: 'Global Enquiries', value: '48' },
            { label: 'Final Bid Premium', value: '+9.3%' }
        ],
        outcome: 'A competitive bidding process among five qualified international buyers resulted in a record sale price for the area.'
    },
    {
        challenge: 'First-time investors needed guidance on entering the urban residential market and identifying properties with strong rental yield and growth potential.',
        approach: 'We provided a full investment brief with yield analysis, neighbourhood growth data, and introduced the clients to our lending partner network to optimise financing.',
        stats: [
            { label: 'Final Sale Price', value: null },
            { label: 'Gross Rental Yield', value: '5.8%' },
            { label: 'Saved vs. Market', value: '3.4%' }
        ],
        outcome: 'The clients purchased their first investment property below market rate and achieved a gross rental yield of 5.8% from the first month of tenancy.'
    }
];

const ProjectsPage = () => {
    return (
        <PageWrapper
            title="Case Studies"
            subtitle="A selection of our most notable transactions across India — from private sales to multi-property acquisitions."
            bgImage="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80"
        >
            <div className="case-studies-list">
                {PROJECTS_DATA.map((project, index) => {
                    const details = CASE_DETAILS[index] || CASE_DETAILS[0];
                    return (
                        <div key={project.id} className={`case-study-row ${index % 2 !== 0 ? 'reverse' : ''}`}>
                            <div className="case-study-media">
                                <div className="media-container">
                                    <img src={project.image} alt={project.title} />
                                    <div className="media-overlay" />
                                    <span className="media-badge">{project.type}</span>
                                </div>
                            </div>

                            <div className="case-study-info">
                                <span className="case-label">Case Study</span>
                                <h2>{project.title}</h2>

                                <div className="case-content-grid">
                                    <div className="case-section">
                                        <h4><Target size={16} /> The Challenge</h4>
                                        <p>{details.challenge}</p>
                                    </div>
                                    <div className="case-section">
                                        <h4><CheckCircle2 size={16} /> Our Approach</h4>
                                        <p>{details.approach}</p>
                                    </div>
                                </div>

                                <div className="case-stats-row">
                                    {details.stats.map((stat, sIdx) => (
                                        <div className="case-stat" key={sIdx}>
                                            <span className="stat-label">{stat.label}</span>
                                            <span className="stat-value">
                                                {stat.value || project.price}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="case-outcome glass-card">
                                    <strong><TrendingUp size={14} /> Final Outcome:</strong>
                                    <p>{details.outcome}</p>
                                </div>

                                <Link to="/catalog" className="btn-primary-sm">
                                    View Properties <ArrowUpRight size={16} />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="methodology-block glass-card">
                <div className="section-header text-center">
                    <span className="section-label">Our Methodology</span>
                    <h2>How we achieve exceptional results</h2>
                </div>
                <div className="method-grid">
                    <div className="method-item">
                        <div className="method-number">01</div>
                        <h4>Discovery & Strategy</h4>
                        <p>We begin with an in-depth consultation to understand your goals, timeline, and priorities — then build a tailored transaction strategy around them.</p>
                    </div>
                    <div className="method-item">
                        <div className="method-number">02</div>
                        <h4>Market Intelligence</h4>
                        <p>Comprehensive analysis of comparable transactions, active demand signals, and local market conditions ensures precise pricing and positioning.</p>
                    </div>
                    <div className="method-item">
                        <div className="method-number">03</div>
                        <h4>Execution & Close</h4>
                        <p>From first viewing to final signature, we manage every detail — negotiations, legal coordination, and completion — with dedicated white-glove support.</p>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default ProjectsPage;
