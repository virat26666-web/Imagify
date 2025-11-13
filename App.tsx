import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PrimaryNav } from './components/PrimaryNav';
import { ImageGenerator } from './components/ImageGenerator';
import { InspirationGallery } from './components/InspirationGallery';
import { FaqSection } from './components/FaqSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { generateImage } from './services/geminiService';
import { GeneratedImage } from './components/GeneratedImage';
import { LoginModal } from './components/LoginModal';
import { ImageHistory } from './components/ImageHistory';
import { AccountPage } from './components/AccountPage';
import { ContactPage } from './components/ContactPage';
import { PaymentsPage } from './components/PaymentsPage';
import { CreditsPage } from './components/CreditsPage';
import { EditInspirationModal } from './components/EditInspirationModal';
import { EditComparisonModal } from './components/EditComparisonModal';
import { HistoryItem, PaymentHistoryItem, Inspiration, ComparisonBanner } from './types';
import { INSPIRATION_DATA, COMPARISON_BANNER_DATA } from './constants';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('generator');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('https://i.pravatar.cc/150?u=a042581f4e29026702d');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [positivePrompt, setPositivePrompt] = useState('');
    const [negativePrompt, setNegativePrompt] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('Normal');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>([]);
    const [credits, setCredits] = useState(50); // 50 trial credits for guests

    // Gallery and Modal States
    const [inspirationData, setInspirationData] = useState<Inspiration[]>(INSPIRATION_DATA);
    const [comparisonBannerData, setComparisonBannerData] = useState<ComparisonBanner>(COMPARISON_BANNER_DATA);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingInspiration, setEditingInspiration] = useState<{ id: number; newImageUrl: string; currentPrompt: string } | null>(null);
    const [isEditComparisonModalOpen, setIsEditComparisonModalOpen] = useState(false);
    const [editingComparisonItem, setEditingComparisonItem] = useState<{ banner: ComparisonBanner; style: 'Normal' | 'Anime' | 'Fantasy' } | null>(null);

    // Load gallery data from localStorage on initial render
    useEffect(() => {
        try {
            const savedInspiration = localStorage.getItem('inspirationData');
            if (savedInspiration) {
                setInspirationData(JSON.parse(savedInspiration));
            }
            const savedComparison = localStorage.getItem('comparisonBannerData');
            if (savedComparison) {
                setComparisonBannerData(JSON.parse(savedComparison));
            }
        } catch (error) {
            console.error("Failed to parse gallery data from localStorage", error);
            // If parsing fails, the app will fall back to the default state from constants
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            const savedAvatar = localStorage.getItem('userAvatar');
            if (savedAvatar) {
                setAvatarUrl(savedAvatar);
            }
            if (isAdmin) {
                setCredits(999);
            } else {
                setCredits(100); // 100 bonus credits on sign-up/login
            }
        } else {
            // Reset to default when logged out and clear storage
            setAvatarUrl('https://i.pravatar.cc/150?u=a042581f4e29026702d');
            localStorage.removeItem('userAvatar');
            setPaymentHistory([]); // Clear payment history on logout
            setCredits(50); // Reset to trial credits
            setIsAdmin(false); // Reset admin status
            // Do not reset gallery data on logout to make admin changes persistent
        }
    }, [isLoggedIn, isAdmin]);

    const stylePromptMap: { [key: string]: string } = {
        'Normal': 'photorealistic, 4k, ultra-detailed',
        'Anime': 'vibrant anime style, detailed digital illustration',
        'Fantasy': 'epic fantasy art, magical, mythical, cinematic lighting',
        'Pixel Art': '8-bit pixel art, retro gaming style',
    };

    const handleGenerate = async () => {
        if (credits < 10) {
            if (!isLoggedIn) {
                setError("Out of Free Credits! Sign up now to get 100 bonus credits and continue generating!");
                setIsLoginModalOpen(true);
            } else {
                setError("You have insufficient credits to generate an image. Please purchase more.");
                setCurrentPage('credits');
            }
            return;
        }

        if (!positivePrompt.trim()) {
            setError('Please enter a prompt to generate an image.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        const styleAddition = stylePromptMap[selectedStyle] || '';
        const fullPrompt = `${positivePrompt}, ${styleAddition}${negativePrompt ? `. Avoid or remove the following: ${negativePrompt}` : ''}`;
        
        try {
            const imageBase64 = await generateImage(fullPrompt);
            const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
            setGeneratedImage(imageUrl);
            setCredits(prev => prev - 10); // Deduct credits
            
            if (isLoggedIn) {
                const newHistoryItem: HistoryItem = {
                    id: crypto.randomUUID(),
                    imageUrl: imageUrl,
                    positivePrompt: positivePrompt,
                    negativePrompt: negativePrompt,
                    style: selectedStyle,
                    timestamp: new Date().toISOString(),
                };
                setHistory(prev => [newHistoryItem, ...prev]);
            }
        } catch (e) {
            console.error(e);
            let message = 'An error occurred while generating the image. Please try again.';
            if (e instanceof Error && e.message.toLowerCase().includes('key')) {
                message = 'There seems to be an issue with the API key. Please ensure it is configured correctly.';
            }
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInspirationClick = (prompt: string, style: string) => {
        if (isAdmin) return;
        setPositivePrompt(prompt);
        setSelectedStyle(style);
        setCurrentPage('generator');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleOpenEditModal = (id: number, newImageUrl: string, currentPrompt: string) => {
        if (!isAdmin) return;
        setEditingInspiration({ id, newImageUrl, currentPrompt });
        setIsEditModalOpen(true);
    };

    const handleSaveInspiration = (id: number, newImageUrl: string, newPrompt: string) => {
        setInspirationData(prevData => {
            const updatedData = prevData.map(item =>
                item.id === id ? { ...item, imageUrl: newImageUrl, highResImageUrl: newImageUrl, prompt: newPrompt } : item
            );
            // Persist changes to localStorage
            localStorage.setItem('inspirationData', JSON.stringify(updatedData));
            return updatedData;
        });
        setIsEditModalOpen(false);
        setEditingInspiration(null);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingInspiration(null);
    };
    
    const handleOpenEditComparisonModal = (banner: ComparisonBanner, style: 'Normal' | 'Anime' | 'Fantasy') => {
        if (!isAdmin) return;
        setEditingComparisonItem({ banner, style });
        setIsEditComparisonModalOpen(true);
    };

    const handleSaveComparison = (newPrompt: string, newImageUrl?: string) => {
        if (!editingComparisonItem) return;
        const { style } = editingComparisonItem;
        setComparisonBannerData(prevData => {
            const newImages = prevData.images.map(img => 
                (img.style === style && newImageUrl) 
                ? { ...img, imageUrl: newImageUrl, highResImageUrl: newImageUrl } 
                : img
            );
            const updatedData = { ...prevData, prompt: newPrompt, images: newImages };
            // Persist changes to localStorage
            localStorage.setItem('comparisonBannerData', JSON.stringify(updatedData));
            return updatedData;
        });
        handleCloseEditComparisonModal();
    };

    const handleCloseEditComparisonModal = () => {
        setIsEditComparisonModalOpen(false);
        setEditingComparisonItem(null);
    };

    const handleLoginAttempt = async (email: string, password: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        if (email === 'virat80901213@gmail.com' && password === 'Chemistry71$') {
            setIsLoggedIn(true);
            setIsAdmin(true);
            setIsLoginModalOpen(false);
        } else {
            throw new Error('Invalid email or password.');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setCurrentPage('generator');
    };

    const handleAvatarChange = (newUrl: string | null) => {
        const urlToSave = newUrl || 'https://i.pravatar.cc/150?u=a042581f4e29026702d';
        setAvatarUrl(urlToSave);
        if (newUrl) {
            localStorage.setItem('userAvatar', newUrl);
        } else {
            localStorage.removeItem('userAvatar');
        }
    };
    
    const handleRegenerate = (item: HistoryItem) => {
        setPositivePrompt(item.positivePrompt);
        setNegativePrompt(item.negativePrompt);
        setSelectedStyle(item.style);
        setCurrentPage('generator');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteHistoryItem = (id: string) => {
        if (window.confirm('Are you sure you want to delete this image from your history?')) {
            setHistory(prev => prev.filter(item => item.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-brand-dark font-sans">
            <Header 
                isLoggedIn={isLoggedIn} 
                onLoginClick={() => setIsLoginModalOpen(true)} 
                onLogout={handleLogout} 
                avatarUrl={avatarUrl}
                setCurrentPage={setCurrentPage}
                credits={credits}
            />
            <PrimaryNav 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isLoggedIn={isLoggedIn}
                onLoginClick={() => setIsLoginModalOpen(true)}
            />
            <main className="container mx-auto px-4 py-8 md:py-12">
                {currentPage === 'generator' && (
                    <>
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
                                Create Your Vision with AI
                            </h1>
                            <p className="text-center text-lg text-gray-400 mb-8">
                                Turn your words into captivating images with the power of generative AI.
                            </p>
                            <ImageGenerator
                                positivePrompt={positivePrompt}
                                setPositivePrompt={setPositivePrompt}
                                negativePrompt={negativePrompt}
                                setNegativePrompt={setNegativePrompt}
                                selectedStyle={selectedStyle}
                                setSelectedStyle={setSelectedStyle}
                                onGenerate={handleGenerate}
                                isLoading={isLoading}
                            />
                            <GeneratedImage
                                isLoading={isLoading}
                                error={error}
                                imageUrl={generatedImage}
                            />
                        </div>
                        <InspirationGallery 
                            onImageClick={handleInspirationClick} 
                            isAdmin={isAdmin}
                            comparisonData={comparisonBannerData}
                            inspirationData={inspirationData}
                            onOpenEditModal={handleOpenEditModal}
                            onOpenEditComparisonModal={handleOpenEditComparisonModal}
                        />
                        <FaqSection />
                        <ReviewsSection />
                    </>
                )}
                {currentPage === 'history' && (
                    <ImageHistory 
                        history={history}
                        onRegenerate={handleRegenerate}
                        onDelete={handleDeleteHistoryItem}
                        onNavigateToGenerator={() => setCurrentPage('generator')}
                    />
                )}
                {currentPage === 'credits' && (
                    <CreditsPage 
                        credits={credits}
                        onNavigateToGenerator={() => setCurrentPage('generator')}
                    />
                )}
                 {currentPage === 'payments' && (
                    <PaymentsPage
                        history={paymentHistory}
                        onNavigateToCredits={() => setCurrentPage('credits')}
                    />
                )}
                {currentPage === 'account' && (
                    <AccountPage
                        avatarUrl={avatarUrl}
                        onAvatarChange={handleAvatarChange}
                        onNavigateToGenerator={() => setCurrentPage('generator')}
                    />
                )}
                {currentPage === 'contact' && (
                    <ContactPage 
                        onNavigateToGenerator={() => setCurrentPage('generator')}
                    />
                )}
            </main>
            <Footer setCurrentPage={setCurrentPage} />

            {isLoginModalOpen && (
                <LoginModal 
                    onClose={() => setIsLoginModalOpen(false)}
                    onLoginAttempt={handleLoginAttempt}
                />
            )}
            
            {isEditModalOpen && editingInspiration && (
                <EditInspirationModal
                    item={editingInspiration}
                    onClose={handleCloseEditModal}
                    onSave={handleSaveInspiration}
                />
            )}

            {isEditComparisonModalOpen && editingComparisonItem && (
                <EditComparisonModal
                    item={editingComparisonItem}
                    onClose={handleCloseEditComparisonModal}
                    onSave={handleSaveComparison}
                />
            )}
        </div>
    );
};

export default App;