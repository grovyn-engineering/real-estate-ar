import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, ArrowUpRight, Star } from 'lucide-react';
import './ProjectsCarousel.css';

export const PROJECTS_DATA = [
    {
        id: 1,
        title: 'Lavasa Villa',
        location: 'Lavasa, Pune',
        type: 'Villa',
        review: 'Grovyn Properties found us an extraordinary home with panoramic valley views. The process was smooth, professional and utterly stress-free.',
        img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
        client: 'Sharma Family',
        price: '₹3.8 Cr'
    },
    {
        id: 2,
        title: 'BKC Penthouse',
        location: 'Bandra Kurla Complex, Mumbai',
        type: 'Penthouse',
        review: 'We sold our penthouse 22% above the asking price. Their marketing strategy and buyer network is second to none.',
        img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
        client: 'Mehta & Associates',
        price: '₹5.1 Cr'
    },
    {
        id: 3,
        title: 'Goa Beach Villa',
        location: 'Baga, Goa',
        type: 'Waterfront Villa',
        review: 'From the first search to getting the keys, everything was handled with the highest level of professionalism. Our new home is beyond what we imagined.',
        img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=80',
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=80',
        client: 'The Kapoor Family',
        price: '₹4.4 Cr'
    },
    {
        id: 4,
        title: 'Lonavala Estate',
        location: 'Lonavala, Maharashtra',
        type: 'Mountain Estate',
        review: 'We acquired this remarkable estate through their off-market network. A genuinely exclusive opportunity we would never have found on our own.',
        img: 'https://images.unsplash.com/photo-1500382017468-9049fee74a62?w=600&q=80',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fee74a62?w=600&q=80',
        client: 'Singh Capital',
        price: '₹6.2 Cr'
    },
    {
        id: 5,
        title: 'Indiranagar Residency',
        location: 'Indiranagar, Bangalore',
        type: 'Apartment',
        review: 'The best real estate experience I have had in 20 years of property investment. Knowledgeable, responsive and delivered exactly what was promised.',
        img: 'https://images.unsplash.com/photo-1600607687940-47a000df3bd9?w=600&q=80',
        image: 'https://images.unsplash.com/photo-1600607687940-47a000df3bd9?w=600&q=80',
        client: 'Rajesh Kumar',
        price: '₹1.2 Cr'
    }
];

const ProjectsCarousel = () => {
    const carouselRef = useRef(null);

    const scroll = (direction) => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: direction * 440, behavior: 'smooth' });
        }
    };

    return (
        <section className="projects-section">
            <div className="container">
                <div className="projects-header">
                    <div>
                        <span className="section-label">Success Stories</span>
                        <h2 className="projects-title">Our recent property transactions</h2>
                    </div>
                    <div className="projects-nav-wrap">
                        <span className="scroll-text">Scroll to<br />see more</span>
                        <div className="projects-nav">
                            <button className="nav-btn" onClick={() => scroll(-1)} aria-label="Previous">
                                <ArrowLeft size={18} />
                            </button>
                            <button className="nav-btn" onClick={() => scroll(1)} aria-label="Next">
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="projects-carousel" ref={carouselRef}>
                    {PROJECTS_DATA.map(project => (
                        <div key={project.id} className="project-card">
                            <div className="project-img-wrapper">
                                <img src={project.img} alt={project.location} className="project-img" />
                                <div className="project-tags">
                                    <span className="tag-pill"><MapPin size={12} /> {project.type}</span>
                                </div>
                                <div className="project-price-badge">{project.price}</div>
                            </div>

                            <div className="project-info-card">
                                <div className="project-stars">
                                    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#b8902a" color="#b8902a" />)}
                                </div>
                                <h3>{project.location}</h3>
                                <p className="project-client">Client: <strong>{project.client}</strong></p>
                                <p className="project-review">"{project.review}"</p>
                                <Link to="/catalog" className="project-details-btn">
                                    View Similar Properties
                                    <span className="btn-icon-small"><ArrowUpRight size={14} color="#fff" /></span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsCarousel;
