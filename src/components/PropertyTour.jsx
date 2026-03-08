import React, { useState, useCallback } from 'react';
import PanoramaViewer from './PanoramaViewer';

import './PropertyTour.css';

const USE_EQUIRECTANGULAR = false;
const PANORAMA_JPG = '/panorama/panorama.jpg';
const getCubemapUrl = (face) => `/panorama/cube_${face}.png`;

const ROOMS = {
    office_main: {
        id: 'office_main',
        label: 'Main Office',
        panorama: USE_EQUIRECTANGULAR
            ? PANORAMA_JPG
            : {
                  left: getCubemapUrl('left'),
                  front: getCubemapUrl('front'),
                  right: getCubemapUrl('right'),
                  back: getCubemapUrl('back'),
                  top: getCubemapUrl('up'),
                  bottom: getCubemapUrl('down'),
              },
        markers: [],
    },
};

const PropertyTour = () => {
    const [currentRoom, setCurrentRoom] = useState('office_main');
    const roomIds = Object.keys(ROOMS);
    const room = ROOMS[currentRoom];

    const handleMarkerClick = useCallback((data) => {
        if (data?.navigateTo && ROOMS[data.navigateTo]) {
            setCurrentRoom(data.navigateTo);
        }
    }, []);

    return (
        <section className="property-tour-section">
            <div className="property-tour-header">
                <h2>🏢 Virtual Property Tour</h2>
            </div>

            {roomIds.length > 1 && (
                <div className="property-tour-rooms">
                    {roomIds.map((id) => (
                        <button
                            key={id}
                            className={`property-tour-room-btn ${currentRoom === id ? 'active' : ''}`}
                            onClick={() => setCurrentRoom(id)}
                        >
                            {ROOMS[id].label}
                        </button>
                    ))}
                </div>
            )}

            <div className="property-tour-viewer-wrap">
                <PanoramaViewer
                    key={currentRoom}
                    panorama={room?.panorama}
                    markers={room?.markers ?? []}
                    onMarkerClick={handleMarkerClick}
                />
            </div>

            <p className="property-tour-footer">
                💡 Click and drag to look around · Scroll to zoom · Use fullscreen for best experience
            </p>
        </section>
    );
};

export default PropertyTour;
