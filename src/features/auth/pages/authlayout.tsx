import React, { ReactNode } from 'react';
import logo from '../../../assets/logo/logo.png';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - hero image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-(--primary-color)">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-purple-500 opacity-90"></div>
        <div className="flex flex-col justify-center items-center relative z-10 px-12 text-white">
          <div className='flex flex-col justify-center items-center'>
          <img src={logo} alt="Logo" className="h-[60%] mr-5 " style={{aspectRatio: '90/83'}} />
        <div className="text-4xl font-semibold">
            SubtitleSynth<sup className="text-xl">AI</sup>
        </div>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-600">
                {subtitle}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;