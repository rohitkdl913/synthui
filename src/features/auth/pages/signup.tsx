import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './authlayout';
import FormField from '../../components/form_field';
import { useAuth } from '../../provider/auth_provider';


const SignupPage: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const newpasswordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);


  const { signup,  } = useAuth();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const password = newpasswordRef.current?.value || '';

    setLoading(true);
    await signup({ name, email, password });
    setLoading(false);

  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium hover:text-opacity-80" style={{ color: 'var(--primary-color)' }}>
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField ref={nameRef} id="name" type="text" label="Full Name" placeholder="John Doe" required />
        <FormField ref={emailRef} id="email" type="email" label="Email address" placeholder="you@example.com" required autoComplete="email" />
        <FormField ref={newpasswordRef} id="password" type="password" label="Password" placeholder="Create password" required />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            backgroundColor: loading ? 'gray' : 'var(--primary-color)',
            '--tw-ring-color': 'var(--primary-color)',
            '--tw-ring-opacity': '0.5'
          } as React.CSSProperties}
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
