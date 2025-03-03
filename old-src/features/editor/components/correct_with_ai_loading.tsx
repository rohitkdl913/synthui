import React from 'react';

const CorrectWithAiLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Correcting with AI...</p>
      </div>
    </div>
  );
};

export default CorrectWithAiLoading;
