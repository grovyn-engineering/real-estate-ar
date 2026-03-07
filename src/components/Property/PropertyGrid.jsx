import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import './PropertyGrid.css';

const PropertyGrid = ({ properties }) => {
    return (
        <div className="property-grid-container">
            <div className="property-grid">
                {properties.length > 0 ? (
                    properties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))
                ) : (
                    <div className="no-results">
                        <h3>No properties found matching your selection.</h3>
                        <p>Try adjusting your filters or searching in a different area.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyGrid;
