import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, DollarSign, Home } from 'lucide-react';
import './SearchBar.css';

const SearchBar = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({ location: '', budget: '', type: '' });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (filters.location) params.set('search', filters.location);
        if (filters.budget) params.set('budget', filters.budget);
        if (filters.type) params.set('type', filters.type);
        navigate(`/catalog?${params.toString()}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <div className="search-field">
                    <MapPin className="field-icon" size={18} />
                    <div className="field-inputs">
                        <span className="field-label">Location</span>
                        <input
                            type="text"
                            name="location"
                            placeholder="City, locality, or area..."
                            value={filters.location}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>

                <div className="divider"></div>

                <div className="search-field">
                    <DollarSign className="field-icon" size={18} />
                    <div className="field-inputs">
                        <span className="field-label">Budget</span>
                        <select name="budget" value={filters.budget} onChange={handleChange}>
                            <option value="">Any Price</option>
                            <option value="under1cr">Under ₹1 Cr</option>
                            <option value="1cr-3cr">₹1 Cr – ₹3 Cr</option>
                            <option value="3cr-5cr">₹3 Cr – ₹5 Cr</option>
                            <option value="5cr+">₹5 Cr+</option>
                        </select>
                    </div>
                </div>

                <div className="divider"></div>

                <div className="search-field">
                    <Home className="field-icon" size={18} />
                    <div className="field-inputs">
                        <span className="field-label">Property Type</span>
                        <select name="type" value={filters.type} onChange={handleChange}>
                            <option value="">All Types</option>
                            <option value="Villa">Villa</option>
                            <option value="Penthouse">Penthouse</option>
                            <option value="Flat">Flat / Apartment</option>
                            <option value="Land/Estate">Plot / Land</option>
                        </select>
                    </div>
                </div>

                <button className="search-btn" onClick={handleSearch}>
                    <Search size={20} />
                    <span>Search</span>
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
