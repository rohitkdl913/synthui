import React from 'react';
import SaveButton from './save_button';

import { FileText, Ligature, Monitor, PaintBucket } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

interface SettingsContextType {
    settings: {
        subtitleFont: string;
        subtitleSize: string;
        subtitleColor: string;
        subtitleBackground: string;
        subtitlePosition: string;
        exportFormat: string;
    };
    handleChange: (field: string, value: string | boolean | number) => void;
}


const SubtitleSettings: React.FC = () => {
    const handleSave = () => {
        alert('Settings saved successfully!');
    };
    const { settings, handleChange } = useOutletContext<SettingsContextType>();

    const fontOptions = [
        'Arial', 'Helvetica', 'Times New Roman',
        'Courier', 'Verdana', 'Georgia'
    ];

    const sizeOptions = [
        { label: 'Small', value: 'Small' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Large', value: 'Large' }
    ];

    const positionOptions = [
        { label: 'Bottom', value: 'Bottom' },
        { label: 'Top', value: 'Top' },
        { label: 'Center', value: 'Center' }
    ];

    const exportFormatOptions = [
        { label: 'SRT', value: 'SRT' },
        { label: 'VTT', value: 'VTT' },
        { label: 'ASS', value: 'ASS' }
    ];



    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 relative">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Subtitle Preferences</h2>


                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">

                        <Ligature className="mr-2 text-[#80419c]" /> Font
                    </label>
                    <select
                        value={settings.subtitleFont}
                        onChange={(e) => handleChange('subtitleFont', e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                    >
                        {fontOptions.map(font => (
                            <option key={font} value={font}>{font}</option>
                        ))}
                    </select>
                </div>

                {/* Font Size */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Font Size
                    </label>
                    <div className="flex space-x-2">
                        {sizeOptions.map(size => (
                            <button
                                key={size.value}
                                onClick={() => handleChange('subtitleSize', size.value)}
                                className={`px-4 py-2 rounded-md ${settings.subtitleSize === size.value
                                    ? 'bg-[#80419c] text-white'
                                    : 'bg-gray-100 text-gray-700'
                                    }`}
                            >
                                {size.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Color Settings */}
                <div className="mb-4 flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <PaintBucket className="mr-2 text-[#80419c]" /> Text Color
                        </label>
                        <input
                            type="color"
                            value={settings.subtitleColor}
                            onChange={(e) => handleChange('subtitleColor', e.target.value)}
                            className="w-full h-10 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Background Color
                        </label>
                        <input
                            type="color"
                            value={settings.subtitleBackground}
                            onChange={(e) => handleChange('subtitleBackground', e.target.value)}
                            className="w-full h-10 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                {/* Subtitle Position */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Monitor className="mr-2 text-[#80419c]" /> Subtitle Position
                    </label>
                    <div className="flex space-x-2">
                        {positionOptions.map(position => (
                            <button
                                key={position.value}
                                onClick={() => handleChange('subtitlePosition', position.value)}
                                className={`px-4 py-2 rounded-md ${settings.subtitlePosition === position.value
                                    ? 'bg-[#80419c] text-white'
                                    : 'bg-gray-100 text-gray-700'
                                    }`}
                            >
                                {position.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Export Format */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FileText className="mr-2 text-[#80419c]" /> Export Format
                    </label>
                    <div className="flex space-x-2">
                        {exportFormatOptions.map(format => (
                            <button
                                key={format.value}
                                onClick={() => handleChange('exportFormat', format.value)}
                                className={`px-4 py-2 rounded-md ${settings.exportFormat === format.value
                                    ? 'bg-[#80419c] text-white'
                                    : 'bg-gray-100 text-gray-700'
                                    }`}
                            >
                                {format.label}
                            </button>
                        ))}
                    </div>
                </div>






                {/* Add your subtitle settings form fields here */}
                <SaveButton onClick={handleSave}>Save</SaveButton>
            </div>

        </div>
    );
};

export default SubtitleSettings;
