import React, { useState, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";

interface Day {
  day: string;
  date: number;
  fullDate: Date;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getWeekDays = (date: Date): Day[] => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    return Array.from({ length: 7 }).map((_, index) => {
      const current = new Date(startOfWeek);
      current.setDate(current.getDate() + index);
      return { day: daysInWeek[current.getDay()], date: current.getDate(), fullDate: current };
    });
  };

  const [weekDays, setWeekDays] = useState<Day[]>(getWeekDays(currentDate));

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
    setWeekDays(getWeekDays(newDate));
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
    setWeekDays(getWeekDays(newDate));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <section className="w-full h-full bg-white rounded-lg shadow-md p-5">
      <section>
        <div className="flex justify-between items-center bg-c-grey-5 rounded-md px-4 py-3">
          <button onClick={handlePrevWeek} aria-label="Previous Week">&lt;</button>
          <p className="text-p-rg font-semibold">
            {currentDate.toLocaleString("default", {
              month: "short",
              year: "numeric",
            })}
          </p>
          <button onClick={handleNextWeek} aria-label="Next Week">&gt;</button>
        </div>
        <section className="flex items-center justify-between mt-2">
          <button onClick={handlePrevWeek} aria-label="Previous Week">&lt;</button>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer ${
                  selectedDate &&
                  selectedDate.getDate() === day.date &&
                  selectedDate.getMonth() === day.fullDate.getMonth() &&
                  selectedDate.getFullYear() === day.fullDate.getFullYear() &&
                  "bg-c-blue-50 text-white rounded"
                }`}
                onClick={() => handleDateSelect(day.fullDate)}
              >
                <span className="text-sm text-c-grey-10">{day.day}</span>
                <span className="font-semibold">{day.date}</span>
              </div>
            ))}
          </div>
          <button onClick={handleNextWeek} aria-label="Next Week">&gt;</button>
        </section>
      </section>
      <div className="flex-1 mt-5">
        <header className="flex gap-1 items-center">
          <p>
            <FiCalendar />
          </p>
          <h1 className="font-medium ">Upcoming Training</h1>
        </header>
        <div className="flex flex-col gap-3 overflow-y-auto mt-5">
          <div className="border-l-8 h-[100px] w-full border-yellow-600 rounded-md border p-3 flex flex-col gap-4">
            <p className="text-p-sm font-medium text-c-grey-50">Label</p>
            <p className="text-p-rg text-f-dark">Message</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calendar;
