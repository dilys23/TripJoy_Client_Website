import { useState, useEffect } from 'react';
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function Calendar({ primary, secondary }) {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(primary ? today.getMonth() : (today.getMonth() + 1) % 12);
    const [currentYear, setCurrentYear] = useState(primary ? today.getFullYear() : today.getFullYear() + (today.getMonth() === 11 ? 1 : 0));
    const [selectedDates, setSelectedDates] = useState([]);
    useEffect(() => {
        updateCalendar(currentMonth, currentYear);
    }, [currentMonth, currentYear]);

    const updateCalendar = (month, year) => {
        const firstDay = new Date(year, month).getDay();
        const daysInMonth = 32 - new Date(year, month, 32).getDate();
        const calendarDays = [];
        let date = 1;

        for (let i = 0; i < 6; i++) {
            const week = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    week.push('');
                } else if (date > daysInMonth) {
                    break;
                } else {
                    week.push(date);
                    date++;
                }
            }
            calendarDays.push(week);
        }
        return calendarDays;
    };

    const handlePrevMonth = () => {
        setCurrentMonth(prev => (prev === 0 ? 11 : prev - 1));
        setCurrentYear(prev => (currentMonth === 0 ? prev - 1 : prev));
    };

    const handleNextMonth = () => {
        setCurrentMonth(prev => (prev === 11 ? 0 : prev + 1));
        setCurrentYear(prev => (currentMonth === 11 ? prev + 1 : prev));
    };

    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const calendarDays = updateCalendar(currentMonth, currentYear);
    const handleDateClick = (day) => {
        if (day) {
            const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            if (selectedDates.includes(dateString)) {
                setSelectedDates(prev => prev.filter(date => date !== dateString));
            } else {
                if (selectedDates.length < 2) {
                    setSelectedDates(prev => [...prev, dateString]);
                } else {
                    setSelectedDates([selectedDates[1], dateString]);
                }
            }
        }
    };
    return (
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg ">
            <div className="flex justify-between items-center w-full mb-4">
                {primary ? <MdNavigateBefore onClick={handlePrevMonth} className="text-[20px] w-[30px] h-[30px] cursor-pointer" ></MdNavigateBefore> : <div></div>}
                <h2 className="text-lg font-bold">
                    {monthNames[currentMonth]} {currentYear}
                </h2>
                {secondary ? <MdNavigateNext onClick={handleNextMonth} className="text-[20px] w-[30px] h-[30px] cursor-pointer" /> : <div></div>}
            </div>

            <table className="w-full text-center">
                <thead>
                    <tr>
                        {daysOfWeek.map((day, index) => (
                            <th key={index} className="p-2 bg-gray-100">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {calendarDays.map((week, weekIndex) => (
                        <tr key={weekIndex}>
                            {week.map((day, dayIndex) => {
                                const isPast = day && (new Date(currentYear, currentMonth, day) < today);
                                const isSelected = selectedDates.includes(`${currentYear}-${currentMonth + 1}-${day}`);
                                return (
                                    <td
                                        key={dayIndex}
                                        className={`py-2 px-3 ${isPast ? 'bg-gray-200 cursor-default' : 'hover:bg-gray-200 cursor-pointer'} ${isSelected ? 'bg-black text-white rounded-full' : ''}`}
                                        style={{ color: isPast ? 'lightgray' : isSelected ? 'white' : 'inherit' }}
                                        onClick={() => handleDateClick(day)}
                                    >
                                        {day}
                                    </td>
                                );
                            }

                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Calendar;
