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
    joinBtn,
    onClick,
    to,
    hide = false,
    rightIcon
}) {
    const buttonContent = (
        <button
            onClick={onClick}
            style={{ width, height }}
            className={`flex items-center gap-2 cursor-pointer font-semibold shadow outline-none justify-center text-start 
            ${primary ? 'bg-[#ff7224] font-semibold  hover:bg-[#ff7124fc] transition-all duration-150 text-white' : ''}
            ${secondary ? 'bg-[#007AFF]  font-semibold  w-[85px] h-[37px] text-white rounded-lg hover:bg-[#006ee6] transition-all duration-150 px-2' : ''}
            ${tertiary ? 'bg-[#B3B3B3]  font-semibold  sm:w-[85px] sm:h-[37px] w-[70px] h-[25px] sm:text-base text-[13px] rounded-lg hover:bg-[#B3B3B3] transition-all duration-150 text-white' : ''}
            ${className}`}
        >
            {leftIcon && <span>{leftIcon}</span>}
            <span className={`${hide ? 'lg:block sm:hidden ' : 'block'}`}>{children}</span>
            {rightIcon && <span>{rightIcon}</span>}
        </button>
    );

    return to ? (
        <Link to={to} transition-all duration-300>
            {buttonContent}
        </Link>
    ) : (
        buttonContent
    );
}

export default Button;
