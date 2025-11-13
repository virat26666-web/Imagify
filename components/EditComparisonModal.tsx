import React, { useState, useRef } from 'react';
import { ComparisonBanner } from '../types';

interface EditComparisonModalProps {
    item: { banner: ComparisonBanner; style: 'Normal' | 'Anime' | 'Fantasy' };
    onClose: () => void;
    onSave: (newPrompt: string, newImageUrl?: string) => void;
}

export const EditComparisonModal: React.FC<EditComparisonModalProps> = ({ item, onClose, onSave }) => {
    const [prompt, setPrompt] = useState(item.banner.prompt);
    const [newImageUrl, setNewImageUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const originalImage = item.banner.images.find(img => img.style === item.style);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select a valid image file (JPEG or PNG).");
        }
    };
    
    const handleSave = () => {
        if (prompt.trim()) {
            onSave(prompt, newImageUrl ?? undefined);
        } else {
            alert("Prompt cannot be empty.");
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity"
            aria-labelledby="edit-comparison-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-brand-dark-light rounded-2xl shadow-2xl w-full max-w-2xl m-4 border border-brand-gray/50 relative">
                <div className="p-8">
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                        aria-label="Close edit modal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    
                    <h2 id="edit-comparison-title" className="text-2xl font-bold text-white mb-6">
                        Edit Comparison Banner
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Image for "{item.style}" Style
                            </label>
                            <div className="aspect-square bg-brand-dark rounded-lg overflow-hidden mb-4">
                                <img src={newImageUrl || originalImage?.imageUrl} alt={`${item.style} style preview`} className="w-full h-full object-cover" />
                            </div>
                             <input 
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/jpeg,image/png"
                                className="hidden"
                                id="comparison-image-upload"
                            />
                            <label htmlFor="comparison-image-upload" className="w-full text-center block cursor-pointer bg-brand-gray hover:bg-brand-gray/80 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                                Upload New Image...
                            </label>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="comparison-prompt" className="block text-sm font-medium text-gray-300 mb-2">
                                Unified Prompt (for all 3 images)
                            </label>
                            <textarea
                                id="comparison-prompt"
                                rows={8}
                                className="w-full bg-brand-dark border border-brand-gray rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition flex-grow"
                                placeholder="A colorful parrot sitting on a branch..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-brand-dark/50 px-8 py-4 flex justify-end items-center gap-4 rounded-b-2xl">
                    <button 
                        onClick={onClose}
                        className="bg-brand-gray hover:bg-brand-gray/80 text-white font-semibold py-2 px-6 rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-brand-purple hover:bg-brand-purple-light text-white font-bold py-2 px-6 rounded-md transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};