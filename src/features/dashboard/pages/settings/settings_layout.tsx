import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ChevronLeft, Settings, User, SlidersHorizontal } from 'lucide-react';

const SettingsLayout: React.FC = () => {
  const [settings, setSettings] = useState({
    subtitleFont: 'Arial',
    subtitleSize: 'Medium',
    subtitleColor: '#FFFFFF',
    subtitleBackground: '#000000',
    subtitlePosition: 'Bottom',
    exportFormat: 'SRT',
    language: 'ne-NP',
    autoSave: true,
    saveInterval: 5
  });

  const location = useLocation();

  const handleChange = (field: string, value: string | boolean | number) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

 

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Side Panel */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col justify-center items-center">
        <nav className="space-y-10">
          <Link
            to="/dashboard/settings/subtitle"
            className={`flex items-center px-3 py-2 rounded-md ${location.pathname.includes('subtitle') || location.pathname === '/dashboard/settings'
              ? 'bg-[#80419c] text-white'
              : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Subtitle Settings
          </Link>
          <Link
            to="/dashboard/settings/application"
            className={`flex items-center px-3 py-2 rounded-md ${location.pathname.includes('application')
              ? 'bg-[#80419c] text-white'
              : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <Settings className="h-5 w-5 mr-2" />
            Application Settings
          </Link>
          <Link
            to="/dashboard/settings/account"
            className={`flex items-center px-3 py-2 rounded-md ${location.pathname.includes('account')
              ? 'bg-[#80419c] text-white'
              : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <User className="h-5 w-5 mr-2" />
            Account Settings
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-[#80419c]">
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span>Back to Projects</span>
            </Link>
          </div>
        </header>

        <div className="flex-1 p-6">
          <Outlet context={{ settings, handleChange }} />
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
