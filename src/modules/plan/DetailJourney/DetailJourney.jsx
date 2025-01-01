// import image from "../../assets/images/anh1.jpg"
// import Hue from "../../assets/images/Hue.jpg"
// import HoiAn from "../../assets/images/hoian.png"
import DetailJourneyItem from "./DetailJourneyItem"
import { MdKeyboardArrowDown } from "react-icons/md"
import { useEffect, useMemo, useState } from "react"
import Button from "../../../components/Button/Button"
import EvaluationJourneyItem from "./EvaluationJourneyItem"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { format, addDays, eachDayOfInterval } from "date-fns";
import { changeOrderPlanLocation, getPlanLocationByIdService } from "../../../services/planLocation"
import { toast } from "react-toastify"
function DetailJourney({ role, planId, plan, planLocation, listMember, onSuccess }) {

    const [expandedEvaluationItems, setExpandedEvaluationItems] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState([]);
    const [listItemJourney, setListItemJourney] = useState([]);
    // console.log('planLocation', planLocation);
    // console.log('listItemJourney', listItemJourney);
    useEffect(() => {
        setListItemJourney(planLocation);
    }, [planLocation])
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const dayOfWeek = date.toLocaleString('vi-VN', { weekday: 'long' });
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}, ngày ${day}/${month}/${year}`;
    };

    const generateDateList = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        return eachDayOfInterval({ start, end }).map((date) =>
            format(date, "yyyy-MM-dd")
        );
    };

    const groupedJourneys = useMemo(() => {
        if (!plan?.estimatedStartDate || !plan?.estimatedEndDate) return {};

        const dates = generateDateList(plan.estimatedStartDate, plan.estimatedEndDate);

        const grouped = dates.reduce((acc, date) => {
            acc[date] = listItemJourney.filter((location) =>
                format(new Date(location.estimatedStartDate), "yyyy-MM-dd") === date
            );
            return acc;
        }, {});

        return grouped;
    }, [listItemJourney, plan?.estimatedStartDate, plan?.estimatedEndDate]);

    useEffect(() => {
        if (Object.keys(groupedJourneys).length > 0) {
            setExpandedGroups([Object.keys(groupedJourneys)[0]]);
        }
    }, [groupedJourneys]);
    const toggleGroup = (date) => {
        if (expandedGroups.includes(date)) {

            setExpandedGroups(expandedGroups.filter((d) => d !== date));
        } else {
            setExpandedGroups([...expandedGroups, date]);
        }
    };
    const toggleDetail = (journeyId) => {
        setExpandedEvaluationItems((prev) => {
            // Nếu journeyId đã có trong mảng, xóa nó
            if (prev.includes(journeyId)) {
                return prev.filter(id => id !== journeyId);
            }
            // Nếu không có trong mảng, xóa tất cả các phần tử cũ và thêm journeyId mới vào
            return [journeyId];
        });
    };

    // const toggleDetail = (id) => {
    //     if (expandedEvaluationItems.includes(id)) {
    //         setExpandedEvaluationItems(expandedEvaluationItems.filter(itemId => itemId !== id));
    //     } else {
    //         setExpandedEvaluationItems([...expandedEvaluationItems, id]);
    //     }
    // };
    const handleEdit = () => {
        setIsEdit((prev) => !prev)
    }
    const handleChangeOrder = async (planLocationIdFirst, planLocationIdSecond) => {
        try {
            const res = await changeOrderPlanLocation(planId, planLocationIdFirst, planLocationIdSecond);
            onSuccess();
        } catch (error) {
            toast.error(error);
            console.log(error);
        }
    }
    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;
        const planLocationIdFirst = draggableId
        const destinationIndex = destination.index;
        const destinationDroppableId = destination.droppableId;

        const destinationJourney = groupedJourneys[destinationDroppableId][destinationIndex];

        const planLocationIdSecond = destinationJourney.planLocationId
        handleChangeOrder(planLocationIdFirst, planLocationIdSecond);

    };
    const updateJourneyInfo = (journeyDetail, updatedData) => {
        setListItemJourney((prevJourneys) =>
            prevJourneys.map((journey) =>
                journey.planLocationId === journeyDetail.planLocationId ? { ...journey, ...updatedData } : journey
            )
        );
    };
    const updateImage = () => { }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {role === 0 && plan?.status !== 2 &&
                <div className="flex justify-end w-full mt-[-20px] mb-5">
                    <Button onClick={handleEdit} tertiary={isEdit} primary={!isEdit} className="md:text-[15px] text-[8px] rounded-lg px-8">
                        {!isEdit ? "Chỉnh sửa" : "Lưu"}
                    </Button>
                </div>}
            <div className="flex flex-col w-full min-h-[800px]">
                {Object.keys(groupedJourneys).map((date) => (
                    <div key={date} className="mb-4">
                        <div
                            className="w-full flex justify-between items-center cursor-pointer"
                            onClick={() => toggleGroup(date)}
                        >
                            <span className="font-bold md:text-[21px] text-[18px]">
                                {formatDate(date)}
                            </span>
                            <MdKeyboardArrowDown
                                className={`text-[20px] transition-transform duration-300 cursor-pointer ${expandedGroups.includes(date) ? "rotate-180" : ""}`}
                            />
                        </div>
                        {expandedGroups.includes(date) && (
                            <Droppable droppableId={date} key={date}>
                                {(provided) => (
                                    <div
                                        className="flex flex-col gap-5 mt-2 duration-200 transition-all py-2"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {groupedJourneys[date].map((journey, index) => (
                                            <Draggable key={journey.planLocationId} draggableId={journey.planLocationId} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}

                                                        className="journey-item"
                                                    >
                                                        <DetailJourneyItem
                                                            isEdit={isEdit}
                                                            journey={journey}
                                                            index={index}
                                                            toggleDetail={() => toggleDetail(journey.planLocationId)}
                                                            expandedEvaluationItems={expandedEvaluationItems}
                                                            dragHandleProps={provided.dragHandleProps}
                                                            onSuccess={onSuccess}
                                                        />
                                                        {expandedEvaluationItems.includes(journey.planLocationId) && (
                                                            <EvaluationJourneyItem plan={plan} journey={journey} listMember={listMember} updateJourneyInfo={updateJourneyInfo} updateImage={updateImage} />
                                                        )}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        )}
                    </div>
                ))}
            </div>
        </DragDropContext>
    );
}
export default DetailJourney;