import React from 'react';

interface ImageGeneratorProps {
    positivePrompt: string;
    setPositivePrompt: (value: string) => void;
    negativePrompt: string;
    setNegativePrompt: (value: string) => void;
    selectedStyle: string;
    setSelectedStyle: (value: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

const imageStyles = ["Normal", "Anime", "Fantasy", "Pixel Art"];

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({
    positivePrompt, setPositivePrompt,
    negativePrompt, setNegativePrompt,
    selectedStyle, setSelectedStyle,
    onGenerate, isLoading
}) => {
    return (
        <div className="bg-brand-dark-light p-6 md:p-8 rounded-2xl shadow-2xl border border-brand-gray/50 mb-12">
            <div className="space-y-6">
                <div>
                    <label htmlFor="positive-prompt" className="block text-lg font-medium text-gray-300 mb-2">
                        Describe what you want to see...
                    </label>
                    <textarea
                        id="positive-prompt"
                        rows={4}
                        className="w-full bg-brand-dark border border-brand-gray rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition"
                        placeholder="A majestic lion with a golden mane, standing on a misty mountain at sunrise, photorealistic."
                        value={positivePrompt}
                        onChange={(e) => setPositivePrompt(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="negative-prompt" className="block text-md font-medium text-gray-400 mb-2">
                        Exclude from image (optional)...
                    </label>
                    <input
                        type="text"
                        id="negative-prompt"
                        className="w-full bg-brand-dark border border-brand-gray rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition"
                        placeholder="blurry, distorted, ugly, watermark, text"
                        value={negativePrompt}
                        onChange={(e) => setNegativePrompt(e.target.value)}
                    />
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-300 mb-4">Select Image Style:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {imageStyles.map(style => (
                        <button
                            key={style}
                            onClick={() => setSelectedStyle(style)}
                            className={`py-3 px-4 rounded-lg font-semibold text-center transition-all duration-200 ${
                                selectedStyle === style
                                ? 'bg-brand-purple text-white ring-2 ring-brand-purple-light shadow-lg'
                                : 'bg-brand-gray/50 text-gray-300 hover:bg-brand-gray'
                            }`}
                        >
                            {style}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <button
                    onClick={onGenerate}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-brand-purple to-brand-purple-light text-white font-bold py-4 px-6 rounded-lg text-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : (
                        'Generate Image'
                    )}
                </button>
            </div>
        </div>
    );
};
