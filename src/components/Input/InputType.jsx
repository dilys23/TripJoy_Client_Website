import { useState } from "react";
import * as FaIcon from "react-icons/fa";
function InputType({
    name,
    type,
    value,
    onChange,
    placeholder,
    required = false,
    validate,
    errorMessage,
    onBlur
}) {
    const [showPass, setShowPass] = useState(false);

    return (
        <div className="md:w-[450px] w-full">
            <div className="relative flex items-center h-[40px]  rounded-[5px] border border-[#ccd0d5] bg-white shadow focus-within:border-blue-400 focus:outline-none">
                <input
                    name={name}
                    required={required}
                    value={value}
                    onChange={onChange}
                    type={showPass ? 'text' : 'password'}
                    onBlur={onBlur}
                    validate={validate}
                    className="w-full outline-none bg-transparent md:text-[16px] text-[14px] md:px-3 px-5"
                    placeholder={placeholder}
                />
                <div className="absolute right-5" onClick={() => setShowPass(!showPass)}>
                    {!showPass && <FaIcon.FaEye className="cursor-pointer w-[20px] h-[20px] text-[#bbb8b8]" />}
                    {showPass && <FaIcon.FaEyeSlash className="cursor-pointer w-[20px] h-[20px] text-[#bbb8b8]" />}
                </div>
            </div>
            <p className="text-red-500 w-[350px] h-[20px] flex justify-start items-center text-[11px] px-2">{errorMessage}</p>
        </div>
    );
}

export default InputType;