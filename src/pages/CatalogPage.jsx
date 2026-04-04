import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MapPin, Search, SlidersHorizontal } from 'lucide-react';
import PageWrapper from '../components/Layout/PageWrapper';
import { PROPERTIES } from '../data/properties';
import './CatalogPage.css';

const FILTER_TYPES = ['All Properties', 'Villa', 'Penthouse', 'Land/Estate', 'Flat'];
const TYPE_MAP = { penthouse: 'Penthouse', villa: 'Villa', estate: 'Land/Estate' };

const CatalogPage = () => {
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [activeType, setActiveType] = useState(searchParams.get('type') || 'All Properties');

    useEffect(() => {
        const searchVal = searchParams.get('search');
        const typeVal = searchParams.get('type');
        if (searchVal) setSearchQuery(searchVal);
        if (typeVal) setActiveType(typeVal);
    }, [searchParams]);

    const resolvedType = TYPE_MAP[activeType?.toLowerCase()] || activeType;
    const filtered = PROPERTIES.filter(p => {
        const matchesType = activeType === 'All Properties' || !activeType || p.type === resolvedType;
        const q = searchQuery.toLowerCase();
        const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.type.toLowerCase().includes(q);
        return matchesType && matchesQuery;
    });

    return (
        <PageWrapper
            title="Property Portfolio"
            subtitle="Explore our curated collection of premium homes, villas, penthouses and plots across India."
            bgImage="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80"
            label="Our Collection"
        >
            <div className="portfolio-filters glass-card">
                <div className="search-box">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by location, style, or type..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button className="clear-btn" onClick={() => setSearchQuery('')}>✕</button>
                    )}
                </div>

                <div className="filter-group">
                    {FILTER_TYPES.map(type => (
                        <button
                            key={type}
                            className={`filter-pill ${(activeType === type || resolvedType === type) ? 'active' : ''}`}
                            onClick={() => setActiveType(type)}
                        >
                            {type}
                        </button>
                    ))}
                    <button className="filter-btn-icon" title="More filters">
                        <SlidersHorizontal size={16} />
                    </button>
                </div>
            </div>

            <div className="results-meta">
                <span>{filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found</span>
                {(searchQuery || activeType !== 'All Properties') && (
                    <button
                        className="clear-filters-btn"
                        onClick={() => { setSearchQuery(''); setActiveType('All Properties'); }}
                    >
                        Clear filters
                    </button>
                )}
            </div>

            {filtered.length > 0 ? (
                <div className="portfolio-grid">
                    {filtered.map(project => (
                        <Link to={`/property/${project.id}`} key={project.id} className="portfolio-card">
                            <div className="portfolio-card-img">
                                <img src={project.image} alt={project.title} />
                                <div className="portfolio-badge">{project.type}</div>
                                <div className="portfolio-price-badge">{project.price}</div>
                            </div>
                            <div className="portfolio-card-content">
                                <div className="portfolio-card-meta">
                                    <span className="portfolio-location">
                                        <MapPin size={12} /> {project.location}
                                    </span>
                                </div>
                                <h3>{project.title}</h3>
                                <p className="portfolio-desc">{project.description}</p>
                                <div className="portfolio-card-footer">
                                    <span className="view-details">View Details →</span>
                                    <span className="property-features-count">{project.features.length} features</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="no-results glass-card">
                    <h3>No properties found</h3>
                    <p>Try adjusting your search or filters to find the perfect property.</p>
                    <button className="btn-primary" onClick={() => { setSearchQuery(''); setActiveType('All Properties'); }}>
                        Clear all filters
                    </button>
                </div>
            )}

            <div className="portfolio-cta-block">
                <div className="glass-card flex-between">
                    <div className="cta-text">
                        <h3>Can't find what you're looking for?</h3>
                        <p>Our advisors have access to exclusive off-market listings. Tell us your requirements.</p>
                    </div>
                    <Link to="/contact" className="btn-primary">Speak to an Advisor</Link>
                </div>
            </div>
        </PageWrapper>
    );
};

export default CatalogPage;
