// // ApplicationSettings.tsx
// import React from 'react';
// import { useOutletContext } from 'react-router-dom';
// import SaveButton from './save_button';

// type ContextType = {
//     settings: any;
//     handleChange: (field: string, value: any) => void;
// };

// const ApplicationSettings: React.FC = () => {

//     const handleSave = () => {
//         alert('Settings saved successfully!');
//     };
//     return (
//         <div className="max-w-3xl mx-auto">
//             <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
//                 <h2 className="text-lg font-medium text-gray-800 mb-4">Application Settings</h2>
//                 {/* Keep the application settings form fields from original code */}
//                 <SaveButton onClick={handleSave}>Save</SaveButton>

//             </div>
//         </div>
//     );
// };

// export default ApplicationSettings;




import React from 'react';
import { useOutletContext } from 'react-router-dom';
import {
    Settings,
    Save,
    Languages,
    Clock,
    Power
} from 'lucide-react';
import SaveButton from './save_button';

interface SettingsContextType {
    settings: {
        language: string;
        autoSave: boolean;
        saveInterval: number;
    };
    handleChange: (field: string, value: string | boolean | number) => void;
}

const ApplicationSettings: React.FC = () => {
    const { settings, handleChange } = useOutletContext<SettingsContextType>();

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    const languageOptions = [
        { code: 'ne-NP', name: 'Nepali' },
        { code: 'en-US', name: 'English (US)' },
        { code: 'hi-IN', name: 'Hindi' },
        { code: 'fr-FR', name: 'French' },
        { code: 'es-ES', name: 'Spanish' }
    ];

    const saveIntervalOptions = [
        { value: 5, label: '5 minutes' },
        { value: 10, label: '10 minutes' },
        { value: 15, label: '15 minutes' }
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-6">

            <div className="bg-white border border-gray-200 rounded-lg p-6 relative">



                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Settings className="mr-2 text-[#80419c]" />
                    Application Settings
                </h2>

                {/* Language Selection */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Languages className="mr-2 text-[#80419c]" /> Language
                    </label>
                    <select
                        value={settings.language}
                        onChange={(e) => handleChange('language', e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2"
                    >
                        {languageOptions.map(lang => (
                            <option key={lang.code} value={lang.code}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Auto Save Toggle */}
                <div className="mb-4 flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                        <Save className="mr-2 text-[#80419c]" /> Auto Save
                    </label>
                    <div className="flex items-center">
                        <button
                            onClick={() => handleChange('autoSave', true)}
                            className={`px-4 py-2 rounded-l-md ${settings.autoSave
                                ? 'bg-[#80419c] text-white'
                                : 'bg-gray-100 text-gray-700'
                                }`}
                        >
                            On
                        </button>
                        <button
                            onClick={() => handleChange('autoSave', false)}
                            className={`px-4 py-2 rounded-r-md ${!settings.autoSave
                                ? 'bg-[#80419c] text-white'
                                : 'bg-gray-100 text-gray-700'
                                }`}
                        >
                            Off
                        </button>
                    </div>
                </div>

                {/* Save Interval */}
                {settings.autoSave && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <Clock className="mr-2 text-[#80419c]" /> Save Interval
                        </label>
                        <div className="flex space-x-2">
                            {saveIntervalOptions.map(interval => (
                                <button
                                    key={interval.value}
                                    onClick={() => handleChange('saveInterval', interval.value)}
                                    className={`px-4 py-2 rounded-md ${settings.saveInterval === interval.value
                                        ? 'bg-[#80419c] text-white'
                                        : 'bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    {interval.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {/* Add your subtitle settings form fields here */}
                <SaveButton onClick={handleSave}>Save</SaveButton>

            </div>
        </div>
    );
};

export default ApplicationSettings;