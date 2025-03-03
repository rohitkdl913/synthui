import React from 'react';
  
  interface ProcessingStatusProps {
    progress: number;
  }
  
  export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ progress }) => {
    return (
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-500">Processing subtitles...</span>
          <span className="text-sm font-medium text-[#80419c]">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#80419c] h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  };