import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Box, MapPin, ScanEye, Maximize2 } from 'lucide-react';
import GalleryView from './GalleryView';
import ThreeDView from './ThreeDView';
import MapView from './MapView';
import VRViewer from '../vr/VRViewer';
import { getProperty } from '../../lib/properties';
import './ViewerTabs.css';

const BASE_TABS = [
    { id: 'gallery', label: 'Gallery', icon: Image, hint: 'Browse property photos' },
    { id: 'vr', label: 'Virtual Tour', icon: ScanEye, hint: '360° rooms, 3D model & floor plan' },
    { id: '3d', label: '3D Model', icon: Box, hint: 'Explore the interior in 3D' },
    { id: 'map', label: 'Location', icon: MapPin, hint: 'Map view & directions' },
];

function VRComingSoon({ images }) {
    return (
        <div className="vr-coming-soon">
            {images && images.length > 0 && (
                <div className="vr-coming-soon-mosaic">
                    {images.slice(0, 4).map((src, i) => (
                        <img key={i} src={src} alt={`Property view ${i + 1}`} />
                    ))}
                </div>
            )}
            <div className="vr-coming-soon-badge">
                <ScanEye size={16} />
                <span>Virtual Tour Coming Soon</span>
            </div>
            <p>We're capturing a full 360° walkthrough, 3D model, and interactive floor plan for this property.</p>
        </div>
    );
}

const ViewerTabs = ({ property }) => {
    const vrProperty = property.vrId ? getProperty(property.vrId) : null;
    const visibleTabs = BASE_TABS;

    const [activeTab, setActiveTab] = useState(vrProperty ? 'vr' : 'gallery');
    const images = property.gallery || [property.image];

    return (
        <div className="viewer-tabs-wrapper">
            <div className="viewer-tabs-header">
                <nav className="viewer-tabs-nav" role="tablist">
                    {visibleTabs.map(({ id, label, icon: Icon }) => (
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

                <div className="tab-header-right">
                    {activeTab === 'vr' && vrProperty ? (
                        <Link to={`/vr/${property.vrId}`} className="fullscreen-btn" title="Open full-screen VR experience">
                            <Maximize2 size={13} />Full Screen
                        </Link>
                    ) : (
                        <p className="tab-hint">{visibleTabs.find(t => t.id === activeTab)?.hint}</p>
                    )}
                </div>
            </div>

            <div className="viewer-tabs-content">
                {activeTab === 'gallery' && (
                    <GalleryView images={images} title={property.title} />
                )}

                {activeTab === 'vr' && (
                    vrProperty
                        ? <div className="vr-embed-container"><VRViewer property={vrProperty} embedded={true} /></div>
                        : <VRComingSoon images={images} />
                )}

                {activeTab === '3d' && (
                    <ThreeDView />
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
