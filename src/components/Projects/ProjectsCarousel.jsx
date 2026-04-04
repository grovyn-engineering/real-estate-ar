import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, ArrowUpRight, Star } from 'lucide-react';

export const PROJECTS_DATA = [
    {
        id: 1,
        title: 'Lavasa Villa',
        location: 'Lavasa, Pune',
        type: 'Villa',
        review: 'Grovyn Properties found us an extraordinary home with panoramic valley views. The process was smooth, professional and utterly stress-free.',
        img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80',
        client: 'Sharma Family',
        price: '₹3.8 Cr'
    },
    {
        id: 2,
        title: 'BKC Penthouse',
        location: 'Bandra Kurla Complex, Mumbai',
        type: 'Penthouse',
        review: 'We sold our penthouse 22% above the asking price. Their marketing strategy and buyer network is second to none.',
        img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80',
        client: 'Mehta & Associates',
        price: '₹5.1 Cr'
    },
    {
        id: 3,
        title: 'Goa Beach Villa',
        location: 'Baga, Goa',
        type: 'Waterfront Villa',
        review: 'From the first search to getting the keys, everything was handled with the highest level of professionalism. Our new home is beyond what we imagined.',
        img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=900&q=80',
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=900&q=80',
        client: 'The Kapoor Family',
        price: '₹4.4 Cr'
    },
    {
        id: 4,
        title: 'Lonavala Estate',
        location: 'Lonavala, Maharashtra',
        type: 'Mountain Estate',
        review: 'We acquired this remarkable estate through their off-market network. A genuinely exclusive opportunity we would never have found on our own.',
        img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80',
        client: 'Singh Capital',
        price: '₹6.2 Cr'
    },
    {
        id: 5,
        title: 'Indiranagar Residency',
        location: 'Indiranagar, Bangalore',
        type: 'Apartment',
        review: 'The best real estate experience I have had in 20 years of property investment. Knowledgeable, responsive and delivered exactly what was promised.',
        img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80',
        client: 'Rajesh Kumar',
        price: '₹1.2 Cr'
    }
];

const ProjectsCarousel = () => {
    const [active, setActive] = useState(0);
    const total = PROJECTS_DATA.length;

    const prev = () => setActive(i => (i - 1 + total) % total);
    const next = () => setActive(i => (i + 1) % total);

    const project = PROJECTS_DATA[active];

    return (
        <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--bg-main)', borderTop: '1px solid var(--border-color)' }}>
            <div className="container mx-auto px-6 md:px-10">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent-gold)' }}>
                            Success Stories
                        </span>
                        <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--text-main)' }}>
                            Our recent property transactions
                        </h2>
                    </div>
                    {/* Counter */}
                    <span className="text-sm font-semibold tabular-nums" style={{ color: 'var(--text-dim)' }}>
                        <span style={{ color: 'var(--text-main)' }}>{String(active + 1).padStart(2, '0')}</span>
                        {' / '}
                        {String(total).padStart(2, '0')}
                    </span>
                </div>

                {/* Card */}
                <div
                    key={active}
                    className="w-full rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-[58%_42%] animate-card-fade"
                    style={{
                        border: '1px solid var(--border-color)',
                        boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
                        minHeight: '420px',
                    }}
                >
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ minHeight: '320px' }}>
                        <img
                            src={project.img}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute top-5 left-5 z-10">
                            <span
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.7rem] font-bold uppercase tracking-wide text-white"
                                style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)' }}
                            >
                                <MapPin size={11} />
                                {project.type}
                            </span>
                        </div>
                        <div
                            className="absolute bottom-5 left-5 z-10 px-4 py-2 rounded-full text-sm font-bold text-white"
                            style={{ background: 'rgba(184,144,42,0.92)', backdropFilter: 'blur(10px)' }}
                        >
                            {project.price}
                        </div>
                    </div>

                    {/* Info */}
                    <div
                        className="flex flex-col justify-between p-8 md:p-10"
                        style={{ background: 'var(--bg-card)' }}
                    >
                        <div>
                            <div className="flex gap-1 mb-4">
                                {[1,2,3,4,5].map(i => (
                                    <Star key={i} size={13} fill="#b8902a" color="#b8902a" />
                                ))}
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-1" style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--text-main)' }}>
                                {project.title}
                            </h3>
                            <p className="text-sm mb-1" style={{ color: 'var(--text-dim)' }}>{project.location}</p>
                            <p className="text-xs mb-6" style={{ color: 'var(--text-dim)' }}>
                                Client: <strong style={{ color: 'var(--accent-gold)' }}>{project.client}</strong>
                            </p>
                            <p className="text-sm leading-relaxed italic" style={{ color: 'var(--text-muted)' }}>
                                "{project.review}"
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-8 gap-4">
                            <Link
                                to="/catalog"
                                className="flex items-center gap-3 px-5 py-2.5 rounded-full text-xs font-semibold text-white transition-all duration-300"
                                style={{ background: '#1a1a1a' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-gold)'}
                                onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}
                            >
                                View Similar Properties
                                <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
                                    <ArrowUpRight size={12} color="#fff" />
                                </span>
                            </Link>

                            {/* Nav arrows */}
                            <div className="flex gap-2">
                                <button
                                    onClick={prev}
                                    aria-label="Previous"
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#1a1a1a] hover:text-white"
                                    style={{ border: '1.5px solid var(--border-color)', background: 'transparent', color: 'var(--text-muted)' }}
                                >
                                    <ArrowLeft size={15} />
                                </button>
                                <button
                                    onClick={next}
                                    aria-label="Next"
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[#1a1a1a] hover:text-white"
                                    style={{ border: '1.5px solid var(--border-color)', background: 'transparent', color: 'var(--text-muted)' }}
                                >
                                    <ArrowRight size={15} />
                                </button>
                            </div>
                        </div>

                        {/* Dot indicators */}
                        <div className="flex gap-2 mt-5">
                            {PROJECTS_DATA.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                                    style={{
                                        width: i === active ? '28px' : '8px',
                                        background: i === active ? 'var(--accent-gold)' : 'var(--border-color)',
                                    }}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ProjectsCarousel;
