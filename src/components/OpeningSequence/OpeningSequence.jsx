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

        gsap.set(textRef.current, { opacity: 0, y: 16 });
        gsap.set(leftPanelRef.current, { x: 0 });
        gsap.set(rightPanelRef.current, { x: 0 });

        tl.to([leftPanelRef.current, rightPanelRef.current], {
            x: (i) => (i === 0 ? '-100%' : '100%'),
            duration: 1.2,
            ease: 'power3.inOut',
        })
            .to(
                textRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                },
                '-=0.6'
            )
            .to(
                containerRef.current,
                {
                    opacity: 0,
                    duration: 0.7,
                    ease: 'power2.inOut',
                    delay: 1.2,
                    onComplete: onComplete,
                },
                '+=0.5'
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
