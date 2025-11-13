import { FaqItem, Review, Inspiration, ComparisonBanner } from './types';

export const FAQ_DATA: FaqItem[] = [
    {
        question: "How does the text-to-image generator work?",
        answer: "Our tool uses a state-of-the-art AI model (Imagen 4) to interpret your text descriptions (prompts) and convert them into unique, high-quality images. Simply type what you want to see, and the AI will generate it for you."
    },
    {
        question: "What are credits and how are they used?",
        answer: "Credits are used to generate images. Each image generation consumes a certain number of credits. You can view your balance and purchase more credits from the 'Credits' page."
    },
    {
        question: "Can I use the generated images commercially?",
        answer: "Yes, images you generate are yours to use for personal or commercial projects, subject to our terms of service. Please ensure your prompts do not violate copyright or content policies."
    },
    {
        question: "What is a negative prompt?",
        answer: "A negative prompt allows you to specify what you *don't* want to see in your image. For example, if you're generating a forest scene, you could add 'buildings, cars' to the negative prompt to exclude them."
    }
];

export const REVIEWS_DATA: Review[] = [
    { name: 'Alex Johnson', rating: 5, text: "Absolutely stunning results! The quality of the images is incredible. I've used it for both personal art and professional projects.", avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { name: 'Samantha Lee', rating: 5, text: "So easy to use and incredibly powerful. The different styles are a fantastic feature that helps me get exactly the look I'm going for.", avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
    { name: 'David Chen', rating: 4, text: "Great tool for concept art and brainstorming. Saves me hours of work. Sometimes it takes a couple of tries to get the perfect image, but it's worth it.", avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
];

export const COMPARISON_BANNER_DATA: ComparisonBanner = {
    id: 100,
    prompt: 'A colorful parrot sitting on a branch, 4K resolution.',
    images: [
        {
            style: 'Normal',
            imageUrl: 'https://i.ibb.co/6w20d5z/parrot-1.jpg',
            highResImageUrl: 'https://i.ibb.co/6w20d5z/parrot-1.jpg',
        },
        {
            style: 'Anime',
            imageUrl: 'https://i.ibb.co/P9M5G5t/anime-parrot.jpg',
            highResImageUrl: 'https://i.ibb.co/P9M5G5t/anime-parrot.jpg',
        },
        {
            style: 'Fantasy',
            imageUrl: 'https://i.ibb.co/8mPFx80/fantasy-parrot.jpg',
            highResImageUrl: 'https://i.ibb.co/8mPFx80/fantasy-parrot.jpg',
        }
    ]
};

export const INSPIRATION_DATA: Inspiration[] = [
    { 
        id: 4, 
        prompt: 'A beautifully rendered anime warrior girl with silver hair and glowing blue eyes, under a full moon in a field of cherry blossoms. Dynamic pose, intricate armor, vibrant digital illustration.', 
        style: 'Anime', 
        imageUrl: 'https://i.ibb.co/gRZdXGg/anime-warrior.jpg',
        highResImageUrl: 'https://i.ibb.co/gRZdXGg/anime-warrior.jpg'
    },
    { 
        id: 5, 
        prompt: 'A detailed 16-bit pixel art scene of a cozy fantasy tavern interior with a crackling fireplace and adventurers gathered around a table. Warm, atmospheric lighting, retro RPG style.', 
        style: 'Pixel Art', 
        imageUrl: 'https://i.ibb.co/yQyFzJj/pixel-tavern.jpg',
        highResImageUrl: 'https://i.ibb.co/yQyFzJj/pixel-tavern.jpg'
    },
    { 
        id: 6, 
        prompt: 'A majestic ancient dragon with scales like molten gold, coiled atop a mountain peak guarding a treasure hoard. Dramatic storm clouds, epic fantasy painting, extremely detailed, 4K.', 
        style: 'Fantasy', 
        imageUrl: 'https://i.ibb.co/Gcvmgyj/golden-dragon.jpg',
        highResImageUrl: 'https://i.ibb.co/Gcvmgyj/golden-dragon.jpg'
    },
];