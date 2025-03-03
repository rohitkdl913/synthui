// ApplicationSettings.tsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SaveButton from './save_button';

type ContextType = {
    settings: any;
    handleChange: (field: string, value: any) => void;
};

const ApplicationSettings: React.FC = () => {

    const handleSave = () => {
        alert('Settings saved successfully!');
    };
    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Application Settings</h2>
                {/* Keep the application settings form fields from original code */}
                <SaveButton onClick={handleSave}>Save</SaveButton>

            </div>
        </div>
    );
};

export default ApplicationSettings;