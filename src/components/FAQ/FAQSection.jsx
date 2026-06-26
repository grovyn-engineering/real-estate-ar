import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import './FAQSection.css';

const FAQS = [
    {
        question: 'How do I start looking for a property with Grovyn Properties?',
        answer: 'Simply contact us via phone, email, or our website form. One of our senior advisors will arrange a confidential consultation to understand your requirements, lifestyle and budget before curating a bespoke property shortlist.'
    },
    {
        question: 'Can you help me find off-market properties?',
        answer: 'Yes. A significant portion of our listings are off-market, exclusively available through our network. Our relationships with private sellers and developers give clients access to properties not advertised publicly.'
    },
    {
        question: 'What are your fees for buying and selling?',
        answer: 'Our standard brokerage fee for sellers is competitive and transparent - we\'ll discuss this upfront during your free valuation. For buyers, our advisory service is complimentary for qualified clients.'
    },
    {
        question: 'Do you cover properties across India?',
        answer: 'Yes. We operate across 25+ cities in India with dedicated local market experts. We cover Mumbai, Bangalore, Delhi NCR, Pune, Goa, Hyderabad and more - with RERA-compliant support in each market.'
    },
    {
        question: 'How long does the buying process typically take?',
        answer: 'Timeline varies by location and property type. Ready-to-move properties typically complete in 4–8 weeks. Under-construction projects follow RERA milestones. We provide a clear roadmap from offer to registration.'
    },
    {
        question: 'Can you manage my investment property after purchase?',
        answer: 'Absolutely. Our Rental Management division handles everything: tenant sourcing, verification, rent collection, maintenance coordination and regular performance reporting - maximising your yield with zero hassle.'
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="faq-section">
            <div className="container">
                <div className="faq-header">
                    <span className="section-label">FAQ</span>
                    <h2 className="faq-title">Answers to your<br />most common questions</h2>
                </div>

                <div className="faq-list">
                    {FAQS.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item ${openIndex === index ? 'open' : ''}`}
                            onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                        >
                            <div className="faq-question">
                                <div className="faq-num">{(index + 1).toString().padStart(2, '0')}</div>
                                <h3>{faq.question}</h3>
                                <button className="faq-icon" aria-label={openIndex === index ? 'Collapse' : 'Expand'}>
                                    {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                                </button>
                            </div>

                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
