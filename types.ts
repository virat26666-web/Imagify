export interface FaqItem {
    question: string;
    answer: string;
}

export interface Review {
    name: string;
    rating: number;
    text: string;
    avatar: string;
}

export interface Inspiration {
    id: number;
    prompt: string;
    style: 'Normal' | 'Anime' | 'Fantasy' | 'Pixel Art';
    imageUrl: string;
    highResImageUrl?: string; // For future 4K download/view functionality
}

export interface HistoryItem {
  id: string;
  imageUrl: string;
  positivePrompt: string;
  negativePrompt: string;
  style: string;
  timestamp: string; // ISO string
}

export interface PaymentHistoryItem {
    id: string;
    date: string; // ISO string
    amount: number; // in USD
    credits: number;
    status: 'Successful' | 'Pending' | 'Rejected';
    transactionId: string;
    method: string;
    rejectionReason?: string;
}

// New types for the Triple Comparison Banner
export interface ComparisonImage {
    style: 'Normal' | 'Anime' | 'Fantasy';
    imageUrl: string;
    highResImageUrl?: string;
}

export interface ComparisonBanner {
    id: number;
    prompt: string;
    images: ComparisonImage[];
}