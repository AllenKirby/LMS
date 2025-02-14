import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";

interface Day {
  day: string;
  date: number;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getWeekDays = (date: Date): Day[] => {
    const startOfWeek = new Date(
      date.setDate(date.getDate() - date.getDay())
    ); // Start of the week (Sunday)
    return Array.from({ length: 7 }).map((_, index) => {
      const current = new Date(
        startOfWeek.getFullYear(),
        startOfWeek.getMonth(),
        startOfWeek.getDate() + index
      );
      return { day: daysInWeek[current.getDay()], date: current.getDate() };
    });
  };

  const weekDays = getWeekDays(new Date(currentDate));

  const handlePrevWeek = () => {
    setCurrentDate(
      new Date(currentDate.setDate(currentDate.getDate() - 7))
    );
  };

  const handleNextWeek = () => {
    setCurrentDate(
      new Date(currentDate.setDate(currentDate.getDate() + 7))
    );
  };

  const handleDateSelect = (date: number) => {
    const selected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      date
    );
    setSelectedDate(selected);
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex flex-row items-center gap-1 pb-5 -m-3">
        <p className="pt-5 text-lg">< FiCalendar /></p>
        <h1 className="font-medium text-lg pt-5">Upcoming Training</h1>
      </div>
      <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded">
        <button
          onClick={handlePrevWeek}
        >
          &lt;
        </button>
        <span className="font-semibold">
          {currentDate.toLocaleString("default", {
            month: "short",
            year: "numeric",
          })}
        </span>
        <button
          onClick={handleNextWeek}
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 mt-4">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer ${
              selectedDate &&
              selectedDate.getDate() === day.date &&
              "bg-[#40806c] text-white rounded"
            }`}
            onClick={() => handleDateSelect(day.date)}
          >
            <span className="text-sm text-f-gray">{day.day}</span>
            <span className="font-semibold">{day.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
