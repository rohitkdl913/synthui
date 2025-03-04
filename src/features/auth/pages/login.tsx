import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './authlayout';
import { Mail } from 'lucide-react';
import FormField from '../../components/form_field';
import { useToast } from '../../provider/toast_provider';
import { useAuth } from '../../provider/auth_provider';


const LoginPage: React.FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { login } = useAuth();
 

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    if (!email || !password) {
      showToast('Please fill out all fields', 'error');
      return;
    }

    setLoading(true);
    await login({ email, password });
    setLoading(false);

  };

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle={
        <>Don't have an account? <Link to="/signup" className="font-medium hover:text-opacity-80" style={{ color: 'var(--primary-color)' }}>Sign up</Link></>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          icon={<Mail />}
          ref={emailRef}
        />

        <FormField
          id="password"
          label="Password"
          type={passwordVisibility ? 'text' : 'password'}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          icon={<button type="button" onClick={togglePasswordVisibility} className="text-sm text-gray-600 ml-2">
            {passwordVisibility ? 'Hide' : 'Show'}
          </button>}
          ref={passwordRef}
        />

        {/* <div className="flex items-center justify-between">
          <div></div>
          <div className="text-sm">
            <a href="#" className="font-medium hover:text-opacity-80" style={{ color: 'var(--primary-color)' }}>Forgot your password?</a>
          </div>
        </div> */}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border rounded-md text-white"
          style={{ backgroundColor: loading ? 'gray' : 'var(--primary-color)' }}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
