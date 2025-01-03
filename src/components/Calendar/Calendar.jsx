import { useState, useEffect } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Calendar({
  primary,
  secondary,
  currentMonth,
  currentYear,
  handlePrevMonth,
  handleNextMonth,
  totalDay,
  setTotalDay,
  startDate,
  endDate,
  handleDateClick,
}) {
  const today = new Date();
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
          week.push("");
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

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  const calendarDays = updateCalendar(currentMonth, currentYear);

  // const handleDateClick = (day) => {

  //     if (day) {
  //         const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  //         const isPast = new Date(currentYear, currentMonth, day) < today;

  //         if (isPast) {
  //             return;
  //         }

  //         const alreadySelected = selectedDates.includes(dateString);
  //         const selectedCount = selectedDates.filter(date => date !== dateString).length;

  //         if (alreadySelected) {
  //             setSelectedDates(selectedDates.filter(date => date !== dateString));
  //             setTotalDay((prev) => prev - 1);
  //         } else if (selectedCount < 2 && totalDay < 2) {
  //             setSelectedDates([...selectedDates, dateString]);
  //             setTotalDay((prev) => prev + 1);
  //         }
  //     }
  // };
  const isInRange = (day) => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const current = new Date(currentYear, currentMonth, day);
      return current >= start && current <= end;
    }
    return false;
  };

  return (
    <div className="flex flex-col items-center rounded-lg bg-white p-4">
      <div className="mb-4 flex w-full items-center justify-between">
        {primary ? (
          <MdNavigateBefore
            onClick={handlePrevMonth}
            className="h-[30px] w-[30px] cursor-pointer text-[20px]"
          />
        ) : (
          <div></div>
        )}
        <h2 className="text-lg font-bold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        {secondary ? (
          <MdNavigateNext
            onClick={handleNextMonth}
            className="h-[30px] w-[30px] cursor-pointer text-[20px]"
          />
        ) : (
          <div></div>
        )}
      </div>

      <table className="w-full text-center">
        <thead>
          <tr>
            {daysOfWeek.map((day, index) => (
              <th key={index} className="bg-gray-100 p-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarDays.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => {
                // const isSelected = selectedDates.includes(`${currentYear}-${currentMonth + 1}-${String(day).padStart(2, '0')}`);
                // const isPast = day && (new Date(currentYear, currentMonth, day) < today);
                {
                  /* const isInSelectedRange = isInRange(day); */
                }
                const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isSelected =
                  dateString === startDate || dateString === endDate;
                const isInSelectedRange = isInRange(day);
                const isPast =
                  day && new Date(currentYear, currentMonth, day) < today;
               

                return (
                  <td
                    key={dayIndex}
                    className={`px-4 py-3 ${isPast ? "bg-gray-200 cursor-default" : "hover:bg-gray-200 cursor-pointer"} ${isSelected ? "rounded-full bg-black text-white" : isInSelectedRange ? "bg-gray-300" : ""}`}
                    style={{
                      color: isPast
                        ? "lightgray"
                        : isSelected
                          ? "white"
                          : "inherit",
                    }}
                    onClick={() => handleDateClick(dateString)}
                  >
                    {day}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
