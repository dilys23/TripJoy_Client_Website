import { Link } from 'react-router-dom';

function Button({
    width,
    height,
    children,
    className = '',
    leftIcon,
    primary,
    secondary,
    tertiary,
    normalBtn,
    onClick,
    to,
    hide = false,
    rightIcon,
    disabled = false
}) {
    const buttonContent = (
        <button
            onClick={disabled ? (e) => e.preventDefault() : onClick}
            style={{ width, height }}
            disabled={disabled}
            className={`flex items-center gap-2 cursor-pointer font-semibold shadow outline-none justify-center text-start 
            ${primary ? 'bg-[#ff7224] font-semibold  hover:bg-[#ff7124fc] transition-all duration-150 text-white px-2 py-1' : ''}
            ${secondary ? 'bg-[#007AFF]  font-semibold px-3 py-1 text-white rounded-lg hover:bg-[#006ee6] transition-all duration-150' : ''}
            ${tertiary ? 'bg-[#B3B3B3]  font-semibold  px-2 py-1 sm:text-base  rounded-lg hover:bg-[#B3B3B3] transition-all duration-150 text-white' : ''}
            ${normalBtn ? 'bg-white hover:bg-[#faf9f9]  font-medium  text-[13px] rounded-lg  py-1 transition-all duration-150 text-[#0F3E4A] border border-[#CCD0D5]' : ''}
            ${className}`}
        >
            {leftIcon && <span>{leftIcon}</span>}
            {children && <span className={`${hide ? 'lg:block sm:hidden' : 'block'}`}>{children}</span>}
            {rightIcon && <span>{rightIcon}</span>}
        </button>
    );

    return to ? (
        <Link to={to} >
            {buttonContent}
        </Link>
    ) : (
        buttonContent
    );
}

export default Button;
