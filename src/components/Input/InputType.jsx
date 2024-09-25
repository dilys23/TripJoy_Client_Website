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
        <div className="w-[350px]">
            <div className="relative flex items-center h-[40px] w-[350px] rounded-[5px] border border-[#ccd0d5] bg-[#f5f6f7] px-3 shadow focus-within:border-blue-400 focus:outline-none">
                <input
                    required
                    value={value}
                    onChange={onChange}
                    type={showPass ? 'text' : 'password'}
                    onBlur={onBlur}
                    className="w-full outline-none bg-transparent "
                    placeholder="Mật khẩu..."
                />
                <div className="absolute right-5" onClick={() => setShowPass(!showPass)}>
                    {!showPass && <FaIcon.FaEye className="cursor-pointer w-[20px] h-[20px] text-[#bbb8b8]" />}
                    {showPass && <FaIcon.FaEyeSlash className="cursor-pointer w-[20px] h-[20px] text-[#bbb8b8]" />}
                </div>
            </div>
            <p className="text-red-500 w-[350px] h-[40px] flex justify-start items-center text-[14px] px-2">{errorMessage}</p>
        </div>
    );
}

export default InpuType;