import { MdClose } from "react-icons/md";
import image1 from "../../assets/images/anh1.jpg"
import image2 from "../../assets/images/anh2.jpg"
import ava from "../../assets/images/ava.jpg"
import PostCard from "./PostCard";
function ModalListPost({ onClose }) {
    const modalListPost = [
        {
            image: image1,
            avatar: ava,
            name: 'Bach Duong',
            date: '20/9/2024',
            state: false,
            title: 'Hai ngày một đêm ở Hà Giang'
        },
        {
            image: image2,
            name: 'Bach Duong',
            date: '20/9/2024',
            state: true,
            title: 'Hai ngày một đêm ở Hà Giang'
        }
    ]
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-1000"
            >
                <div
                    className="modal w-[741px] h-[629px] flex  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between w-full px-5 py-3 items-center">
                        <div></div>
                        <div className="nunito-text font-extrabold text-[36px] leading-[49px] pt-3 mb-2">Danh sách chuyến đi </div>
                        <MdClose className="text-[30px] text-[#979797] rounded-[90px] " onClick={onClose}></MdClose>
                    </div>
                    <div className="flex flex-col gap-5 h-[500px] overflow-y-auto post-scroll">
                        {modalListPost.map((post, index) => (
                            <PostCard key={index} post={post}></PostCard>
                        ))}

                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalListPost;