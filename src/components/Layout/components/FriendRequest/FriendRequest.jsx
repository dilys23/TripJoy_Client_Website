import ava1 from "../../../../images/ava1.png"
import ava2 from "../../../../images/ava2.png"
import FriendItem from "./FriendItem";
function FriendRequest() {
    const info = [
        { ava: ava1, name: "Hong Nhung" },
        { ava: ava2, name: "Bao Chau" }
    ];
    return (
        <div className="w-full">
            <div className="flex w-full justify-between">
                <span className="text-[#aeaeae] md:text-base text-[13px] font-bold ">YÊU CẦU</span>
                <span className="rounded-90 bg-[#007AFF] text-white font-bold md:w-[22px] w-[15px] md:h-[22px] h-[15px] md:text-[14px] text-[12px] text-center cursor-pointer ">2</span>
            </div>
            <div className="w-full h-[215px]">
                {info.map((item, index) => (
                    <FriendItem key={index} info={item}></FriendItem>
                ))}
            </div>
        </div>
    );
}

export default FriendRequest;