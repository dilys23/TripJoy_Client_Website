function EditPlan({ handleClose }) {
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div
                className="fixed inset-0 flex w-full h-screen justify-center items-center text-center z-1000"
                onClick={handleClose}
            >
                <div
                    className="modal sm:w-[600px] w-4/5 h-fit flex  border-2 border-none rounded-xl shadow-xl stroke-2 bg-white stroke-[#D7D7D7] flex-col items-center sm:px-3 py-3"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="w-full justify-end flex sm:px-0 px-2">
                        <MdClose onClick={handleClose} className="text-[25px] cursor-pointer" />
                    </div>
                    <div className="flex flex-col justify-start w-full sm:gap-4 pb-3 gap-3 sm:px-6 px-3 pt-3">
                        <span className="sm:text-[20px] text-base font-semibold text-start">Chỉnh sửa thông tin cá nhân</span>


                    </div>
                </div>

            </div>
        </>
    );
}

export default EditPlan;