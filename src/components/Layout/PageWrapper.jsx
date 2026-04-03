import React, { useEffect } from 'react';
import './PageWrapper.css';

const PageWrapper = ({ children, title, subtitle, bgImage, label }) => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return (
        <div className="page-wrapper">
            <div className="page-hero">
                {bgImage && (
                    <div
                        className="page-hero-bg"
                        style={{ backgroundImage: `url(${bgImage})` }}
                    />
                )}
                <div className="page-hero-overlay" />
                <div className="container page-hero-content">
                    {label && <span className="page-hero-label">{label}</span>}
                    {title && <h1 className="section-title">{title}</h1>}
                    {subtitle && <p className="section-subtitle">{subtitle}</p>}
                </div>
            </div>

            <main className="page-content">
                <div className="container">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default PageWrapper;
