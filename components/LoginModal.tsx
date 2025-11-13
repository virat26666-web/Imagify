import React, { useState } from 'react';

interface LoginModalProps {
    onClose: () => void;
    onLoginAttempt: (email: string, password: string) => Promise<void>;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginAttempt }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email.trim() || !password.trim()) {
            setError("Email and password are required.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setIsLoading(true);
        try {
            await onLoginAttempt(email, password);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity"
            aria-labelledby="login-modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-brand-dark-light rounded-2xl shadow-2xl w-full max-w-md m-4 p-8 border border-brand-gray/50 relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    aria-label="Close login modal"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <h2 id="login-modal-title" className="text-3xl font-bold text-center text-white mb-6">
                    Log In to Imagify
                </h2>
                
                <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-brand-dark border border-brand-gray rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition"
                                placeholder="you@example.com"
                                aria-required="true"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-brand-dark border border-brand-gray rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition"
                                placeholder="••••••••"
                                aria-required="true"
                            />
                        </div>
                    </div>
                    
                    {error && (
                        <p role="alert" className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</p>
                    )}

                    <div className="flex items-center justify-between mt-6 text-sm">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-purple focus:ring-brand-purple" />
                            <label htmlFor="remember-me" className="ml-2 block text-gray-400">Remember me</label>
                        </div>
                        <a href="#" className="font-medium text-brand-purple-light hover:text-brand-purple">Forgot password?</a>
                    </div>
                    
                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-brand-purple hover:bg-brand-purple-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? 'Logging In...' : 'Log In'}
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Not a member? <a href="#" className="font-medium text-brand-purple-light hover:text-brand-purple">Sign up now</a>
                </p>
            </div>
        </div>
    );
};