// import React, { useRef } from 'react';
// import { Link } from 'react-router-dom';
// import AuthLayout from './authlayout';
// import FormField from '../../components/form_field';
// import { useToast } from '../../provider/toast_provider';
// import { validateName, validateEmail, validatePassword } from '../controller/form_validator';

// const SignupPage: React.FC = () => {
//   const emailRef = useRef<HTMLInputElement>(null);
//   const newpasswordRef = useRef<HTMLInputElement>(null);
//   const nameRef = useRef<HTMLInputElement>(null);


//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // const formData = new FormData(e.currentTarget);

//     // const name = formData.get('name') as string;
//     // const email = formData.get('email') as string;
//     // const password = formData.get('password') as string;

//     // // Validate fields
//     // const nameError = validateName(name);
//     // const emailError = validateEmail(email);
//     // const passwordError = validatePassword(password);

//     // if (nameError) return showToast(nameError, 'error');
//     // if (emailError) return showToast(emailError, 'error');
//     // if (passwordError) return showToast(passwordError, 'error');

//     // // Signup logic
//     // console.log('Signing up', { name, email, password });
//     // showToast('Account created successfully!', 'success');
//   };



//   return (
//     <AuthLayout
//       title="Create your account"
//       subtitle={
//         <>
//           Already have an account?{' '}
//           <Link to="/login" className="font-medium hover:text-opacity-80 focus:outline-none" style={{ color: 'var(--primary-color)' }}>
//             Sign in
//           </Link>
//         </>
//       }
//     >
//       <div className="mb-6 p-4 rounded-lg text-sm" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary-color)' }}>
//         <p className="font-medium mb-1">Join Nepal's first AI-powered subtitle generator!</p>
//         <p>Create an account today and start generating accurate Nepali subtitles for your videos, documentaries, and educational content. Perfect for content creators, filmmakers, and educators.</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">


//         <FormField
//           ref={nameRef}
//           id="name"
//           type="text"
//           label="Full Name"
//           placeholder="John Doe"
//           required
//         />

//         <FormField
//           ref={emailRef}
//           id="email"
//           type="email"
//           label="Email address"
//           placeholder="you@example.com"
//           required
//           autoComplete="email" />

//         <FormField
//           ref={newpasswordRef}
//           id="password"
//           type="password"
//           label="Password"
//           placeholder="Create password"
//           required />

//         <div>
//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
//             style={{
//               backgroundColor: 'var(--primary-color)',
//               '--tw-ring-color': 'var(--primary-color)',
//               '--tw-ring-opacity': '0.5'
//             } as React.CSSProperties}
//             onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
//             onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-color)'}
//           >
//             Create account
//           </button>
//         </div>
//       </form>

//       <div className="mt-6 text-center text-sm text-gray-500">
//         By creating an account, you agree to our{' '}
//         <a href="#" className="font-medium hover:text-opacity-80" style={{ color: 'var(--primary-color)' }}>
//           Terms of Service
//         </a>{' '}
//         and{' '}
//         <a href="#" className="font-medium hover:text-opacity-80" style={{ color: 'var(--primary-color)' }}>
//           Privacy Policy
//         </a>
//       </div>
//     </AuthLayout>
//   );
// };

// export default SignupPage;




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

 
  const { signup } = useAuth();


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
