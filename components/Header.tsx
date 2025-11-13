import React, { useState, useEffect, useRef } from 'react';
import { LogoIcon } from './icons';

interface HeaderProps {
    isLoggedIn: boolean;
    onLoginClick: () => void;
    onLogout: () => void;
    avatarUrl: string;
    setCurrentPage: (page: string) => void;
    credits: number;
}

export const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLoginClick, onLogout, avatarUrl, setCurrentPage, credits }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);


    const handleMyAccountClick = () => {
        setCurrentPage('account');
        setIsDropdownOpen(false);
    }
    
    const handleLogoutClick = () => {
        onLogout();
        setIsDropdownOpen(false);
    }

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentPage('generator');
    }

    return (
        <header className="bg-brand-dark-light border-b border-brand-gray/50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <a href="#" onClick={handleLogoClick} className="flex items-center gap-2 text-white hover:text-brand-purple-light transition-colors">
                    <LogoIcon className="w-8 h-8 text-brand-purple" />
                    <span className="text-2xl font-bold">Imagify</span>
                </a>
                <div className="flex items-center gap-4">
                     <div className="hidden sm:flex items-center gap-2 bg-brand-dark px-3 py-1.5 rounded-full border border-brand-gray/50">
                        <span className="text-yellow-400 font-bold">{credits}</span>
                        <span className="text-gray-400 text-sm">{isLoggedIn ? 'Credits' : 'Free Credits'}</span>
                    </div>
                    {isLoggedIn ? (
                        <div className="relative" ref={dropdownRef}>
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                                className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark-light focus:ring-brand-purple rounded-full"
                                aria-haspopup="true"
                                aria-expanded={isDropdownOpen}
                            >
                                <img src={avatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-brand-dark-light rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                                    <a href="#" onClick={(e) => { e.preventDefault(); handleMyAccountClick(); }} className="block px-4 py-2 text-sm text-gray-300 hover:bg-brand-gray hover:text-white" role="menuitem">
                                        My Account
                                    </a>
                                    <a href="#" onClick={(e) => { e.preventDefault(); handleLogoutClick(); }} className="block px-4 py-2 text-sm text-gray-300 hover:bg-brand-gray hover:text-white" role="menuitem">
                                        Log Out
                                    </a>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <button onClick={onLoginClick} className="text-white font-semibold hover:text-brand-purple-light transition-colors">
                                Log In
                            </button>
                            <button onClick={onLoginClick} className="bg-brand-purple hover:bg-brand-purple-light text-white font-semibold py-2 px-4 rounded-md transition-colors">
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};