import ava from "../../../assets/images/ava.jpg";
import * as MdIcons from "react-icons/fa";
import Posts from "../../../components/Posts";
import FriendRequest from "../../../components/FriendRequest";
import Contact from "../../../components/Contact/Contact";
function Network() {
  return (
    <div className="md:gap-x-15 my-3 flex w-full gap-x-0 px-3 lg:gap-x-28">
      <div className="w-5/10">
        <div className="rounded-20 flex h-[71px] w-full items-center justify-between bg-white px-4">
          <div className="flex cursor-pointer items-center gap-3">
            <img
              src={ava}
              alt=""
              className="rounded-90 h-[41px] w-[42px] sm:h-[51px] sm:w-[52px]"
            />
            <span className="text-[11px] text-[#979797] sm:text-[14px]">
              Có gì mới không? Bach Duong
            </span>
          </div>
          <div className="rounded-20 flex h-[30px] w-[40px] cursor-pointer items-center gap-3 border-none bg-[#007AFF] pl-2 sm:h-[31px] sm:w-[105px]">
            <MdIcons.FaLink className="text-sm text-white" />
            <span className="hidden text-white sm:block sm:text-[10px] md:text-base">
              Chia sẻ
            </span>
          </div>
        </div>
        <Posts></Posts>
      </div>
      <div className="w-4/10 hidden px-6 sm:block">
        <FriendRequest></FriendRequest>
        <Contact></Contact>
      </div>
    </div>
  );
}

export default Network;
