import React from 'react';
import { HistoryItem } from '../types';
import { ImageHistoryCard } from './ImageHistoryCard';

interface ImageHistoryProps {
    history: HistoryItem[];
    onRegenerate: (item: HistoryItem) => void;
    onDelete: (id: string) => void;
    onNavigateToGenerator: () => void;
}

export const ImageHistory: React.FC<ImageHistoryProps> = ({ history, onRegenerate, onDelete, onNavigateToGenerator }) => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
                My Image History
            </h1>

            {history.length === 0 ? (
                <div className="text-center bg-brand-dark-light p-10 rounded-2xl shadow-xl border border-brand-gray/50">
                    <svg className="mx-auto h-16 w-16 text-brand-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h2 className="mt-6 text-2xl font-semibold text-white">Your gallery is empty!</h2>
                    <p className="mt-2 text-lg text-gray-400">
                        It looks like you haven't generated any images yet! Start creating your vision.
                    </p>
                    <div className="mt-6">
                        <button
                            onClick={onNavigateToGenerator}
                            className="bg-gradient-to-r from-brand-purple to-brand-purple-light text-white font-bold py-3 px-6 rounded-lg text-lg hover:opacity-90 transition-opacity"
                        >
                            Generate Your First Image!
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {history.map(item => (
                        <ImageHistoryCard 
                            key={item.id} 
                            item={item}
                            onRegenerate={onRegenerate}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
