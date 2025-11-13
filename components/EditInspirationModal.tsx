import React, { useState } from 'react';

interface EditInspirationModalProps {
    item: { id: number; newImageUrl: string; currentPrompt: string };
    onClose: () => void;
    onSave: (id: number, newImageUrl: string, newPrompt: string) => void;
}

export const EditInspirationModal: React.FC<EditInspirationModalProps> = ({ item, onClose, onSave }) => {
    const [prompt, setPrompt] = useState(item.currentPrompt);

    const handleSave = () => {
        if (prompt.trim()) {
            onSave(item.id, item.newImageUrl, prompt);
        } else {
            alert("Prompt cannot be empty.");
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity"
            aria-labelledby="edit-inspiration-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-brand-dark-light rounded-2xl shadow-2xl w-full max-w-2xl m-4 border border-brand-gray/50 relative">
                <div className="p-8">
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        aria-label="Close edit modal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    
                    <h2 id="edit-inspiration-title" className="text-2xl font-bold text-white mb-6">
                        Update Inspiration Item
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Image Preview</label>
                            <div className="aspect-square bg-brand-dark rounded-lg overflow-hidden">
                                <img src={item.newImageUrl} alt="New image preview" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="inspiration-prompt" className="block text-sm font-medium text-gray-300 mb-2">
                                New Prompt
                            </label>
                            <textarea
                                id="inspiration-prompt"
                                rows={8}
                                className="w-full bg-brand-dark border border-brand-gray rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition flex-grow"
                                placeholder="A majestic lion with a golden mane..."
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