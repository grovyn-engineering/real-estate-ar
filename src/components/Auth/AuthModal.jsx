import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, X } from 'lucide-react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}><X size={24} /></button>

                <div className="auth-header">
                    <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <p>{isLogin ? 'Log in to access exclusive property features.' : 'Join the elite community of real estate investors.'}</p>
                </div>

                <form className="auth-form" onSubmit={e => e.preventDefault()}>
                    {!isLogin && (
                        <div className="input-group">
                            <User size={18} />
                            <input type="text" placeholder="Full Name" />
                        </div>
                    )}

                    <div className="input-group">
                        <Mail size={18} />
                        <input type="email" placeholder="Email Address" />
                    </div>

                    <div className="input-group">
                        <Lock size={18} />
                        <input type="password" placeholder="Password" />
                    </div>

                    <button className="submit-auth-btn">
                        {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={18} />
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Register now' : 'Log in here'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
