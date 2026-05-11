import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle, ShieldCheck } from 'lucide-react';
import PageWrapper from '../components/Layout/PageWrapper';
import './ContactPage.css';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const stagger = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const ContactPage = () => {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        project: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <PageWrapper
            title="Get in Touch"
            subtitle="Where vision meets expertise—let’s craft your next property move with precision."
            bgImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
            label="Speak to an Advisor"
        >
            <div className="contact-refined-split">

                {/* LEFT SIDE */}
                <motion.div
                    className="contact-text-content"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div className="trust-badge-row" variants={fadeUp}>
                        <ShieldCheck size={20} className="gold-text" />
                        <span>RERA-Compliant & Transparent Deals</span>
                    </motion.div>

                    <motion.h2 variants={fadeUp}>
                        Work with India's trusted real estate advisors
                    </motion.h2>

                    <motion.p className="contact-lead" variants={fadeUp}>
                        Premium property requires expert guidance and market insight.
                        We respond to all inquiries within 24 business hours.
                    </motion.p>

                    <motion.div className="contact-features-mini" variants={stagger}>
                        <motion.div className="mini-feat" variants={fadeUp}>
                            <span className="feat-number">01</span>
                            <div className="feat-text">
                                <strong>Direct Consultation</strong>
                                <p>Speak directly with our senior advisors, not a sales agent.</p>
                            </div>
                        </motion.div>

                        <motion.div className="mini-feat" variants={fadeUp}>
                            <span className="feat-number">02</span>
                            <div className="feat-text">
                                <strong>Site Visit</strong>
                                <p>We can arrange property visits and accompany you for viewings.</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div className="contact-info-pills" variants={stagger}>
                        <motion.div className="info-pill" variants={fadeUp}>
                            <Phone size={18} />
                            <span>+91 98765 43210</span>
                        </motion.div>

                        <motion.div className="info-pill" variants={fadeUp}>
                            <Mail size={18} />
                            <span>hello@grovynproperties.com</span>
                        </motion.div>

                        <motion.div className="info-pill" variants={fadeUp}>
                            <MapPin size={18} />
                            <span>Bandra Kurla Complex, Mumbai 400051</span>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* RIGHT SIDE FORM */}
                <motion.div
                    className="contact-form-container glass-card"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    {!submitted ? (
                        <>
                            <motion.div
                                className="form-header"
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                            >
                                <h3>Send a Request</h3>
                                <p>Share your project details with our team.</p>
                            </motion.div>

                            <form className="refined-form" onSubmit={handleSubmit}>
                                <div className="input-row">
                                    <motion.div className="input-group" variants={fadeUp}>
                                        <label>Full Name</label>
                                        <input type="text" name="name" required onChange={handleChange} />
                                    </motion.div>

                                    <motion.div className="input-group" variants={fadeUp}>
                                        <label>Phone</label>
                                        <input type="tel" name="phone" required onChange={handleChange} />
                                    </motion.div>
                                </div>

                                <motion.div className="input-group" variants={fadeUp}>
                                    <label>Email Address</label>
                                    <input type="email" name="email" required onChange={handleChange} />
                                </motion.div>

                                {/* ✅ FIXED SELECT */}
                                <motion.div className="input-group" variants={fadeUp}>
                                    <label>Service Required</label>
                                    <select
                                        name="project"
                                        value={form.project}
                                        required
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Select service...</option>
                                        <option value="Buy Property">Buy Property</option>
                                        <option value="Sell Property">Sell Property</option>
                                        <option value="Rental Management">Rental Management</option>
                                        <option value="Investment Advisory">Investment Advisory</option>
                                    </select>
                                </motion.div>

                                <motion.div className="input-group" variants={fadeUp}>
                                    <label>Message</label>
                                    <textarea name="message" rows={4} onChange={handleChange} />
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    className="btn-primary w-full"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Submit Inquiry <Send size={16} />
                                </motion.button>
                            </form>
                        </>
                    ) : (
                        <motion.div
                            className="form-success-state"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="success-icon-box">
                                <CheckCircle size={48} />
                            </div>
                            <h3>Inquiry Received</h3>
                            <p>
                                Thank you, {form.name}! Our team will contact you within 24 hours.
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </PageWrapper>
    );
};

export default ContactPage;