import React from 'react';
import Hero from '../components/Hero/Hero';
import SearchBar from '../components/Search/SearchBar';
import QuizSection from '../components/Quiz/QuizSection';
import LightingInfo from '../components/Lighting/LightingInfo';
import ProjectsCarousel from '../components/Projects/ProjectsCarousel';
import MapImpact from '../components/Impact/MapImpact';
import PromoContact from '../components/Promo/PromoContact';
import ProcessSteps from '../components/Process/ProcessSteps';
import OtherServices from '../components/Services/OtherServices';
import ReviewsSection from '../components/Reviews/ReviewsSection';
import FAQSection from '../components/FAQ/FAQSection';
import TeamSection from '../components/Team/TeamSection';
import FinalCTA from '../components/CTA/FinalCTA';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page-wrapper">
            <Hero />
            <SearchBar />
            <QuizSection />
            <LightingInfo />
            <ProjectsCarousel />
            <MapImpact />
            <PromoContact />
            <ProcessSteps />
            <div id="services"><OtherServices /></div>
            <div id="reviews"><ReviewsSection /></div>
            <FAQSection />
            <TeamSection />
            <FinalCTA />
        </div>
    );
};

export default LandingPage;
