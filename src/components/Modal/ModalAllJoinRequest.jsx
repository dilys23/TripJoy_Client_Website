import { Empty, Modal } from "antd";
import { acceptJoinRequest, declineJoinRequest, getJoinPlanRequest } from "../../services/joinRequest";
import { useEffect, useState } from "react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll ";
import AvatarDefault from "../Avatar/AvatarDefault";
import { MdArrowBack } from "react-icons/md";
import Button from "../Button/Button"
import TextArea from "../Input/TextArea";
function ModalAllJoinRequest({
    planId,
    open,
    onCancel,
    onSuccess
}) {
    const [viewRequest, setViewRequest] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const fetchData = async (pageIndex, pageSize) => {
        try {
            const res = await getJoinPlanRequest(planId, pageIndex, pageSize);
            // console.log(res);
            return res.joinPlanRequests.data || [];
            // console.log(res);
        } catch (error) {
            console.error(error);
        }
    }
    const { dataList, loading, hasMore, observerRef, refreshData } = useInfiniteScroll(fetchData, 10);
    console.log(dataList);
    const handleAcceptRequest = async () => {
        try {
            const res = await acceptJoinRequest(planId, selectedItem.userId);
            setViewRequest(false);
            refreshData();
            console.log(res);
            onSuccess();
        } catch (error) {
            console.error(error);
        }
    }
    const handleDeclineRequest = async (id) => {
        try {
            const res = await declineJoinRequest(planId, selectedItem.userId);
            setViewRequest(false);
            refreshData();
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }
    const formatDate = (date) => {
        const parsedDate = new Date(date);
        const day = String(parsedDate.getDate()).padStart(2, '0');
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
        const year = parsedDate.getFullYear();
        return `${day}/${month}/${year}`;
    };


    return (
        <Modal
            title={
                viewRequest && selectedItem ? (
                    <div className="flex items-center gap-2">
                        <MdArrowBack
                            className="text-[15px] cursor-pointer"
                            onClick={() => setViewRequest(false)}
                        />
                        <span>Chi tiết yêu cầu</span>
                    </div>
                ) : (
                    "Danh sách các yêu cầu"
                )
            }
            open={open}
            // onOk={() => onOk(message)}
            onCancel={onCancel}
            footer={null}
        >
            <div className={`${viewRequest ? 'hidden' : 'flex'} flex-col gap-4 h-[300px] overflow-auto`}>
                {dataList.length > 0 ? (
                    dataList.map((item) => (
                        <div key={item.userId} className={`w-full justify-between px-2 flex `}>
                            <div className="flex gap-2 items-center">
                                <AvatarDefault src={item.avatar} className="w-12 h-12"></AvatarDefault>
                                <span className="font-semibold">{item.userName}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setViewRequest(true);
                                    }}
                                    className="text-[13px] text-[#0354AD] font-semibold italic cursor-pointer"
                                >
                                    Xem yêu cầu
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <Empty description="Không có dữ liệu" />
                    </div>
                )}
            </div>

            {
                viewRequest && selectedItem &&
                <div className="flex flex-col h-[300px]">
                    {/* <span
                        onClick={() => setViewRequest(false)}
                        className="text-[13px] text-[#0354AD] font-semibold italic cursor-pointer flex gap-2 items-start h-1/6 ">
                        <MdArrowBack className="text-[15px]" />

                    </span> */}
                    <div className="h-5/6 flex items-center">
                        <div className="w-1/3 justify-center items-center flex">
                            <img width="100" height="100" src="https://img.icons8.com/hands/100/secured-letter.png" alt="secured-letter" />
                        </div>
                        <div className="w-2/3 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <AvatarDefault src={selectedItem.avatar} className="w-12 h-12">
                                </AvatarDefault>
                                <div className="flex flex-col">
                                    <span className="font-medium">{selectedItem.userName}</span>
                                    <span className="text-[12px] italic">{formatDate(selectedItem.appliedAt)}</span>
                                </div>
                            </div>
                            <span className="text-[15px] font-semibold">Giới thiệu:</span>
                            <TextArea value={selectedItem.introduction} height="100px" className="text-[13px]"></TextArea>
                        </div>
                    </div>
                    <div className="h-1/6 flex gap-2 justify-end items-end">
                        <Button
                            onClick={handleDeclineRequest}
                            tertiary className="text-[12px] max-h-[30px]">Từ chối</Button>
                        <Button
                            onClick={handleAcceptRequest}
                            className="rounded-md max-h-[30px] bg-[#6BFABF] px-2 py-1 text-[#056649]">Chấp nhận</Button>
                    </div>
                </div>
            }

        </Modal>
    );
}

export default ModalAllJoinRequest;