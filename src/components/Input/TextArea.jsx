function TextArea({
    width,
    height,
    placeholder,
    className
}) {
    return (
        <textarea
            placeholder={placeholder}
            style={{ width: width, height: height }}
            className={`rounded-[5px] shadow-md outline-none p-2 border border-[#CCD0D5] ${className}`}
        ></textarea>
    );
}

export default TextArea;