import { useState, useEffect } from "react";
import Calendar from "./Calendar";

function CalendarContainer({ onDateChange }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [totalDay, setTotalDay] = useState(0);
  const [startDate, setStartDate] = useState(null); // Ngày bắt đầu
  const [endDate, setEndDate] = useState(null); // Ngày kết thúc

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev));
  };
  const nextMonth = (currentMonth + 1) % 12;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  // Hàm xử lý khi chọn ngày
  const handleDateClick = (dateString) => {
    if (!startDate) {
        setStartDate(dateString);
        setEndDate(null); // Reset end date if we choose a new start date
    } else if (startDate && !endDate) {
        const start = new Date(startDate);
        const end = new Date(dateString);
        if (end > start) {
            setEndDate(dateString);
        } else {
            setStartDate(dateString);
            setEndDate(null);
        }
    } else {
        setStartDate(dateString); 
        setEndDate(null);
    }
};


useEffect(() => {
    if (onDateChange) {
        onDateChange(startDate, endDate);
    }
}, [startDate, endDate, onDateChange]);

  return (
    <div className="flex w-full justify-center gap-5">
      <Calendar
        primary
        currentMonth={currentMonth}
        currentYear={currentYear}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        totalDay={totalDay}
        setTotalDay={setTotalDay}
        startDate={startDate}
        endDate={endDate}
        handleDateClick={handleDateClick} // Truyền hàm chọn ngày vào
      />
      <Calendar
        secondary
        currentMonth={nextMonth}
        currentYear={nextYear}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        totalDay={totalDay}
        startDate={startDate}
        endDate={endDate}
        handleDateClick={handleDateClick} // Truyền hàm chọn ngày vào
      />
    </div>
  );
}

export default CalendarContainer;
