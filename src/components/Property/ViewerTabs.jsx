import React, { useState } from 'react';
import { Image, Box, MapPin } from 'lucide-react';
import GalleryView from './GalleryView';
import ThreeDView from './ThreeDView';
import MapView from './MapView';
import './ViewerTabs.css';

const TABS = [
    { id: 'gallery', label: 'Gallery', icon: Image, hint: 'Browse property photos' },
    { id: '3d', label: '3D Model', icon: Box, hint: 'Explore the interior in 3D' },
    { id: 'map', label: 'Location & Route', icon: MapPin, hint: 'Map view & walkthrough' },
];

const ViewerTabs = ({ property }) => {
    const [activeTab, setActiveTab] = useState('gallery');
    const images = property.gallery || [property.image];

    return (
        <div className="viewer-tabs-wrapper">
            <div className="viewer-tabs-header">
                <nav className="viewer-tabs-nav" role="tablist">
                    {TABS.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            role="tab"
                            aria-selected={activeTab === id}
                            className={`tab-btn ${activeTab === id ? 'active' : ''}`}
                            onClick={() => setActiveTab(id)}
                        >
                            <Icon size={15} />
                            <span>{label}</span>
                        </button>
                    ))}
                </nav>
                <p className="tab-hint">
                    {TABS.find(t => t.id === activeTab)?.hint}
                </p>
            </div>

            <div className="viewer-tabs-content">
                {activeTab === 'gallery' && (
                    <GalleryView images={images} title={property.title} />
                )}
                {activeTab === '3d' && (
                    <ThreeDView propertyType={property.type} />
                )}
                {activeTab === 'map' && (
                    <MapView
                        coordinates={property.coordinates}
                        title={property.title}
                        location={property.location}
                    />
                )}
            </div>
        </div>
    );
};

export default ViewerTabs;
