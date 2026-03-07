import React, { useEffect } from 'react';
import './PageWrapper.css';

const PageWrapper = ({ children, title, subtitle, bgImage }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-wrapper">
            {/* Standardized Page Hero */}
            <div className="page-hero">
                {bgImage && (
                    <div
                        className="page-hero-bg"
                        style={{ backgroundImage: `url(${bgImage})` }}
                    />
                )}
                <div className="page-hero-overlay" />
                <div className="container">
                    {title && <h1 className="section-title">{title}</h1>}
                    {subtitle && <p className="section-subtitle">{subtitle}</p>}
                </div>
            </div>

            {/* Content Area */}
            <main className="page-content">
                <div className="container">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default PageWrapper;
