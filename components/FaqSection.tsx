import React, { useState } from 'react';
import { FAQ_DATA } from '../constants';
import { ChevronDownIcon } from './icons';

const FaqItem: React.FC<{ item: typeof FAQ_DATA[0] }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-brand-gray/50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-5 text-left"
            >
                <span className="text-lg font-medium text-white">{item.question}</span>
                <ChevronDownIcon className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-5 pr-10">
                    <p className="text-gray-400">{item.answer}</p>
                </div>
            )}
        </div>
    );
};

export const FaqSection: React.FC = () => {
    return (
        <section className="py-12 md:py-16 bg-brand-dark-light/50 rounded-2xl my-12">
            <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-8">Frequently Asked Questions</h2>
                <div className="space-y-2">
                    {FAQ_DATA.map((item, index) => (
                        <FaqItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};
