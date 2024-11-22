import { useState } from "react";
import { getProvinces } from "../../services/getProvince";

function InputWithLabel({ label, placeholder, value, onChange, isDropdown }) {
    const [isFocused, setIsFocused] = useState(false);
    const [provinces, setProvinces] = useState([]);
    useEffect(() => {
        if (isDropdown) {
            const fetchProvinces = async () => {
                setLoading(true);
                try {
                    const data = await getProvinces(0, 10); // pageIndex = 1, pageSize = 10
                    console.log(data);
                    // setProvinces(data?.provinces || []);
                } catch (error) {
                    console.error("Failed to fetch provinces:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProvinces();
        }
    }, [isDropdown]);

    return (
        <div className="relative w-full lg:h-[40px] h-[35px]">
            {(value || isFocused) && (
                <span className="absolute top-[-12px] left-2 text-[12px] text-gray-600 transition-all">
                    {label}
                    <span className="text-[red] ml-1 text-[15px]">*</span>
                </span>
            )}
            {isDropdown ? (
                <Select
                    showSearch
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    loading={loading}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full max-h-[100px] overflow-y-hidden"
                >
                    {provinces.map((province) => (
                        <Option key={province.id} value={province.name}>
                            {province.name}
                        </Option>
                    ))}
                </Select>
            ) : (
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
            )}
            {/* <input
                required
                type="text"
                value={value}
                onChange={onChange}
                placeholder={isFocused ? "" : placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full border-b border-[#E3E6E8] px-2 py-2 lg:text-base text-[14px] outline-none focus:border-blue-500"
            /> */}
        </div>
    );
}

export default InputWithLabel;