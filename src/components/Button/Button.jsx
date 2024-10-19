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
    onClick,
    to
}) {
    const buttonContent = (
        <button
            onClick={onClick}
            style={{ width, height }}
            className={`flex items-center gap-1 cursor-pointer text-base font-semibold text-white shadow outline-none justify-center transition-all duration-300
            ${primary ? 'bg-[#ff7224] rounded-[15px]' : ''}
            ${secondary ? 'bg-[#007AFF] w-[85px] h-[37px] rounded-lg hover:bg-[#006ee6] transition-all duration-150' : ''}
            ${tertiary ? 'bg-[#B3B3B3] w-[85px] h-[37px] rounded-lg hover:bg-[#B3B3B3] transition-all duration-150' : ''}
            ${className}`}
        >
            {leftIcon && <span>{leftIcon}</span>}
            {children}
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
