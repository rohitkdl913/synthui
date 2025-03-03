import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

interface TooltipProps {
    children: React.ReactNode;
    text: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ children, text, position = 'top' }) => {
    const tooltipClasses = `absolute z-10 bg-gray-800 text-white text-xs rounded py-1 px-2 hidden group-hover:block whitespace-nowrap`;

    const positionClasses = {
        top: "left-1/2 -translate-x-1/2 bottom-full mb-2",
        bottom: "left-1/2 -translate-x-1/2 top-full mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2"
    }[position];

    return (
        <div className="relative inline-block group">
            {children}

            <div className={`${tooltipClasses} ${positionClasses}`}>
                <div className='flex items-center gap-2 p-4'>
                <FaInfoCircle /><span> {text}</span>
                </div>
            </div>
        </div>
    );
};

export default Tooltip;