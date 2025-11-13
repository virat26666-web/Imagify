import React from 'react';
import { HistoryItem } from '../types';

interface ImageHistoryCardProps {
    item: HistoryItem;
    onRegenerate: (item: HistoryItem) => void;
    onDelete: (id: string) => void;
}

const DownloadIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
);
const RegenerateIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120 12M20 20l-1.5-1.5A9 9 0 004 12"></path></svg>
);
const DeleteIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
);

export const ImageHistoryCard: React.FC<ImageHistoryCardProps> = ({ item, onRegenerate, onDelete }) => {
    
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = item.imageUrl;
        link.download = `imagify-${item.id.substring(0, 8)}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formattedDate = new Date(item.timestamp).toLocaleString();

    return (
        <div className="bg-brand-dark-light rounded-lg shadow-lg overflow-hidden border border-brand-gray/50 flex flex-col">
            <div className="aspect-square bg-brand-dark">
                <img src={item.imageUrl} alt={item.positivePrompt} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <p className="text-sm text-gray-300 mb-2 line-clamp-2" title={item.positivePrompt}>
                        <strong className="text-gray-100">Prompt:</strong> {item.positivePrompt}
                    </p>
                    {item.negativePrompt && (
                        <p className="text-sm text-gray-400 mb-2 line-clamp-1" title={item.negativePrompt}>
                            <strong>Negative:</strong> {item.negativePrompt}
                        </p>
                    )}
                     <p className="text-xs text-gray-500 mb-4">
                        {formattedDate} &bull; <span className="font-semibold">{item.style}</span>
                    </p>
                </div>

                <div className="space-y-2 mt-auto pt-2">
                    <button onClick={handleDownload} className="w-full flex items-center justify-center text-sm bg-brand-gray/50 hover:bg-brand-gray text-white font-semibold py-2 px-3 rounded-md transition-colors">
                        <DownloadIcon />
                        Download
                    </button>
                    <button onClick={() => onRegenerate(item)} className="w-full flex items-center justify-center text-sm bg-brand-purple/80 hover:bg-brand-purple text-white font-semibold py-2 px-3 rounded-md transition-colors">
                        <RegenerateIcon />
                        Re-generate
                    </button>
                    <button onClick={() => onDelete(item.id)} className="w-full flex items-center justify-center text-sm bg-red-800/60 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-md transition-colors">
                        <DeleteIcon />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
