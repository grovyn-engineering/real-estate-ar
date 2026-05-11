
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
    }
];

const ProjectsPage = () => {
    return (
        <PageWrapper
            title="Case Studies"
            subtitle="A selection of our most notable transactions across India — from private sales to multi-property acquisitions."
            bgImage="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80"
            label="Success Stories"
        >
            <div className="page-container">

                {/* CASE STUDIES */}
                <div className="case-studies-list">
                    {PROJECTS_DATA.map((project, index) => {

                        /* ✅ FIXED ERROR */
                        const details = CASE_DETAILS[index % CASE_DETAILS.length];

                        return (
                            <div
                                key={project.id}
                                className={`case-study-row ${index % 2 !== 0 ? 'reverse' : ''}`}
                            >
                                {/* IMAGE */}
                                <div className="case-study-media">
                                    <div className="media-container">
                                        <img src={project.image} alt={project.title} />
                                        <div className="media-overlay" />
                                        <span className="media-badge">{project.type}</span>
                                    </div>
                                </div>

                                {/* TEXT */}
                                <div className="case-study-info">
                                    <span className="case-label">Case Study</span>
                                    <h2>{project.title}</h2>

                                    <div className="case-content-grid">
                                        <div className="case-section">
                                            <h4><Target size={16}/> The Challenge</h4>
                                            <p>{details?.challenge}</p>
                                        </div>
                                        <div className="case-section">
                                            <h4><CheckCircle2 size={16}/> Our Approach</h4>
                                            <p>{details?.approach}</p>
                                        </div>
                                    </div>

                                    <div className="case-stats-row">
                                        {details.stats.map((stat, i) => (
                                            <div key={i} className="case-stat">
                                                <span className="stat-label">{stat.label}</span>
                                                <span className="stat-value">
                                                    {stat.value || project.price}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="case-outcome">
                                        <strong><TrendingUp size={14}/> Final Outcome:</strong>
                                        <p>{details?.outcome}</p>
                                    </div>
                                   <br/>
                                   <br/>
                                    <Link to="/catalog" className="btn-primary-sm">
                                        View Properties <ArrowUpRight size={16}/>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* METHODOLOGY */}
                <div className="methodology-block">
                    <div className="section-header text-center">
                        <span className="section-label">Our Methodology</span>
                        <h2>How we achieve exceptional results</h2>
                    </div>

                    <div className="method-grid">
                        <div className="method-item">
                            <div className="method-number">01</div>
                            <h4>Discovery & Strategy</h4>
                            <p>We begin with an in-depth consultation...</p>
                        </div>

                        <div className="method-item">
                            <div className="method-number">02</div>
                            <h4>Market Intelligence</h4>
                            <p>Comprehensive analysis ensures precise pricing...</p>
                        </div>

                        <div className="method-item">
                            <div className="method-number">03</div>
                            <h4>Execution & Close</h4>
                            <p>From viewing to signature, we manage everything...</p>
                        </div>
                    </div>
                </div>

            </div>
        </PageWrapper>
    );
};

export default ProjectsPage;