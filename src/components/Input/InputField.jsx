import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InputField = ({
  name,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  validate,
  errorMessage,
  onBlur,
  className,
  inputClassName,
  errorClassName
}) => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleBlur = () => {
    if (validate) {
      const validationError = validate(value);
      setError(validationError);
    }
    if (onBlur) onBlur();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`relative ${className}`}> {/* Thêm className cho container */}
      <input
        name={name}
        type={showPassword ? 'text' : type}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        required={required}
        autoComplete="off"
        className={`${inputClassName} mb-4 h-[40px] w-full rounded-[5px] px-3 shadow focus:outline-none ${error ? 'border-red-500' : 'border-[#ccd0d5] bg-[#f5f6f7] focus:border-blue-400'
          }`}
        placeholder={placeholder}
      />
      {type === 'password' && (
        <span
          className="absolute right-3 top-[10px] cursor-pointer text-gray-500"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
      {error && <p className={`${errorClassName} text-red-500 text-sm px-2 mt-[-15px] mb-[6px ] `}>{errorMessage || error}</p>}
    </div>
  );
};

export default InputField;
