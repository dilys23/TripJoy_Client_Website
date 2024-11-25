import image from "../../assets/images/anh1.jpg"
import Hue from "../../assets/images/Hue.jpg"
import HoiAn from "../../assets/images/hoian.png"
import DetailJourneyItem from "../../components/DetailJourney/DetailJourneyItem"
import { MdKeyboardArrowDown } from "react-icons/md"
import { useState } from "react"
import Button from "../../components/Button/Button"
import EvaluationJourneyItem from "../../components/DetailJourney/EvaluationJourneyItem"
function DetailJourney() {
    const listItemJourney = [{
        id: 0,
        title: "Đỉnh bàn cờ Sơn Trà",
        address: "100 Nguyễn Lương Bằng, Đà Nẵng",
        category: 0,
        image: image,
        time: "2024-12-02",
        hour: '2:15 PM',
        status: 2,
        rating: 5
    },
    {
        id: 1,
        title: "Mỳ Quảng bà Mua",
        address: "100 Nguyễn Lương Bằng, Đà Nẵng",
        category: 1,
        image: HoiAn,
        time: "2024-12-02",
        hour: '7:15 PM',
        status: 1,
        rating: 4.2
    },
    {
        id: 2,
        title: "Cầu rồng",
        address: "100 Nguyễn Lương Bằng, Đà Nẵng",
        category: 0,
        image: Hue,
        time: "2024-12-03",
        hour: '8:15 PM',
        status: 0,
        rating: 4.5
    }
    ]
    const groupedJourneys = listItemJourney.reduce((acc, journey) => {
        if (!acc[journey.time]) {
            acc[journey.time] = [];
        }
        acc[journey.time].push(journey);
        return acc;
    }, {});
    const [expandedGroups, setExpandedGroups] = useState([Object.keys(groupedJourneys)[0]]);
    const [expandedEvaluationItems, setExpandedEvaluationItems] = useState([]);

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


    return (
        <div className="flex flex-col w-full min-h-[800px]">
            {Object.keys(groupedJourneys).map((date) => (
                <div key={date} className="mb-4">
                    <div className="w-full flex justify-between items-center cursor-pointer" onClick={() => toggleGroup(date)}>
                        <span className="font-bold md:text-[21px] text-[18px]">
                            Thứ {new Date(date).getDay() + 1}, {date.split("-").reverse().join("-")}
                        </span>
                        <MdKeyboardArrowDown
                            className={`text-[20px] transition-transform duration-300 cursor-pointer ${expandedGroups.includes(date) ? "rotate-180" : ""
                                }`}
                        />
                    </div>

                    {expandedGroups.includes(date) && (
                        <>
                            <div className="flex flex-col gap-5 mt-2  duration-200 transition-all py-2">
                                {groupedJourneys[date].map((journey, index) => (
                                    <>
                                        <DetailJourneyItem
                                            key={journey.id}
                                            journey={journey}
                                            index={index}
                                            toggleDetail={toggleDetail}
                                            expandedEvaluationItems={expandedEvaluationItems}
                                        />
                                        {expandedEvaluationItems.includes(journey.id) && (
                                            <EvaluationJourneyItem journey={journey} />
                                        )}
                                    </>

                                ))}
                            </div>
                            <Button primary className="rounded-[20px] px-5 ml-3">Thêm</Button>
                        </>
                    )}

                </div>
            ))}
        </div>
    );
}

export default DetailJourney;