import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ShieldCheck } from 'lucide-react';
import PageWrapper from '../components/Layout/PageWrapper';
import './ContactPage.css';

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', phone: '', email: '', project: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <PageWrapper
            title="Get in Touch"
            subtitle="Let's discuss your vision. Our specialists are ready to provide a detailed consultation for your property."
            bgImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
        >
            <div className="contact-refined-split">
                {/* Left side — Trust & Info */}
                <div className="contact-text-content">
                    <div className="trust-badge-row">
                        <ShieldCheck size={20} className="gold-text" />
                        <span>Fixed Price & 7-Year Warranty Guarantee</span>
                    </div>

                    <h2>Work with the region's top lighting architects</h2>
                    <p className="contact-lead">
                        High-end lighting requires precision engineering and an artistic eye.
                        We respond to all inquiries within 24 business hours.
                    </p>

                    <div className="contact-features-mini">
                        <div className="mini-feat">
                            <span className="feat-number">01</span>
                            <div className="feat-text">
                                <strong>Direct Consultation</strong>
                                <p>Speak directly with our senior designers, not a sales agent.</p>
                            </div>
                        </div>
                        <div className="mini-feat">
                            <span className="feat-number">02</span>
                            <div className="feat-text">
                                <strong>On-Site Audit</strong>
                                <p>We can visit your property for a detailed technical analysis.</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-info-pills">
                        <div className="info-pill">
                            <Phone size={18} />
                            <span>+1 (234) 567-89-00</span>
                        </div>
                        <div className="info-pill">
                            <Mail size={18} />
                            <span>hello@premiumlighting.com</span>
                        </div>
                        <div className="info-pill">
                            <MapPin size={18} />
                            <span>123 Lighting Ave, Moscow, RU</span>
                        </div>
                    </div>
                </div>

                {/* Right side — Form Container */}
                <div className="contact-form-container glass-card">
                    {!submitted ? (
                        <>
                            <div className="form-header">
                                <h3>Send a Request</h3>
                                <p>Share your project details with our team.</p>
                            </div>

                            <form className="refined-form" onSubmit={handleSubmit}>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="James Wilson"
                                            required
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="+1..."
                                            required
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="james@example.com"
                                        required
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Service Area</label>
                                    <select name="project" required onChange={handleChange}>
                                        <option value="" disabled selected>Select service...</option>
                                        <option>Architectural Lighting</option>
                                        <option>Landscape Design</option>
                                        <option>Automated Watering</option>
                                        <option>Holiday Displays</option>
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label>Message</label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        placeholder="Briefly describe your property or project requirements..."
                                        onChange={handleChange}
                                    />
                                </div>

                                <button type="submit" className="btn-primary w-full">
                                    Submit Inquiry <Send size={16} />
                                </button>

                                <p className="form-disclaimer">
                                    By submitting this form, you agree to our privacy policy and terms of service.
                                </p>
                            </form>
                        </>
                    ) : (
                        <div className="form-success-state">
                            <div className="success-icon-box">
                                <CheckCircle size={48} />
                            </div>
                            <h3>Inquiry Received</h3>
                            <p>Thank you, {form.name}! Our team will review your project and contact you within 24 hours.</p>
                            <button className="btn-outline" onClick={() => setSubmitted(false)}>
                                Send Another
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </PageWrapper>
    );
};

export default ContactPage;
