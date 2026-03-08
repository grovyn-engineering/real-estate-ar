import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Building2, Home, TreePine, Briefcase } from 'lucide-react';
import './QuizSection.css';

const PROPERTY_TYPES = [
    { id: 'penthouse', title: 'Penthouse', icon: <Building2 size={28} />, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&q=80' },
    { id: 'villa', title: 'Villa', icon: <Home size={28} />, img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=300&q=80' },
    { id: 'estate', title: 'Plot/Land', icon: <TreePine size={28} />, img: 'https://images.unsplash.com/photo-1500382017468-9049fee74a62?w=300&q=80' },
    { id: 'commercial', title: 'Commercial', icon: <Briefcase size={28} />, img: null },
];

const BUDGETS = [
    { id: 'under1cr', label: 'Under ₹1 Cr' },
    { id: '1cr-3cr', label: '₹1 Cr – ₹3 Cr' },
    { id: '2cr-5cr', label: '₹2 Cr – ₹5 Cr' },
    { id: 'above5cr', label: '₹5 Cr+' },
];

const QuizSection = () => {
    const [step, setStep] = useState(1);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedBudget, setSelectedBudget] = useState(null);

    const progress = step === 1 ? (selectedType ? 50 : 5) : (selectedBudget ? 100 : 55);

    return (
        <section className="quiz-section">
            <div className="container quiz-container">
                <div className="quiz-left">
                    <span className="quiz-tag">Property Finder</span>
                    <p className="quiz-subtitle">Answer 2 quick questions and we'll match you with your ideal property.</p>
                    <h2 className="quiz-title">
                        {step === 1 ? 'What type of property are you looking for?' : 'What is your budget range?'}
                    </h2>

                    <div className="quiz-options">
                        {step === 1 ? PROPERTY_TYPES.map((type) => (
                            <div
                                key={type.id}
                                className={`quiz-card ${selectedType === type.id ? 'selected' : ''}`}
                                onClick={() => setSelectedType(type.id)}
                            >
                                <div className="quiz-card-img">
                                    {type.img ? (
                                        <img src={type.img} alt={type.title} />
                                    ) : (
                                        <div className="quiz-card-placeholder">{type.icon}</div>
                                    )}
                                    {selectedType === type.id && (
                                        <div className="quiz-card-check">
                                            <Check size={14} />
                                        </div>
                                    )}
                                </div>
                                <span className="quiz-card-title">{type.title}</span>
                            </div>
                        )) : BUDGETS.map((b) => (
                            <div
                                key={b.id}
                                className={`quiz-budget-card ${selectedBudget === b.id ? 'selected' : ''}`}
                                onClick={() => setSelectedBudget(b.id)}
                            >
                                {selectedBudget === b.id && <Check size={14} className="budget-check" />}
                                {b.label}
                            </div>
                        ))}
                    </div>

                    <div className="quiz-footer">
                        <div className="quiz-progress-wrapper">
                            <span className="quiz-progress-text">Step {step} of 2 — {progress}% done</span>
                            <div className="quiz-progress-bar">
                                <div className="quiz-progress-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                        <div className="quiz-nav">
                            {step === 2 && (
                                <button className="quiz-btn-prev" onClick={() => setStep(1)}>Back</button>
                            )}
                            {step === 1 ? (
                                <button
                                    className="quiz-btn-next"
                                    disabled={!selectedType}
                                    onClick={() => setStep(2)}
                                >
                                    Next <ArrowRight size={16} />
                                </button>
                            ) : (
                                <Link
                                    to={`/catalog?type=${selectedType}&budget=${selectedBudget}`}
                                    className={`quiz-btn-next ${!selectedBudget ? 'disabled' : ''}`}
                                    onClick={(e) => !selectedBudget && e.preventDefault()}
                                >
                                    View Matches <ArrowRight size={16} />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                <div className="quiz-right">
                    <div className="quiz-result-card">
                        <span className="result-card-sub">Your personalised shortlist:</span>
                        <h3 className="result-card-title">
                            {selectedType
                                ? `Top ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} listings curated for you`
                                : 'Select your preferences to unlock matched properties'}
                        </h3>

                        <div className="result-card-images">
                            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80" alt="Property 1" className="img-1" />
                            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80" alt="Property 2" className="img-2" />
                            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80" alt="Property 3" className="img-3" />
                        </div>

                        <Link to="/catalog" className="result-card-btn">
                            <span className="btn-icon-small"><ArrowRight size={14} /></span>
                            Browse all properties
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuizSection;
