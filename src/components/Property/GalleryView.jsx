import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import './GalleryView.css';

const GalleryView = ({ images, title }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const prev = useCallback(() =>
        setActiveIndex(i => (i - 1 + images.length) % images.length),
        [images.length]
    );
    const next = useCallback(() =>
        setActiveIndex(i => (i + 1) % images.length),
        [images.length]
    );

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
        if (e.key === 'Escape') setLightboxOpen(false);
    }, [prev, next]);

    return (
        <>
            <div className="gallery-view" onKeyDown={handleKeyDown} tabIndex={-1}>
                <div className="gallery-main">
                    <img
                        key={activeIndex}
                        src={images[activeIndex]}
                        alt={`${title} - view ${activeIndex + 1}`}
                        className="gallery-main-image"
                    />

                    <button className="gallery-nav-btn gallery-nav-prev" onClick={prev} aria-label="Previous">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="gallery-nav-btn gallery-nav-next" onClick={next} aria-label="Next">
                        <ChevronRight size={20} />
                    </button>

                    <button
                        className="gallery-expand-btn"
                        onClick={() => setLightboxOpen(true)}
                        aria-label="View fullscreen"
                    >
                        <Expand size={16} />
                    </button>

                    <div className="gallery-counter">
                        {activeIndex + 1} <span>/</span> {images.length}
                    </div>

                    <div className="gallery-dots">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                className={`gallery-dot ${i === activeIndex ? 'active' : ''}`}
                                onClick={() => setActiveIndex(i)}
                                aria-label={`Go to image ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="gallery-thumbnails">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            className={`gallery-thumb ${i === activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(i)}
                            aria-label={`Thumbnail ${i + 1}`}
                        >
                            <img src={img} alt={`${title} thumbnail ${i + 1}`} loading="lazy" />
                            {i === activeIndex && <div className="gallery-thumb-active-bar" />}
                        </button>
                    ))}
                </div>
            </div>

            {lightboxOpen && (
                <div className="gallery-lightbox" onClick={() => setLightboxOpen(false)}>
                    <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setLightboxOpen(false)}>✕</button>
                        <button className="lightbox-nav lightbox-prev" onClick={prev}><ChevronLeft size={28} /></button>
                        <img src={images[activeIndex]} alt={`${title} fullscreen`} className="lightbox-image" />
                        <button className="lightbox-nav lightbox-next" onClick={next}><ChevronRight size={28} /></button>
                        <div className="lightbox-counter">{activeIndex + 1} / {images.length}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GalleryView;
