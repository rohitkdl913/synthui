// AccountSettings.tsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SaveButton from './save_button';

type ContextType = {
  settings: any;
  handleChange: (field: string, value: any) => void;
};

const AccountSettings: React.FC = () => {

const handleSave = () => {
    alert('Settings saved successfully!');
};
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Account Settings</h2>
        {/* Keep the account settings form fields from original code */}
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </div>
    </div>
  );
};

export default AccountSettings;