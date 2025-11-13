import React from 'react';

interface CreditsPageProps {
    credits: number;
    onNavigateToGenerator: () => void;
}

const creditPackages = [
    { credits: 100, price: 50, description: 'Perfect for getting started' },
    { credits: 250, price: 100, description: 'Most Popular', popular: true },
    { credits: 700, price: 300, description: 'Best Value' },
];

export const CreditsPage: React.FC<CreditsPageProps> = ({ credits, onNavigateToGenerator }) => {
    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
                Manage Your Credits
            </h1>
            <p className="text-center text-lg text-gray-400 mb-12">
                Fuel your creativity. More credits mean more images.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="bg-brand-dark-light p-6 rounded-2xl border border-brand-gray/50">
                    <h3 className="text-2xl font-bold text-white mb-4">Current Balance & Cost</h3>
                    <div className="flex items-baseline justify-center md:justify-start gap-4 mb-2">
                        <span className="text-5xl font-extrabold text-yellow-400">{credits}</span>
                        <span className="text-xl text-gray-300">Credits</span>
                    </div>
                    <p className="text-center md:text-left text-gray-400">Standard images cost <span className="font-bold text-white">10 Credits</span> per image.</p>
                </div>
                <div className="bg-brand-dark-light p-6 rounded-2xl border border-brand-gray/50">
                    <h3 className="text-2xl font-bold text-white mb-4">Getting Credits</h3>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-center gap-3">
                            <span className="bg-blue-500/20 text-blue-400 font-bold text-xs px-2 py-1 rounded-full">TRIAL</span>
                            <span><span className="font-bold text-white">50 Free Credits</span> for unregistered users.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="bg-green-500/20 text-green-400 font-bold text-xs px-2 py-1 rounded-full">SIGN-UP</span>
                            <span><span className="font-bold text-white">100 Bonus Credits</span> when you create an account.</span>
                        </li>
                    </ul>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-white mb-8">Buy More Credits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {creditPackages.map((pkg, index) => (
                    <div 
                        key={index} 
                        className={`bg-brand-dark-light p-8 rounded-2xl shadow-2xl border ${pkg.popular ? 'border-brand-purple ring-2 ring-brand-purple' : 'border-brand-gray/50'} flex flex-col text-center transition-transform hover:scale-105 relative`}
                    >
                        {pkg.popular && (
                            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                <span className="bg-brand-purple text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">{pkg.description}</span>
                            </div>
                        )}
                        <h2 className="text-4xl font-bold text-white mt-4 mb-2">{pkg.credits.toLocaleString()}</h2>
                        <p className="text-lg text-gray-400 mb-6">Credits</p>
                        
                        <div className="my-6">
                            <span className="text-5xl font-extrabold text-white">₹{pkg.price}</span>
                            <span className="text-gray-500 text-lg">&nbsp;INR</span>
                        </div>

                        <p className="text-gray-500 mb-8 h-8 flex-grow">{!pkg.popular ? pkg.description : ''}</p>

                        <button
                            onClick={() => alert('Purchase flow is not yet implemented.')}
                            className={`mt-auto w-full font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 ${pkg.popular ? 'bg-gradient-to-r from-brand-purple to-brand-purple-light text-white hover:opacity-90 shadow-lg shadow-brand-purple/20' : 'bg-brand-gray hover:bg-brand-gray/80 text-white'}`}
                        >
                            Buy Now
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center">
                <button onClick={onNavigateToGenerator} className="text-brand-purple-light hover:underline">
                    &larr; Back to Image Generator
                </button>
            </div>
        </div>
    );
};