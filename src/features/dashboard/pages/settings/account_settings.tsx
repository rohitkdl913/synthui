import React, { useState } from 'react';
import { User, Mail, Shield, KeyRound, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AccountSettings: React.FC = () => {
  const [profile, setProfile] = useState({
    username: 'johndoe',
    email: 'john.doe@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();



  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };



  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <User className="mr-2 text-[#80419c]" />
          Profile Information
        </h2>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <User className="mr-2 text-[#80419c]" /> Username
          </label>
          <input
            type="text"
            value={profile.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Mail className="mr-2 text-[#80419c]" /> Email Address
          </label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Shield className="mr-2 text-[#80419c]" />
          Security Options
        </h2>

        <div
          onClick={() => { navigate("/dashboard/settings/account/change-password"); }}
          className="w-full flex items-center bg-white border border-gray-200 border-t-white border-l-white border-r-white  p-6"
        >
          <Lock className="mr-2" />
          Change Password
        </div>


      </div>
    </div>
  );
};

export default AccountSettings;
