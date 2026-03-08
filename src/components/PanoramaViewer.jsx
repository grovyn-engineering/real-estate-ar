import React, { useEffect, useRef } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { EquirectangularAdapter } from '@photo-sphere-viewer/core';
import { CubemapAdapter } from '@photo-sphere-viewer/cubemap-adapter';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';

const isCubemap = (p) => p && typeof p === 'object' && ['left', 'front', 'right', 'back', 'top', 'bottom'].every((k) => k in p);

const PanoramaViewer = ({ panorama, markers = [], onMarkerClick }) => {
    const containerRef = useRef(null);
    const viewerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !panorama) return;

        let cancelled = false;

        const initViewer = () => {
            if (cancelled || !containerRef.current) return;

            const markersConfig = markers.map((m) => ({
                id: m.id,
                position: { yaw: m.yaw, pitch: m.pitch },
                html: `<div class="tour-hotspot">${m.label}</div>`,
                size: { width: 140, height: 36 },
                anchor: 'center center',
                data: { navigateTo: m.navigateTo, ...m },
            }));

            const useCubemap = isCubemap(panorama);
            const viewer = new Viewer({
                container: containerRef.current,
                adapter: useCubemap ? CubemapAdapter : EquirectangularAdapter,
                panorama: useCubemap ? panorama : (typeof panorama === 'string' ? panorama : null),
                size: { width: '100%', height: '100%' },
                navbar: ['zoom', 'fullscreen'],
                defaultZoomLvl: 50,
                defaultYaw: 0,
                defaultPitch: 0,
                plugins: [
                    [
                        MarkersPlugin,
                        {
                            clickEventOnMarker: true,
                            defaultHoverScale: true,
                            markers: markersConfig,
                        },
                    ],
                ],
            });

            viewerRef.current = viewer;

            viewer.addEventListener('panorama-error', (e) => {
                console.error('Panorama load error:', e.args?.[0]);
            });

            const markersPlugin = viewer.getPlugin(MarkersPlugin);
            const handleSelectMarker = (e) => {
                const marker = e.args?.[0];
                if (marker?.data && onMarkerClick) {
                    onMarkerClick(marker.data);
                }
            };

            if (markersPlugin) {
                markersPlugin.addEventListener('select-marker', handleSelectMarker);
            }
        };

        const raf = requestAnimationFrame(() => {
            if (!cancelled) initViewer();
        });

        return () => {
            cancelled = true;
            cancelAnimationFrame(raf);
            if (viewerRef.current) {
                viewerRef.current.destroy();
                viewerRef.current = null;
            }
        };
    }, [panorama, onMarkerClick, markers]);

    if (!panorama) return null;

    return <div ref={containerRef} className="panorama-viewer-container" style={{ width: '100%', height: '100%' }} />;
};

export default PanoramaViewer;
