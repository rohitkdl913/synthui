import React from 'react';
import SaveButton from './save_button';

const SubtitleSettings: React.FC = () => {
    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 relative">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Subtitle Preferences</h2>
                {/* Add your subtitle settings form fields here */}
                <SaveButton onClick={handleSave}>Save</SaveButton>
            </div>

        </div>
    );
};

export default SubtitleSettings;
