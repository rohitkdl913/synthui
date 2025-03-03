import { X } from 'lucide-react';
import React, { useEffect } from 'react';

interface PopUpMessageProps {
  message: string;
  type: 'error' | 'success' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
}

const PopUpMessage: React.FC<PopUpMessageProps> = ({
  message,
  type,
  onClose,
  duration = 5000
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const typeStyles = {
    error: {
      background: 'bg-red-100',
      border: 'border-red-400',
      text: 'text-red-600',
      icon: '⚠️'
    },
    success: {
      background: 'bg-green-100',
      border: 'border-green-400',
      text: 'text-green-600',
      icon: '✅'
    },
    warning: {
      background: 'bg-yellow-100',
      border: 'border-yellow-400',
      text: 'text-yellow-600',
      icon: '⚠️'
    },
    info: {
      background: 'bg-blue-100',
      border: 'border-blue-400',
      text: 'text-blue-600',
      icon: 'ℹ️'
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-sm rounded-lg p-4 shadow-lg flex items-start space-x-3 transition-transform duration-300 ease-in-out transform opacity-90 ${typeStyles[type].background} ${typeStyles[type].border}`}
    >
      <div className="flex-shrink-0 text-2xl">{typeStyles[type].icon}</div>
      <div className="flex-1">
        <p className={`font-medium ${typeStyles[type].text}`}>{message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-lg font-medium text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Close"
      >
        <X />
      </button>
    </div>
  );
};

export default PopUpMessage;
