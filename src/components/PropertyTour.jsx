import React, { useState, useCallback } from 'react';
import PanoramaViewer from './PanoramaViewer';

import './PropertyTour.css';

/**
 * Panorama sources (in public/panorama/):
 * - panorama.jpg = single equirectangular 360° JPG (set USE_EQUIRECTANGULAR = true)
 * - cube_*.png = 6-face cubemap (default)
 */
const USE_EQUIRECTANGULAR = false; // Set true when you add panorama.jpg (equirectangular) to public/panorama/
const PANORAMA_JPG = '/panorama/panorama.jpg';
const getCubemapUrl = (face) => `/panorama/cube_${face}.png`;

/**
 * ROOMS config — add more rooms here for multi-room virtual tours.
 * Each room needs: id, label, panorama (6-face cubemap), markers (optional).
 * Markers with navigateTo will switch rooms on click.
 */
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
        markers: [], // Add markers here when more rooms exist, e.g. { id: 'm1', yaw: 0.5, pitch: 0, label: 'Go to Lobby', navigateTo: 'lobby' }
    },
    // Example for adding more rooms:
    // lobby: {
    //     id: 'lobby',
    //     label: 'Lobby',
    //     panorama: { left: lobbyLeft, front: lobbyFront, ... },
    //     markers: [{ id: 'm1', yaw: 0, pitch: 0, label: 'Go to Office', navigateTo: 'office_main' }],
    // },
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
                <h2>🏢 Office Virtual Tour</h2>
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
