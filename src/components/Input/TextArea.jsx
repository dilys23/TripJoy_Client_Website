import { memo } from "react";

function TextArea({
    width,
    height,
    placeholder,
    className,
    onChange, value
}) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{ width: width, height: height }}
            className={`rounded-[5px] shadow-md outline-none p-2 border border-[#CCD0D5] ${className}`}
        ></textarea>
    );
}

export default memo(TextArea);