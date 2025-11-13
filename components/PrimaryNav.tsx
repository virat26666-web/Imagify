import React from 'react';

interface PrimaryNavProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
    isLoggedIn: boolean;
    onLoginClick: () => void;
}

export const PrimaryNav: React.FC<PrimaryNavProps> = ({ currentPage, setCurrentPage, isLoggedIn, onLoginClick }) => {
    const navItems = [
        { id: 'generator', label: 'Text to Image' },
        { id: 'history', label: 'Image History' },
        { id: 'credits', label: 'Credits' },
        { id: 'payments', label: 'My Payments' },
        { id: 'contact', label: 'Contact Us' }
    ];
    
    return (
        <nav className="bg-brand-dark-light/50 border-b border-brand-gray/30 shadow-md">
            <div className="container mx-auto px-4">
                <ul className="flex flex-wrap justify-center sm:justify-start items-center gap-x-6 gap-y-2 py-2">
                    {navItems.map((item) => {
                        const isActive = currentPage === item.id;
                        const requiresLogin = ['history', 'payments'].includes(item.id);

                        const handleClick = (e: React.MouseEvent) => {
                            e.preventDefault();
                            if (requiresLogin && !isLoggedIn) {
                                onLoginClick();
                                return;
                            }

                            if (['generator', 'history', 'contact', 'payments', 'credits'].includes(item.id)) {
                                setCurrentPage(item.id);
                            } else {
                                alert('This page is not yet implemented.');
                            }
                        };
                        
                        return (
                            <li key={item.id}>
                                <a 
                                    href="#" 
                                    onClick={handleClick}
                                    className={`text-sm font-medium transition-colors ${isActive ? 'text-brand-purple-light' : 'text-gray-300 hover:text-white'}`}
                                >
                                    {item.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};
