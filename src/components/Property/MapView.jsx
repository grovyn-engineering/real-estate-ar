import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, ExternalLink, MapPin, Play, Square } from 'lucide-react';
import './MapView.css';

// Gold SVG marker for the property
const createGoldMarker = () => L.divIcon({
    html: `
        <div class="map-gold-pin">
            <div class="map-gold-pin-inner"></div>
        </div>
    `,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -38],
    className: '',
});

// Green start marker
const createStartMarker = () => L.divIcon({
    html: `<div class="map-start-pin"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    className: '',
});

const MapView = ({ coordinates, title, location }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const walkthroughRef = useRef(null);
    const [isWalking, setIsWalking] = useState(false);

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        const [lat, lng] = coordinates;

        // Build a simulated walking route near the property
        const routePoints = [
            [lat + 0.006, lng - 0.004],
            [lat + 0.004, lng - 0.002],
            [lat + 0.003, lng + 0.001],
            [lat + 0.0015, lng - 0.0005],
            [lat + 0.001, lng + 0.0005],
            [lat, lng],
        ];

        // Init map
        const map = L.map(mapRef.current, {
            zoomControl: false,
            attributionControl: false,
        }).setView([lat + 0.003, lng], 15);

        mapInstanceRef.current = map;

        // Add zoom control to bottom-right
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // Tile layer — CartoDB dark
        L.tileLayer(
            'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
            { subdomains: 'abcd', maxZoom: 19 }
        ).addTo(map);

        // Attribution (small, bottom-left)
        L.control.attribution({ position: 'bottomleft', prefix: false })
            .addAttribution('© <a href="https://carto.com">CARTO</a> © <a href="https://openstreetmap.org">OSM</a>')
            .addTo(map);

        // Walking route polyline
        L.polyline(routePoints, {
            color: '#b8902a',
            weight: 4,
            opacity: 0.85,
            dashArray: '10, 7',
            lineJoin: 'round',
        }).addTo(map);

        // Animated pulse circle under property marker
        L.circle(coordinates, {
            radius: 80,
            color: '#b8902a',
            fillColor: '#b8902a',
            fillOpacity: 0.08,
            weight: 1,
        }).addTo(map);

        // Start point marker
        L.marker(routePoints[0], { icon: createStartMarker() })
            .addTo(map)
            .bindPopup('<b>Starting Point</b><br/>Walking route begins here', { className: 'map-popup' });

        // Property marker
        L.marker(coordinates, { icon: createGoldMarker() })
            .addTo(map)
            .bindPopup(
                `<div class="map-popup-content"><strong>${title}</strong><br/><span>${location}</span></div>`,
                { className: 'map-popup', maxWidth: 220 }
            )
            .openPopup();

        // Distance label on route mid-point
        const mid = routePoints[Math.floor(routePoints.length / 2)];
        L.marker(mid, {
            icon: L.divIcon({
                html: `<div class="map-distance-badge">~8 min walk</div>`,
                iconSize: [90, 24],
                iconAnchor: [45, 12],
                className: '',
            }),
        }).addTo(map);

        // Walkthrough: animate the map through route points
        const startWalkthrough = () => {
            setIsWalking(true);
            let step = 0;
            map.flyTo(routePoints[0], 17, { duration: 1.2 });

            walkthroughRef.current = setInterval(() => {
                step++;
                if (step >= routePoints.length) {
                    clearInterval(walkthroughRef.current);
                    walkthroughRef.current = null;
                    setIsWalking(false);
                    map.flyTo(coordinates, 17, { duration: 1.0 });
                    return;
                }
                map.flyTo(routePoints[step], 17, { duration: 1.8, easeLinearity: 0.5 });
            }, 2200);
        };

        const stopWalkthrough = () => {
            if (walkthroughRef.current) {
                clearInterval(walkthroughRef.current);
                walkthroughRef.current = null;
            }
            setIsWalking(false);
            map.flyTo([lat + 0.003, lng], 15, { duration: 1.0 });
        };

        // Expose controls to buttons via DOM events
        mapRef.current._startWalkthrough = startWalkthrough;
        mapRef.current._stopWalkthrough = stopWalkthrough;

        return () => {
            if (walkthroughRef.current) clearInterval(walkthroughRef.current);
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        };
    }, [coordinates, title, location]);

    const handleWalkthrough = () => {
        if (!mapRef.current) return;
        if (isWalking) {
            mapRef.current._stopWalkthrough?.();
        } else {
            mapRef.current._startWalkthrough?.();
        }
    };

    const [lat, lng] = coordinates;

    return (
        <div className="map-view-wrapper">
            {/* Map */}
            <div ref={mapRef} className="map-container" />

            {/* Top-left info badge */}
            <div className="map-location-badge">
                <MapPin size={13} className="map-badge-icon" />
                <span>{location}</span>
            </div>

            {/* Controls footer */}
            <div className="map-footer">
                <div className="map-legend">
                    <div className="legend-item">
                        <div className="legend-dot legend-dot--green" />
                        <span>Start</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-line" />
                        <span>Route</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-dot legend-dot--gold" />
                        <span>Property</span>
                    </div>
                </div>

                <div className="map-actions">
                    <button
                        className={`map-walkthrough-btn ${isWalking ? 'active' : ''}`}
                        onClick={handleWalkthrough}
                    >
                        {isWalking ? <><Square size={14} /> Stop</> : <><Play size={14} /> Walkthrough</>}
                    </button>

                    <a
                        href={`https://maps.google.com/maps?q=${lat},${lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-gmaps-btn"
                    >
                        <Navigation size={14} />
                        <span>Google Maps</span>
                        <ExternalLink size={12} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MapView;
