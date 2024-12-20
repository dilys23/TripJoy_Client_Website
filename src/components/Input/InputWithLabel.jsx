import { useEffect, useState } from "react";
import { getProvinces } from "../../services/getProvince";
import { Select, Spin } from "antd";

function InputWithLabel({ label, placeholder, value, onChange, isDropdown }) {
    const [isFocused, setIsFocused] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [pageIndex, setPageIndex] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);

    const fetchProvinces = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const data = await getProvinces(pageIndex, 63);
            const newProvinces = data?.provinces.data || [];
            // console.log(data);
            setProvinces((prevProvinces) => [...prevProvinces, ...newProvinces]);
            if (newProvinces.length < 10) {
                setHasMore(false);
            }
            setPageIndex((prevIndex) => prevIndex + 1);
        } catch (error) {
            console.error("Failed to fetch provinces:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isDropdown) {
            fetchProvinces();
        }
    }, [isDropdown]);

    const handleScroll = (event) => {
        const { target } = event;
        setScrollPosition(target.scrollTop);
        if (target.scrollTop + target.clientHeight >= target.scrollHeight - 5 && !loading && hasMore) {
            fetchProvinces();
        }
    };

    return (
        <div className="relative w-full lg:h-[40px] h-[35px]">
            {(value || isFocused) && (
                <span className={`absolute ${isDropdown ? 'top-[-20px]' : 'top-[-12px]'} left-2 text-[12px] text-gray-600 transition-all`}>
                    {label}
                    <span className="text-[red] ml-1 text-[15px]">*</span>
                </span>
            )}
            {isDropdown ? (
                <Select
                    showSearch
                    placeholder={placeholder}
                    value={value || undefined}
                    onChange={onChange}
                    loading={loading}
                    onFocus={() => setIsFocused(true)}
                    onPopupScroll={handleScroll}
                    virtual={false}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().includes(input.toLowerCase())
                    }
                    className="w-full max-h-[100px] overflow-y-hidden"
                    notFoundContent={loading ? <Spin size="small" /> : "Không tìm thấy dữ liệu"
                    }
                >
                    {provinces.map((province, index) => (
                        <Select.Option key={index} value={province.id}>
                            {province.name}
                        </Select.Option>
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
            )
            }
        </div >
    );
}

export default InputWithLabel;
