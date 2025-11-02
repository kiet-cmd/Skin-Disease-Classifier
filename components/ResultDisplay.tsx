
import React from 'react';
import type { AnalysisResponse } from '../types';

interface ResultDisplayProps {
  result: AnalysisResponse;
  userImage: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, userImage }) => {
  return (
    <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg animate-fade-in">
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-slate-700 mb-3 text-center">Your Uploaded Image</h2>
            <div className="w-full max-w-md aspect-square bg-slate-100 rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
                <img src={userImage} alt="User upload" className="w-full h-full object-contain" />
            </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200">
             <h3 className="text-2xl font-bold text-center text-sky-700 mb-2">{result.diseaseName}</h3>
             <p className="text-slate-600 text-center leading-relaxed max-w-2xl mx-auto">{result.description}</p>
        </div>
    </div>
  );
};
