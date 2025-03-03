import React, { forwardRef, useImperativeHandle } from 'react';

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  autoComplete?: string;
  required?: boolean;
};

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({
  id,
  label,
  type = 'text',
  placeholder = '',
  icon,
  autoComplete = 'off',
  required = false
}, ref) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => inputRef.current!);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mt-1">
        <input
          id={id}
          name={id}
          type={type}
          ref={inputRef}
          autoComplete={autoComplete}
          required={required}
          className="w-full focus:outline-none text-gray-900"
          placeholder={placeholder}
        />
        {icon}
      </div>
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;
