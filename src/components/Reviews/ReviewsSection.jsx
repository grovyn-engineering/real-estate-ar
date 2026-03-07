import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowUpRight } from 'lucide-react';
import './ReviewsSection.css';

const REVIEWS = [
    {
        initial: 'S',
        name: 'Sarah & James Mitchell',
        time: '2 weeks ago',
        text: 'Found our dream penthouse in just 3 weeks. The team was incredibly attentive, understood our lifestyle perfectly and never wasted our time on unsuitable properties.'
    },
    {
        initial: 'R',
        name: 'Robert Chen',
        time: '1 month ago',
        text: 'Sold my Malibu villa 18% above asking price. Their marketing strategy and global buyer network is unparalleled. I wouldn\'t trust anyone else with high-value real estate.'
    },
    {
        initial: 'A',
        name: 'Amelia Davidson',
        time: '2 months ago',
        text: 'As a first-time luxury buyer, I was nervous. My advisor made the entire process seamless — from shortlisting to signing. Truly exceptional white-glove service.'
    }
];

const ReviewsSection = () => {
    return (
        <section className="reviews-section">
            <div className="container reviews-container">
                <div className="reviews-left">
                    <div className="reviews-card text-card">
                        <div className="card-header">
                            <div>
                                <h3 className="company-name">Premium Estates</h3>
                                <div className="rating-info">
                                    <span className="rating-score">4.9</span>
                                    <div className="stars">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="#b8902a" color="#b8902a" />)}
                                    </div>
                                    <span className="review-count">127 verified reviews</span>
                                </div>
                            </div>
                            <Link to="/contact" className="btn-small">Leave a Review</Link>
                        </div>

                        <div className="review-list">
                            {REVIEWS.map((review, i) => (
                                <div key={i} className="review-item">
                                    <div className="reviewer">
                                        <div className="rev-avatar">{review.initial}</div>
                                        <div className="rev-details">
                                            <h4>{review.name}</h4>
                                            <span>{review.time}</span>
                                        </div>
                                    </div>
                                    <div className="stars-small">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} fill="#b8902a" color="#b8902a" />)}
                                    </div>
                                    <p>{review.text}</p>
                                </div>
                            ))}
                        </div>

                        <Link to="/contact" className="reviews-all-btn">See all client testimonials</Link>
                    </div>
                </div>

                <div className="reviews-right">
                    <span className="section-label">Client Stories</span>
                    <h2 className="reviews-title">
                        Real results.<br />Real clients.<br />Real homes.
                    </h2>

                    <div className="reviews-media">
                        <img
                            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
                            alt="Client property"
                            className="reviews-main-img"
                        />
                        <div className="reviews-cta-block glass-card">
                            <strong>Ready to write your own success story?</strong>
                            <p>Join over 1,200 families who found their dream home through us.</p>
                            <Link to="/contact" className="btn-primary">
                                Book Consultation <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
