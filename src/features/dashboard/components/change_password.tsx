// import React, { useState } from 'react';

// const ChangePassword: React.FC = () => {
//   const [passwords, setPasswords] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   const handleChange = (field: string, value: string) => {
//     setPasswords((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = () => {
//     if (passwords.newPassword !== passwords.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }
//     alert('Password changed successfully!');
//   };

//   return (
//     <div className="max-w-3xl mx-auto space-y-6 p-6 bg-white border rounded-lg">
//       <h2 className="text-lg font-semibold">Change Password</h2>
//       <input
//         type="password"
//         placeholder="Current Password"
//         value={passwords.currentPassword}
//         onChange={(e) => handleChange('currentPassword', e.target.value)}
//         className="w-full border p-2 mb-4"
//       />
//       <input
//         type="password"
//         placeholder="New Password"
//         value={passwords.newPassword}
//         onChange={(e) => handleChange('newPassword', e.target.value)}
//         className="w-full border p-2 mb-4"
//       />
//       <input
//         type="password"
//         placeholder="Confirm New Password"
//         value={passwords.confirmPassword}
//         onChange={(e) => handleChange('confirmPassword', e.target.value)}
//         className="w-full border p-2 mb-4"
//       />
//       <button onClick={handleSubmit} className="bg-[#80419c] text-white px-4 py-2 rounded">
//         Change Password
//       </button>
//     </div>
//   );
// };

// export default ChangePassword;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const ChangePassword: React.FC = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Password changed successfully!');
    navigate(-1); // Go back to Account Settings
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6 bg-white border border-gray-200 rounded-lg ">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-[#80419c] mb-4">
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back
      </button>

      <h2 className="text-lg font-semibold">Change Password</h2>
      <input
        type="password"
        placeholder="Current Password"
        value={passwords.currentPassword}
        onChange={(e) => handleChange('currentPassword', e.target.value)}
        className="w-full border border-gray-200 rounded-md p-3 mb-4"
      />
      <input
        type="password"
        placeholder="New Password"
        value={passwords.newPassword}
        onChange={(e) => handleChange('newPassword', e.target.value)}
        className="w-full border border-gray-200 rounded-md p-3 mb-4"
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={passwords.confirmPassword}
        onChange={(e) => handleChange('confirmPassword', e.target.value)}
        className="w-full border border-gray-200 rounded-md p-3 mb-4"
      />
     <div className='flex flex-row-reverse'>
     <button onClick={handleSubmit} className="bg-[#80419c] text-white px-4 py-2 rounded mt-5">
        Change Password
      </button>
     </div>
    </div>
  );
};

export default ChangePassword;
