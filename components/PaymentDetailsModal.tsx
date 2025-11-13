import React from 'react';
import { PaymentHistoryItem } from '../types';

interface PaymentDetailsModalProps {
    payment: PaymentHistoryItem;
    onClose: () => void;
}

const statusStyles: { [key: string]: string } = {
    'Successful': 'bg-green-500/20 text-green-400',
    'Pending': 'bg-yellow-500/20 text-yellow-400',
    'Rejected': 'bg-red-500/20 text-red-400',
};

export const PaymentDetailsModal: React.FC<PaymentDetailsModalProps> = ({ payment, onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity"
            aria-labelledby="payment-details-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-brand-dark-light rounded-2xl shadow-2xl w-full max-w-lg m-4 p-8 border border-brand-gray/50 relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    aria-label="Close payment details modal"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <h2 id="payment-details-title" className="text-2xl font-bold text-white mb-6">
                    Transaction Details
                </h2>

                <div className="space-y-4 text-gray-300">
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-400">Transaction ID:</span>
                        <span className="font-mono text-sm">{payment.transactionId}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="font-semibold text-gray-400">Date:</span>
                        <span>{new Date(payment.date).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-400">Payment Method:</span>
                        <span>{payment.method}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-400">Amount:</span>
                        <span className="text-xl font-bold text-white">${payment.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-400">Credits Added:</span>
                        <span className="text-xl font-bold text-green-400">+{payment.credits}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-400">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[payment.status]}`}>
                            {payment.status}
                        </span>
                    </div>
                    {(payment.status === 'Rejected' || payment.status === 'Pending') && payment.rejectionReason && (
                        <div className="pt-2">
                            <span className="font-semibold text-gray-400">Details:</span>
                            <p className="mt-1 text-sm bg-brand-dark p-3 rounded-md border border-brand-gray/50">{payment.rejectionReason}</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-right">
                    <button 
                        onClick={onClose}
                        className="bg-brand-gray hover:bg-brand-gray/80 text-white font-semibold py-2 px-6 rounded-md transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};