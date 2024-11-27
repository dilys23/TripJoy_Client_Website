import image from "../../assets/images/anh1.jpg"
import Hue from "../../assets/images/Hue.jpg"
import HoiAn from "../../assets/images/hoian.png"
import DetailJourneyItem from "../../components/DetailJourney/DetailJourneyItem"
import { MdKeyboardArrowDown } from "react-icons/md"
import { useState } from "react"
import Button from "../../components/Button/Button"
import EvaluationJourneyItem from "../../components/DetailJourney/EvaluationJourneyItem"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
function DetailJourney() {

    const [expandedEvaluationItems, setExpandedEvaluationItems] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [listItemJourney, setListItemJourney] = useState([
        { id: 0, title: "Đỉnh bàn cờ Sơn Trà", address: "100 Nguyễn Lương Bằng, Đà Nẵng", category: 0, image, time: "2024-12-02", hour: '2:15 PM', status: 2, rating: 5 },
        { id: 1, title: "Mỳ Quảng bà Mua", address: "100 Nguyễn Lương Bằng, Đà Nẵng", category: 1, image: HoiAn, time: "2024-12-02", hour: '7:15 PM', status: 1, rating: 4.2 },
        { id: 2, title: "Cầu rồng", address: "100 Nguyễn Lương Bằng, Đà Nẵng", category: 0, image: Hue, time: "2024-12-03", hour: '8:15 PM', status: 0, rating: 4.5 },
    ]);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const dayOfWeek = date.toLocaleString('vi-VN', { weekday: 'long' });
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}, ngày ${day}/${month}/${year}`;
    };
    const groupedJourneys = listItemJourney.reduce((acc, journey) => {
        if (!acc[journey.time]) {
            acc[journey.time] = [];
        }
        acc[journey.time].push(journey);
        return acc;
    }, {});
    const [expandedGroups, setExpandedGroups] = useState([Object.keys(groupedJourneys)[0]]);

    const toggleGroup = (date) => {
        if (expandedGroups.includes(date)) {

            setExpandedGroups(expandedGroups.filter((d) => d !== date));
        } else {

            setExpandedGroups([...expandedGroups, date]);
        }
    };
    const toggleDetail = (id) => {
        if (expandedEvaluationItems.includes(id)) {
            setExpandedEvaluationItems(expandedEvaluationItems.filter(itemId => itemId !== id));
        } else {
            setExpandedEvaluationItems([...expandedEvaluationItems, id]);
        }
    };
    const handleEdit = () => {
        setIsEdit((prev) => !prev)
    }
    const onDragEnd = (result) => {
        const { source, destination } = result;

        // Không thực hiện gì nếu không có đích
        if (!destination) return;

        const sourceDate = source.droppableId; // Ngày bắt đầu
        const destinationDate = destination.droppableId; // Ngày kết thúc

        // Nếu cùng ngày
        if (sourceDate === destinationDate) {
            const items = Array.from(groupedJourneys[sourceDate]);
            const [movedItem] = items.splice(source.index, 1);
            items.splice(destination.index, 0, movedItem);

            setListItemJourney((prev) =>
                prev.map((item) =>
                    item.time === sourceDate
                        ? { ...item, order: items.findIndex((i) => i.id === item.id) }
                        : item
                )
            );
        } else {
            // Nếu khác ngày
            const sourceItems = Array.from(groupedJourneys[sourceDate]);
            const destinationItems = Array.from(groupedJourneys[destinationDate]);

            const [movedItem] = sourceItems.splice(source.index, 1); // Xóa khỏi nguồn
            movedItem.time = destinationDate; // Cập nhật ngày mới
            destinationItems.splice(destination.index, 0, movedItem); // Thêm vào đích

            setListItemJourney((prev) =>
                prev.map((item) => {
                    if (item.id === movedItem.id) {
                        return { ...item, time: destinationDate };
                    }
                    return item;
                })
            );
        }
    };

    // const onDragEnd = (result) => {
    //     const { destination, source } = result;
    //     if (!destination) return;
    //     const items = Array.from(listItemJourney);
    //     const [reorderedItem] = items.splice(source.index, 1);
    //     items.splice(destination.index, 0, reorderedItem);
    //     setListItemJourney(items);
    // };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex justify-end w-full mt-[-30px] mb-5">
                <Button onClick={handleEdit} tertiary={isEdit} primary={!isEdit} className="md:text-[15px] text-[8px] rounded-lg px-8">
                    {!isEdit ? "Edit" : "Save"}
                </Button>
            </div>
            <div className="flex flex-col w-full min-h-[800px]">
                {Object.keys(groupedJourneys).map((date) => (
                    <div key={date} className="mb-4">
                        <div className="w-full flex justify-between items-center cursor-pointer" onClick={() => toggleGroup(date)}>
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
                                            <Draggable key={journey.id} draggableId={journey.id.toString()} index={index}>
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
                                                            toggleDetail={toggleDetail}
                                                            expandedEvaluationItems={expandedEvaluationItems}
                                                            dragHandleProps={provided.dragHandleProps}
                                                        />
                                                        {expandedEvaluationItems.includes(journey.id) && (
                                                            <EvaluationJourneyItem journey={journey} />
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