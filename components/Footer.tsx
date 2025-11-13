import React from 'react';
import { TwitterIcon } from './icons';

interface FooterProps {
    setCurrentPage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
    
    const handleContactClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentPage('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    return (
        <footer className="bg-brand-dark-light border-t border-brand-gray/50">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Connect With Us</h3>
                        <p className="text-gray-400">Follow us on social media for updates and inspiration.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <TwitterIcon className="w-7 h-7" />
                        </a>
                         <a href="#" onClick={handleContactClick} className="bg-brand-gray hover:bg-brand-purple text-white font-semibold py-2 px-4 rounded-md transition-colors">
                            Contact Us
                        </a>
                    </div>
                </div>
                <div className="mt-8 border-t border-brand-gray/50 pt-6 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Imagify. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};