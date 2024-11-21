import { useState } from "react";

function InputWithLabel({ label, placeholder, value, onChange }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative w-full lg:h-[40px] h-[35px]">
            {(value || isFocused) && (
                <span className="absolute top-[-12px] left-2 text-[12px] text-gray-600 transition-all">
                    {label}
                    <span className="text-[red] ml-1 text-[15px]">*</span>
                </span>
            )}
            <input
                required
                type="text"
                value={value}
                onChange={onChange}
                placeholder={isFocused ? "" : placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full border-b border-[#E3E6E8] px-2 py-2 lg:text-base text-[14px] outline-none focus:border-blue-500"
            />
        </div>
    );
}

export default InputWithLabel;