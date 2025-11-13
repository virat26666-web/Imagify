import React from 'react';
import { Inspiration, ComparisonBanner, ComparisonImage } from '../types';

interface InspirationGalleryProps {
    onImageClick: (prompt: string, style: string) => void;
    isAdmin: boolean;
    comparisonData: ComparisonBanner;
    inspirationData: Inspiration[];
    onOpenEditModal: (id: number, newImageUrl: string, currentPrompt: string) => void;
    onOpenEditComparisonModal: (banner: ComparisonBanner, style: 'Normal' | 'Anime' | 'Fantasy') => void;
}

const EditIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"></path>
    </svg>
);

export const InspirationGallery: React.FC<InspirationGalleryProps> = ({ onImageClick, isAdmin, comparisonData, inspirationData, onOpenEditModal, onOpenEditComparisonModal }) => {
    
    const handleRegularItemEdit = (item: Inspiration) => {
        if (!isAdmin) return;
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/jpeg,image/png';
        input.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        onOpenEditModal(item.id, reader.result, item.prompt);
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    return (
        <section className="py-12 md:py-16">
            <h2 className="text-3xl font-bold text-center text-white mb-8">Inspiration Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Triple Comparison Banner */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-brand-dark-light/50 p-4 rounded-lg border border-brand-gray/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {comparisonData.images.map((image) => (
                            <div 
                                key={image.style} 
                                className="group relative" 
                                onClick={() => !isAdmin && onImageClick(comparisonData.prompt, image.style)}
                            >
                                <h3 className="text-center font-bold text-lg text-white mb-2">{image.style}</h3>
                                <div className={`overflow-hidden rounded-lg shadow-lg ${!isAdmin ? 'cursor-pointer' : 'cursor-default'}`}>
                                    <img src={image.imageUrl} alt={`${comparisonData.prompt} - ${image.style} style`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                                    {!isAdmin && (
                                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <p className="text-white font-bold text-lg">Use this Style</p>
                                        </div>
                                    )}
                                    {isAdmin && (
                                        <div 
                                            className="absolute top-2 right-2 p-1.5 bg-black bg-opacity-60 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onOpenEditComparisonModal(comparisonData, image.style);
                                            }}
                                            title="Edit this image and the banner prompt"
                                        >
                                            <EditIcon />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-gray-400 mt-4 pt-4 border-t border-brand-gray/50">
                        <span className="font-semibold text-gray-300">Prompt:</span> "{comparisonData.prompt}"
                    </p>
                </div>

                {/* Remaining Gallery Items */}
                {inspirationData.map(item => (
                    <div 
                        key={item.id} 
                        className={`group relative overflow-hidden rounded-lg shadow-lg ${!isAdmin ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={() => !isAdmin && onImageClick(item.prompt, item.style)}
                        title={!isAdmin ? item.prompt : 'Click the icon to edit'}
                    >
                        <img src={item.imageUrl} alt={item.prompt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        
                        <div className={`absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 ${isAdmin ? 'hidden' : ''}`}>
                            <p className="text-white text-sm">{item.prompt}</p>
                        </div>

                        {isAdmin && (
                           <>
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div 
                                    className="absolute top-2 right-2 p-1.5 bg-black bg-opacity-60 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRegularItemEdit(item);
                                    }}
                                    title="Edit this image and prompt"
                                >
                                    <EditIcon />
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};