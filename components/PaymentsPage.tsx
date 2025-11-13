import React, { useState } from 'react';
import { PaymentHistoryItem } from '../types';
import { PaymentDetailsModal } from './PaymentDetailsModal';

interface PaymentsPageProps {
    history: PaymentHistoryItem[];
    onNavigateToCredits: () => void;
}

const statusStyles: { [key: string]: string } = {
    'Successful': 'bg-green-500/20 text-green-400',
    'Pending': 'bg-yellow-500/20 text-yellow-400',
    'Rejected': 'bg-red-500/20 text-red-400',
};

export const PaymentsPage: React.FC<PaymentsPageProps> = ({ history, onNavigateToCredits }) => {
    const [selectedPayment, setSelectedPayment] = useState<PaymentHistoryItem | null>(null);

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
                My Payments
            </h1>

            {history.length === 0 ? (
                <div className="text-center bg-brand-dark-light p-10 rounded-2xl shadow-xl border border-brand-gray/50">
                    <svg className="mx-auto h-16 w-16 text-brand-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <h2 className="mt-6 text-2xl font-semibold text-white">No transaction history found.</h2>
                    <p className="mt-2 text-lg text-gray-400">
                        You haven't purchased any credits yet.
                    </p>
                    <div className="mt-6">
                        <button
                            onClick={onNavigateToCredits}
                            className="bg-gradient-to-r from-brand-purple to-brand-purple-light text-white font-bold py-3 px-6 rounded-lg text-lg hover:opacity-90 transition-opacity"
                        >
                            Buy Credits Now
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-brand-dark-light rounded-2xl shadow-2xl border border-brand-gray/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-300">
                            <thead className="text-xs text-gray-400 uppercase bg-brand-dark/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3">Amount</th>
                                    <th scope="col" className="px-6 py-3">Credits Added</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((item) => (
                                    <tr key={item.id} className="border-b border-brand-gray/50 hover:bg-brand-dark-light/50">
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(item.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">${item.amount.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-green-400 font-semibold">+{item.credits}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[item.status]}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button 
                                                onClick={() => setSelectedPayment(item)}
                                                className="font-medium text-brand-purple-light hover:underline"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            
            {selectedPayment && (
                <PaymentDetailsModal 
                    payment={selectedPayment}
                    onClose={() => setSelectedPayment(null)}
                />
            )}
        </div>
    );
};
