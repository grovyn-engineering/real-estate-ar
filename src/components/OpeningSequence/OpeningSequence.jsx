import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './OpeningSequence.css';

export default function OpeningSequence({ onComplete }) {
    const containerRef = useRef(null);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        gsap.set(textRef.current, { opacity: 0, y: 20, scale: 0.98 });
        gsap.set([leftPanelRef.current, rightPanelRef.current], { x: 0 });

        tl
            // 1. Brand reveals on the closed curtain
            .to(textRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                ease: 'power3.out',
            })
            // 2. Hold a beat, then fade the brand back out
            .to(
                textRef.current,
                {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.inOut',
                },
                '+=0.7'
            )
            // 3. Curtains split open from the centre to reveal the page
            .to(
                [leftPanelRef.current, rightPanelRef.current],
                {
                    x: (i) => (i === 0 ? '-100%' : '100%'),
                    duration: 1.1,
                    ease: 'power4.inOut',
                    onComplete,
                },
                '-=0.15'
            );
    }, [onComplete]);

    return (
        <div ref={containerRef} className="opening-sequence">
            <div ref={leftPanelRef} className="opening-panel opening-panel-left" />
            <div ref={rightPanelRef} className="opening-panel opening-panel-right" />

            <div ref={textRef} className="opening-text">
                <h1 className="opening-title">Grovyn Properties</h1>
                <p className="opening-subtitle">Find Your Dream Home in India</p>
            </div>
        </div>
    );
}
