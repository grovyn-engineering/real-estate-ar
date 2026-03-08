import React, { useRef, useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, Search } from 'lucide-react';
import gsap from 'gsap';
import Hero3DScene from './Hero3DScene';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef();
    const titleRef = useRef();
    const descRef = useRef();
    const btnsRef = useRef();

    useEffect(() => {
        const hero = heroRef.current;
        const handleMouseMove = (e) => {
            const { clientX, clientY, currentTarget } = e;
            const { width, height } = currentTarget.getBoundingClientRect();
            const x = (clientX / width - 0.5) * 10;
            const y = (clientY / height - 0.5) * 7;
            gsap.to('.hero-bg', { x, y, duration: 1.2, ease: 'power1.out' });
        };
        hero.addEventListener('mousemove', handleMouseMove);

        if (titleRef.current) gsap.fromTo(titleRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 });
        if (descRef.current) gsap.fromTo(descRef.current, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 });
        if (btnsRef.current) gsap.fromTo(btnsRef.current, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.7 });

        return () => {
            hero.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const scrollToContent = () => {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <section className="hero-premium" ref={heroRef}>
            <div className="hero-bg" />
            <div className="hero-overlay" />

            <div className="hero-content">
                <div className="hero-main-text">
                    <span className="hero-label">Premium Indian Real Estate</span>

                    <h1 className="hero-title" ref={titleRef}>
                        Find Your<br />
                        <span className="title-accent">Dream</span><br />
                        Home in India.
                    </h1>

                    <p className="hero-subtitle" ref={descRef}>
                        We curate India's finest residential properties — from metro apartments and villas
                        to luxury farmhouses. Expert guidance, RERA compliance, and a seamless experience.
                    </p>

                    <div className="hero-cta-row" ref={btnsRef}>
                        <Link to="/catalog" className="btn-hero-primary">
                            Browse Properties
                            <span className="btn-icon"><ArrowUpRight size={18} /></span>
                        </Link>
                        <Link to="/contact" className="btn-hero-ghost">
                            <span className="consult-icon"><Search size={16} /></span>
                            Free Consultation
                        </Link>
                    </div>
                </div>

                {/* <div className="hero-animation-area">
                    <Suspense fallback={<div className="hero-3d-fallback" />}>
                        <Hero3DScene />
                    </Suspense>
                </div> */}
            </div>

            <button className="hero-scroll-btn" onClick={scrollToContent} aria-label="Scroll down">
                <ArrowDown size={18} />
            </button>
        </section>
    );
};

export default Hero;
