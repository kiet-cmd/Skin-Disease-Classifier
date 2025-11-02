import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Loader } from './components/Loader';
import { Disclaimer } from './components/Disclaimer';
import { analyzeSkinCondition } from './services/geminiService';
import type { AnalysisResponse } from './types';
import { Logo } from './components/icons/Logo';
import { ThreeDotsIcon } from './components/icons/ThreeDotsIcon';
import { ShareModal } from './components/ShareModal';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  const resetState = () => {
    setAnalysisResult(null);
    setError(null);
  };

  const handleImageUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    resetState();

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result as string;
      setUploadedImage(base64Image);

      try {
        const analysis = await analyzeSkinCondition(base64Image);
        if (analysis && analysis.diseaseName) {
            setAnalysisResult(analysis);
        } else {
             throw new Error('Analysis failed to return a disease name.');
        }

      } catch (err) {
        console.error(err);
        setError('An error occurred during analysis. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      setError('Failed to read the image file.');
      setIsLoading(false);
    };
  }, []);
  
  const handleNewAnalysis = () => {
    setUploadedImage(null);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
  };


  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-4xl text-center mb-8">
        <div className="flex items-center justify-between mb-2">
            <div className="flex justify-start w-10">
                <button
                    onClick={() => setIsShareModalOpen(true)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    aria-label="Share this application"
                >
                    <ThreeDotsIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3">
                <Logo />
                <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight text-center">
                    Skin Condition Analyzer
                </h1>
            </div>
            <div className="w-10" aria-hidden="true" />
        </div>
        <p className="text-md text-slate-600">
            Upload an image to get an AI-powered analysis.
        </p>
      </header>
      
      <main className="w-full max-w-4xl flex-grow flex flex-col items-center">
        {!uploadedImage && (
            <div className="w-full flex flex-col items-center">
                <Disclaimer />
                <ImageUploader onImageUpload={handleImageUpload} isUploading={isLoading} />
            </div>
        )}

        {isLoading && (
            <div className="w-full flex flex-col items-center justify-center">
                {uploadedImage && (
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-center mb-2">Analyzing your image...</h2>
                        <img src={uploadedImage} alt="Uploaded skin condition" className="rounded-lg shadow-md max-w-xs sm:max-w-sm max-h-80 object-contain" />
                    </div>
                )}
                <Loader />
            </div>
        )}

        {error && (
          <div className="mt-6 text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
             <button
                onClick={handleNewAnalysis}
                className="mt-4 px-6 py-2 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-75 transition-colors"
            >
                Try Again
            </button>
          </div>
        )}

        {!isLoading && analysisResult && uploadedImage && (
            <div className="w-full">
              <ResultDisplay userImage={uploadedImage} result={analysisResult} />
              <Disclaimer />
              <div className="text-center">
                <button
                    onClick={handleNewAnalysis}
                    className="px-8 py-3 bg-slate-800 text-white font-bold rounded-full shadow-lg hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-400 transition-transform transform hover:scale-105"
                >
                    Analyze Another Image
                </button>
              </div>
            </div>
        )}
      </main>

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </div>
  );
};

export default App;