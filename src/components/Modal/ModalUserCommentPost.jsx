import { MdClose } from "react-icons/md";

function ModalUserCommentPost({ handleClose, postId }) {
    console.log(postId);
    
    return (
        <>

            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-1000"
                onClick={handleClose}
            >
                <div
                    className="relative sm:w-[450px] w-4/5 min-h-[300px] pb-5 flex bg-white  border-2 border-none rounded-xl shadow-xl stroke-2  stroke-[#D7D7D7] flex-col items-center sm:px-3 py-3 gap-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* <img src={image} alt="" className="w-[130px] h-[130px] object-cover" /> */}
                    <div className="absolute top-5 right-5">
                        <MdClose onClick={handleClose} className="text-[25px] cursor-pointer" />
                    </div>
                    <div className="w-full justify-center flex flex-col gap-1">

                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalUserCommentPost;