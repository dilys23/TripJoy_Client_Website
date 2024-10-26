import { useState } from "react";
import Calendar from "./Calendar";

function CalendarContainer() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [totalDay, setTotalDay] = useState(0);
    const [selectedDates, setSelectedDates] = useState([]);

    const handlePrevMonth = () => {
        setCurrentMonth(prev => (prev === 0 ? 11 : prev - 1));
        setCurrentYear(prev => (currentMonth === 0 ? prev - 1 : prev));
    };

    const handleNextMonth = () => {
        setCurrentMonth(prev => (prev === 11 ? 0 : prev + 1));
        setCurrentYear(prev => (currentMonth === 11 ? prev + 1 : prev));
    };
    const nextMonth = (currentMonth + 1) % 12;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    return (
        <div className="w-full flex gap-5 justify-center">
            <Calendar
                primary
                currentMonth={currentMonth}
                currentYear={currentYear}
                handlePrevMonth={handlePrevMonth}
                handleNextMonth={handleNextMonth}
                totalDay={totalDay}
                setTotalDay={setTotalDay}
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
            />
            <Calendar
                secondary
                currentMonth={nextMonth}
                currentYear={nextYear}
                handlePrevMonth={handlePrevMonth}
                handleNextMonth={handleNextMonth}
                totalDay={totalDay}
                setTotalDay={setTotalDay}
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
            />
        </div>
    );
}

export default CalendarContainer;