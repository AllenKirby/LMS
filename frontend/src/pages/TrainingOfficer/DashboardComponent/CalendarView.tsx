import React, { useState } from "react";
import dayjs from "dayjs";

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs()); // Initialize with today's date
  const [dueDatesCount, setDueDatesCount] = useState<number | null>(null);

  // Check if today is February 21st and set dueDatesCount accordingly
  React.useEffect(() => {
    if (selectedDate.month() === 1 && selectedDate.date() === 21) {
      setDueDatesCount(10);
    } else {
      setDueDatesCount(null);
    }
  }, [selectedDate]);

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = endOfMonth.date();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const handleDateClick = (day: number) => {
    const clickedDate = currentDate.date(day);
    setSelectedDate(clickedDate);

    // Check if the clicked date is February 21st
    if (clickedDate.month() === 1 && clickedDate.date() === 21) {
      setDueDatesCount(10); // Set due dates count to 10
    } else {
      setDueDatesCount(null); // Reset due dates count
    }
  };

  const daysArray: (number | undefined)[] = [
    ...Array(startDay).fill(undefined),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <section className="w-full h-full">
      <div className="w-full h-5/6 bg-gray-800 text-white rounded-t-lg text-p-sc py-1">
        <nav className="flex justify-center items-center gap-10 h-1/6">
          <button onClick={prevMonth} className="text-p-lg">
            &lt;
          </button>
          <h2 className="text-p-rg font-medium">
            {currentDate.format("MMMM YYYY")}
          </h2>
          <button onClick={nextMonth} className="text-p-lg">
            &gt;
          </button>
        </nav>
        <div className="grid grid-cols-7 text-center text-c-blue-40 text-p-sm h-1/6 px-3">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 text-center h-4/6 px-3">
          {daysArray.map((day, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg cursor-pointer ${
                day === selectedDate.date()
                  ? "bg-c-blue-50"
                  : "hover:bg-gray-600"
              } ${day ? "text-white" : "text-gray-500"}`}
              onClick={() => day && handleDateClick(day)}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-1/6 px-3 py-1">
        <p className="text-p-sm font-medium text-c-grey-50">Due's Course</p>
        <p className="w-full text-center -mt-2 font-medium">
          {dueDatesCount !== null
            ? `${dueDatesCount} due dates!`
            : "No due dates!"}
        </p>
      </div>
    </section>
  );
};

export default CalendarView;
