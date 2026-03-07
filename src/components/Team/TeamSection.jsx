import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Phone } from 'lucide-react';
import './TeamSection.css';

const TEAM = [
    {
        name: 'James Wilson',
        role: 'Senior Property Advisor',
        spec: 'Manhattan & Brooklyn',
        img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'
    },
    {
        name: 'Elena Marchetti',
        role: 'Luxury Sales Director',
        spec: 'Beverly Hills & Malibu',
        img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'
    },
    {
        name: 'David Chen',
        role: 'Investment Specialist',
        spec: 'Miami Beach & Coral Gables',
        img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80'
    },
    {
        name: 'Sarah Okafor',
        role: 'Head of Client Relations',
        spec: 'International Markets',
        img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80'
    }
];

const TeamSection = () => {
    return (
        <section className="team-section">
            <div className="container">
                <div className="team-header">
                    <div>
                        <span className="section-label">Meet the Team</span>
                        <h2 className="team-title">Expert advisors<br />at your service</h2>
                    </div>
                    <Link to="/contact" className="btn-outline">
                        Work With Us <ArrowUpRight size={16} />
                    </Link>
                </div>

                <div className="team-grid">
                    {TEAM.map((member, index) => (
                        <div key={index} className="team-card">
                            <img src={member.img} alt={member.name} className="team-img" />
                            <div className="team-info">
                                <div className="team-text">
                                    <h4>{member.name}</h4>
                                    <p>{member.role}</p>
                                    <span className="team-spec">{member.spec}</span>
                                </div>
                                <Link to="/contact" className="team-btn" title="Contact">
                                    <Phone size={14} color="#fff" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
