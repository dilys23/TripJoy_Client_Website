import { Modal, Skeleton } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getExpenseByMemberId } from "../../services/budget";
import useInfiniteScroll from "../../hooks/useInfiniteScroll ";
import CardExpense from "../Card/CardExpense";

function ModalDetailBudgetMember({ planId, userId, open, handleClose }) {
    // const [dataList, setDataList] = useState([]);
    const fetchData = async () => {
        try {
            console.log(planId, userId.userId)
            const res = await getExpenseByMemberId(planId, userId.userId, 0, 10);
            return res.detailExpense.data || [];
        } catch (error) {
            console.log(error);
            return [];
        }

    }

    const { dataList, loading, hasMore, observerRef, refreshData } = useInfiniteScroll(fetchData);
    // console.log(dataList)
    return (
        <Modal
            title={`Chi tiết chi phí của ${userId.userName}`}
            open={open}
            onCancel={handleClose}
            footer={null}

        >
            <div className="w-full flex flex-col gap-2 h-[350px]">
                {
                    loading ? <Skeleton active /> :

                        (
                            dataList.map((expense) => (
                                <CardExpense
                                    key={expense.order}
                                    icon={
                                        <img
                                            width="28"
                                            height="28"
                                            src="https://img.icons8.com/fluency/28/map-pin.png"
                                            alt="map-pin"
                                        />
                                    }
                                    expense={expense}
                                />
                            ))
                        )
                }
            </div>
        </Modal>
    );
}

export default ModalDetailBudgetMember;