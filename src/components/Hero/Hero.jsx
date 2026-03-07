import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, Search } from 'lucide-react';
import gsap from 'gsap';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef();
    const titleRef = useRef();
    const descRef = useRef();
    const btnsRef = useRef();
    const statsRef = useRef();
    const scrollRef = useRef();

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // tl.from(titleRef.current, { y: 60, opacity: 0, duration: 1.1 })
        //     .from(descRef.current, { y: 30, opacity: 0, duration: 0.8 }, '-=0.7')
        //     .from(btnsRef.current, { y: 25, opacity: 0, duration: 0.7 }, '-=0.6')
        //     .from(statsRef.current, { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
        //     .from(scrollRef.current, { opacity: 0, duration: 0.5 }, '-=0.3');

        const hero = heroRef.current;
        const handleMouseMove = (e) => {
            const { clientX, clientY, currentTarget } = e;
            const { width, height } = currentTarget.getBoundingClientRect();
            const x = (clientX / width - 0.5) * 10;
            const y = (clientY / height - 0.5) * 7;
            gsap.to('.hero-bg', { x, y, duration: 1.2, ease: 'power1.out' });
        };
        hero.addEventListener('mousemove', handleMouseMove);
        return () => hero.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const scrollToContent = () => {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <section className="hero-premium" ref={heroRef}>
            <div className="hero-bg" />
            <div className="hero-overlay" />

            <div className="hero-content container">
                <div className="hero-main-text">
                    <span className="hero-label">Premium Real Estate</span>

                    <h1 className="hero-title" ref={titleRef}>
                        Find Your<br />
                        <span className="title-accent">Dream</span><br />
                        Property.
                    </h1>

                    <p className="hero-subtitle" ref={descRef}>
                        We curate the world's finest residential properties — from urban penthouses
                        to coastal villas. Expert guidance, seamless experience, exceptional results.
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

                {/* <div className="hero-bottom-stats" ref={statsRef}>
                    <div className="stat-group">
                        <div className="stat-profile-imgs">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80" alt="Client" />
                            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80" alt="Client" />
                            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80" alt="Client" />
                        </div>
                        <p className="stat-text-small">
                            Trusted by <strong>1,200+</strong> homeowners.<br />
                            Expert advice. Every step.
                        </p>
                    </div>

                    <div className="stat-metrics">
                        <div className="metric-item">
                            <h3>850<span className="metric-plus">+</span></h3>
                            <p>Properties<br />sold</p>
                        </div>
                        <div className="metric-item">
                            <h3>15<span className="metric-plus">yr</span></h3>
                            <p>Industry<br />experience</p>
                        </div>
                        <div className="metric-item">
                            <h3>42<span className="metric-plus"></span></h3>
                            <p>Cities<br />covered</p>
                        </div>
                        <div className="metric-item">
                            <h3>4.9<span className="metric-plus">★</span></h3>
                            <p>Average client<br />rating</p>
                        </div>
                    </div>
                </div> */}
            </div>

            <button className="hero-scroll-btn" ref={scrollRef} onClick={scrollToContent} aria-label="Scroll down">
                <ArrowDown size={18} />
            </button>
        </section>
    );
};

export default Hero;
