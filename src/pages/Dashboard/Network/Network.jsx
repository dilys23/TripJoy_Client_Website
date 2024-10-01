import ava from "../../../assets/images/ava.jpg";
import * as MdIcons from "react-icons/fa";
import Posts from "../../../modules/network/Posts";
import FriendRequest from "../../../components/FriendRequest";
import Contact from "../../../components/Contact/Contact";
import { useState } from "react";
import ModalListPost from "../../../modules/network/ModalListPost";
function Network() {
  const [showModalListPost, setShowModalListPost] = useState(false)
  const closeModal = () => {
    setShowModalListPost(false);
  };
  return (
    <div className=" my-3 flex w-full px-3">
      <div className="lg:w-5/10 w-full">
        <div className="rounded-20 flex h-[71px] w-full items-center justify-between bg-white px-4 ">
          <div className="flex cursor-pointer items-center gap-3 w-full">
            <img
              src={ava}
              alt=""
              className="rounded-90 h-[41px] w-[42px] sm:h-[51px] sm:w-[52px]"
            />
            <span className="text-[11px] text-[#979797] sm:text-[14px]">
              Có gì mới không? Bach Duong
            </span>
          </div>
          <div
            onClick={() => setShowModalListPost(!showModalListPost)}
            className=" rounded-20 flex h-[30px] w-[120px] cursor-pointer items-center gap-3 border-none bg-[#007AFF] px-2">
            <MdIcons.FaLink className="text-sm text-white" />
            <span className="hidden text-white sm:block sm:text-[10px] md:text-base">
              Chia sẻ
            </span>
            {showModalListPost && <ModalListPost onClose={closeModal}></ModalListPost>}
          </div>
        </div>
        <Posts></Posts>
      </div>
      <div className="lg:w-4/10 hidden px-6 lg:block">
        <FriendRequest></FriendRequest>
        <Contact></Contact>
      </div>
    </div>
  );
}

export default Network;
