


import React, { useEffect, useState } from 'react';

interface ProcessingStatusProps {
  isFinished: boolean;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ isFinished }) => {
  const [progress, setProgress] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete || progress >= 100) return;

    let delay: number;
    if (!isFinished) {
      // Original progression speeds
      if (progress < 50) {
        delay = 5000;
      } else if (progress < 80) {
        delay = 20000;
      } else if (progress < 90) {
        delay = 30000;
      } else {
        delay = 60000;
      }
    } else {
      // Random fast progression when finished
      delay = Math.random() * 1000 + 500; // Random delay between 500-1500ms
    }

    const timeoutId = setTimeout(() => {
      setProgress(prev => {
        let next = prev;
        
        if (!isFinished) {
          next = prev + 5; // Regular 5% increments
        } else {
          // Random increment between 10-25% when finishing
          const randomIncrement = Math.floor(Math.random() * 15) + 10;
          next = Math.min(prev + randomIncrement, 100);
        }

        // Handle completion
        if (next >= 100) {
          setIsComplete(true);
          return 100;
        }
        
        return next;
      });
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [progress, isFinished, isComplete]);

  // Start 3-second completion timer when reaching 100%
  useEffect(() => {
    if (isComplete) {
      const timeoutId = setTimeout(() => {
        // This is where you would trigger any completion callbacks
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [isComplete]);

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-500">
          {isComplete ? 'Finalizing...' : 'Processing subtitles...'}
        </span>
        <span className="text-sm font-medium text-[#80419c]">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-[#80419c] h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};