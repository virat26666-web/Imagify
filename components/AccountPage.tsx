import React, { useState, useRef } from 'react';

interface AccountPageProps {
    avatarUrl: string;
    onAvatarChange: (newUrl: string | null) => void;
    onNavigateToGenerator: () => void;
}

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];

export const AccountPage: React.FC<AccountPageProps> = ({ avatarUrl, onAvatarChange, onNavigateToGenerator }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setSuccess(null);
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        // Validation
        if (file.size > MAX_FILE_SIZE_BYTES) {
            setError(`File is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
            return;
        }
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setError('Invalid file type. Please select a JPG or PNG image.');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        if (previewUrl) {
            onAvatarChange(previewUrl);
            setPreviewUrl(null);
            setSuccess('Profile image updated successfully!');
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };
    
    const handleCancel = () => {
        setPreviewUrl(null);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleRemove = () => {
        if (window.confirm('Are you sure you want to remove your profile image?')) {
            onAvatarChange(null);
            setPreviewUrl(null);
            setSuccess('Profile image removed.');
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">My Account</h1>
            <div className="bg-brand-dark-light p-6 md:p-8 rounded-2xl shadow-2xl border border-brand-gray/50">
                <h2 className="text-2xl font-semibold text-white mb-6">Profile Image</h2>

                {error && <p role="alert" className="mb-4 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</p>}
                {success && <p role="status" className="mb-4 text-center text-green-400 bg-green-900/50 p-3 rounded-lg">{success}</p>}

                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-brand-dark flex-shrink-0 ring-4 ring-brand-gray">
                         <img 
                            src={previewUrl || avatarUrl} 
                            alt="Current profile avatar" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-grow text-center sm:text-left">
                        <p className="text-gray-400 mb-4">For best results, upload a square image (JPG or PNG, max 5MB).</p>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                             <input 
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept={ALLOWED_FILE_TYPES.join(',')}
                                className="hidden"
                                id="avatar-upload"
                                aria-label="Upload profile image"
                            />
                            {previewUrl ? (
                                <>
                                    <button onClick={handleSave} className="bg-brand-purple hover:bg-brand-purple-light text-white font-semibold py-2 px-4 rounded-md transition-colors">
                                        Save New Profile Image
                                    </button>
                                     <button onClick={handleCancel} className="bg-brand-gray hover:bg-brand-gray/70 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <label htmlFor="avatar-upload" className="cursor-pointer bg-brand-purple hover:bg-brand-purple-light text-white font-semibold py-2 px-4 rounded-md transition-colors">
                                        Change Image
                                    </label>
                                    <button onClick={handleRemove} className="bg-red-800/80 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                                        Remove Image
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
             <div className="mt-8 text-center">
                <button onClick={onNavigateToGenerator} className="text-brand-purple-light hover:underline">
                    &larr; Back to Image Generator
                </button>
            </div>
        </div>
    );
};
