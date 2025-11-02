
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-8">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-sky-600"></div>
        <p className="text-slate-600 font-semibold">AI is thinking...</p>
    </div>
  );
};
