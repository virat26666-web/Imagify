import React from 'react';

interface ContactPageProps {
    onNavigateToGenerator: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateToGenerator }) => {
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">Contact Us</h1>
            <div className="bg-brand-dark-light p-6 md:p-8 rounded-2xl shadow-2xl border border-brand-gray/50 text-center">
                <h2 className="text-2xl font-semibold text-white mb-4">Get in Touch</h2>
                <p className="text-lg text-gray-400 mb-6">
                    Have questions, feedback, or need support? We're here to help! The best way to reach us is by email.
                </p>
                <div className="bg-brand-dark p-4 rounded-lg inline-block border border-brand-gray/50">
                    <a 
                        href="mailto:virat80901213@gmail.com" 
                        className="text-xl font-mono text-brand-purple-light hover:text-brand-purple transition-colors"
                    >
                        virat80901213@gmail.com
                    </a>
                </div>
                <p className="text-md text-gray-500 mt-6">
                    We aim to respond to all inquiries within 24-48 hours.
                </p>
            </div>
            <div className="mt-8 text-center">
                <button onClick={onNavigateToGenerator} className="text-brand-purple-light hover:underline">
                    &larr; Back to Image Generator
                </button>
            </div>
        </div>
    );
};