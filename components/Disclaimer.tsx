import React from 'react';

export const Disclaimer: React.FC = () => {
    return (
        <div className="w-full max-w-4xl my-6 p-4 bg-amber-100 border-l-4 border-amber-500 text-amber-800 rounded-r-lg" role="alert">
            <p className="font-bold">Disclaimer: Not Medical Advice</p>
            <p className="text-sm mt-1">
                This AI-powered analysis is for informational purposes only and does <strong>not</strong> constitute a medical diagnosis or substitute for professional medical advice. Always consult a qualified healthcare provider regarding any medical condition.
            </p>
        </div>
    );
};
