import React from 'react';
import { Link } from 'react-router-dom';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
    return (
        <div className="property-card-revised">
            <div className="card-media">
                <img src={property.image} alt={property.title} />

                <div className="card-top-info">
                    <div className="price-tag serif">
                        {property.price} <span className="currency">CAD</span>
                    </div>
                    <div className="address-tag">
                        {property.location}
                    </div>
                </div>

                <div className="card-bottom-specs">
                    <div className="spec-item">
                        <span className="spec-val">03</span>
                        <span className="spec-label">Bedrooms</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-val">04</span>
                        <span className="spec-label">Bathrooms</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-val">360m²</span>
                        <span className="spec-label">Living Area</span>
                    </div>
                </div>
            </div>

            <Link to={`/property/${property.id}`} className="card-action-revised">
                LEARN MORE
            </Link>
        </div>
    );
};

export default PropertyCard;
