function Button({
    width,
    height,
    children,
    className = '',
    leftIcon
}) {
    return (
        <button
            style={{ width: width, height: height }}
            className={`flex items-center gap-1 cursor-pointer rounded-[15px] bg-[#ff7224] text-base font-semibold text-white shadow outline-none ${className}`}>
            {leftIcon && <span className="">{leftIcon}</span>}
            {children}</button>
    );
}

export default Button;