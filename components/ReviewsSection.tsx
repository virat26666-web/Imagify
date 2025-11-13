import React from 'react';
import { REVIEWS_DATA } from '../constants';
import { StarIcon } from './icons';

export const ReviewsSection: React.FC = () => {
    return (
        <section className="py-12 md:py-16">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-10">What Our Users Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {REVIEWS_DATA.map((review, index) => (
                        <div key={index} className="bg-brand-dark-light p-6 rounded-lg shadow-lg border border-brand-gray/50 flex flex-col">
                            <div className="flex items-center mb-4">
                                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
                                <div>
                                    <h3 className="font-semibold text-white">{review.name}</h3>
                                    <div className="flex items-center">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                                        ))}
                                        {[...Array(5 - review.rating)].map((_, i) => (
                                            <StarIcon key={i} className="w-5 h-5 text-gray-600" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-400 flex-grow">"{review.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
