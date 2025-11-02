import React, { useState, useEffect, useRef } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [appUrl, setAppUrl] = useState('');
  const [copyButtonText, setCopyButtonText] = useState('Copy');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const shareUrl = 'https://github.com/kiet-cmd/Skin-Disease-Classifier';
      setAppUrl(shareUrl);
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
        document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl).then(() => {
        setCopyButtonText('Copied!');
        setTimeout(() => setCopyButtonText('Copy'), 2000);
    });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && e.target === modalRef.current) {
        onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
        ref={modalRef}
        onClick={handleBackdropClick}
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fade-in-fast"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-center transform transition-all animate-slide-up-fast">
        <div className="flex justify-between items-center mb-4">
            <h2 id="share-modal-title" className="text-2xl font-bold text-slate-800">
                Share this App
            </h2>
            <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close share dialog"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        
        <p className="text-slate-600 mb-6">Scan the QR code or copy the link to share.</p>

        <div className="flex justify-center mb-6">
            {qrCodeUrl ? (
                <img src={qrCodeUrl} alt="App QR Code" className="w-48 h-48 rounded-lg shadow-md" />
            ) : (
                <div className="w-48 h-48 bg-slate-200 animate-pulse rounded-lg flex items-center justify-center">
                    <p className="text-slate-500 text-sm">Loading QR...</p>
                </div>
            )}
        </div>

        <div className="relative flex items-center">
          <input 
            type="text" 
            value={appUrl} 
            readOnly 
            className="w-full bg-slate-100 border border-slate-300 text-slate-700 text-sm rounded-lg p-3 pr-20 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            aria-label="Application URL"
          />
          <button
            onClick={handleCopy}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-sky-600 text-white font-semibold text-sm rounded-md shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all"
          >
            {copyButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};